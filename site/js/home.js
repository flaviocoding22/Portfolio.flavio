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
  function link(label, url, newTab) {
    var a = el('a', null, label);
    a.href = url;
    if (newTab) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  }
  function clear(node) { node.textContent = ''; return node; }

  // ---- dados do site (site/data/site.json) ----
  getJSON('data/site.json').then(function (s) {
    var nome = s.fullName || s.name || '';
    document.title = nome + ' — Engenharia Mecânica, CAE e Vibrações';
    document.getElementById('titulo').textContent = s.name || nome;
    document.getElementById('tagline').textContent = s.tagline || '';
    document.getElementById('nome-rodape').textContent = nome;

    var hero = s.hero || {};
    document.getElementById('hero-legenda').textContent = hero.caption || '';
    if (hero.image) {
      var img = el('img');
      img.src = hero.image;
      img.alt = hero.alt || '';
      if (hero.position) img.style.objectPosition = hero.position;
      var svg = document.getElementById('hero-svg');
      svg.replaceWith(img);
    }

    var sobre = clear(document.getElementById('sobre-texto'));
    (s.about || []).forEach(function (t) { sobre.appendChild(el('p', null, t)); });

    var cv = clear(document.getElementById('cv-lista'));
    (s.cv || []).forEach(function (it) {
      var li = el('li');
      li.appendChild(el('span', 'when', it.when || ''));
      var box = el('span', 'cv-item');
      if (it.logo) {
        var logo = el('img', 'cv-logo');
        logo.src = it.logo;
        logo.alt = it.logoAlt || '';
        logo.loading = 'lazy';
        box.appendChild(logo);
      }
      var txt = el('span');
      txt.appendChild(el('strong', null, it.title || ''));
      if (it.text) { txt.appendChild(document.createElement('br')); txt.appendChild(document.createTextNode(it.text)); }
      if (it.link) {
        txt.appendChild(document.createElement('br'));
        txt.appendChild(link(it.link.label, it.link.url, /^https?:/.test(it.link.url)));
      }
      box.appendChild(txt);
      li.appendChild(box);
      cv.appendChild(li);
    });

    var pdf = document.getElementById('cv-pdf');
    var r = s.resume || {};
    pdf.textContent = r.url ? (r.label || 'Baixar currículo (PDF)') : (r.label || 'Currículo') + ' [PREENCHER: link do PDF]';
    if (r.url) { pdf.href = r.url; pdf.removeAttribute('aria-disabled'); }

    var ct = clear(document.getElementById('contato-lista'));
    (s.contact || []).forEach(function (c) {
      var p = el('p');
      p.appendChild(document.createTextNode(c.label + ': '));
      p.appendChild(c.url ? link(c.text || c.url, c.url, /^https?:/.test(c.url)) : document.createTextNode(c.text || ''));
      ct.appendChild(p);
    });
  }).catch(function (err) { console.warn(err); });

  // ---- projetos ----
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
