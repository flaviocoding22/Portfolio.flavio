(function () {
  var grade = document.getElementById('grade');
  document.getElementById('ano').textContent = new Date().getFullYear();

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function getJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(url + ' (' + r.status + ')');
      return r.json();
    });
  }

  getJSON('projects/index.json').then(function (idx) {
    var slugs = idx.projects || [];
    return Promise.all(slugs.map(function (s) {
      return getJSON('projects/' + s + '/project.json').then(function (p) { p._slug = s; return p; });
    }));
  }).then(function (list) {
    grade.textContent = '';
    if (!list.length) { grade.appendChild(el('p', 'muted', '[PREENCHER: projetos]')); return; }
    list.forEach(function (p) {
      var a = el('a', 'card');
      a.href = 'project.html?p=' + encodeURIComponent(p._slug);
      var img = el('img');
      img.src = 'projects/' + p._slug + '/' + p.cover;
      img.alt = 'Capa do projeto ' + p.title;
      img.loading = 'lazy';
      a.appendChild(img);
      a.appendChild(el('h3', null, p.title));
      a.appendChild(el('p', null, p.summary || ''));
      var ul = el('ul', 'tags');
      (p.tags || []).forEach(function (t) { ul.appendChild(el('li', null, t)); });
      a.appendChild(ul);
      grade.appendChild(a);
    });
  }).catch(function (err) {
    grade.textContent = '';
    grade.appendChild(el('p', 'muted', 'Não foi possível carregar os projetos.'));
    console.warn(err);
  });
})();
