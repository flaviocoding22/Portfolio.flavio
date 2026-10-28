(function () {
  var grade = document.getElementById('grade');
  var limpar = window.limpar;
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
    document.title = nome + ' — Engenharia Mecânica, CAE e Simulação';
    var partes = nome.split(' ');
    var primeiro = s.name || partes[0] || '';
    var resto = nome.indexOf(primeiro) === 0 ? nome.slice(primeiro.length).trim() : partes.slice(1).join(' ');
    document.getElementById('nome-primeiro').textContent = primeiro;
    document.getElementById('nome-resto').textContent = resto;
    if (s.eyebrow) document.getElementById('eyebrow').textContent = s.eyebrow;
    document.getElementById('tagline').textContent = s.tagline || '';
    document.getElementById('nome-rodape').textContent = nome;

    var hero = s.hero || {};
    document.getElementById('hero-legenda').textContent = limpar(hero.caption || '');
    if (hero.image) {
      var img = el('img');
      img.src = hero.image;
      img.alt = hero.alt || '';
      if (hero.position) img.style.objectPosition = hero.position;
      document.getElementById('hero-svg').replaceWith(img);
    }

    var sobre = clear(document.getElementById('sobre-texto'));
    (s.about || []).forEach(function (t) {
      var txt = limpar(t);
      if (txt) sobre.appendChild(el('p', null, txt));
    });

    var cv = clear(document.getElementById('cv-lista'));
    (s.cv || []).forEach(function (it) {
      var titulo = limpar(it.title || '');
      if (!titulo) return;
      var li = el('li');
      li.appendChild(el('span', 'when', limpar(it.when || '')));
      var box = el('span', 'cv-item');
      if (it.logo) {
        var logo = el('img', 'cv-logo');
        logo.src = it.logo;
        logo.alt = it.logoAlt || '';
        logo.loading = 'lazy';
        box.appendChild(logo);
      }
      var txt = el('span');
      txt.appendChild(el('strong', null, titulo));
      var detalhe = limpar(it.text || '');
      if (detalhe) { txt.appendChild(document.createElement('br')); txt.appendChild(document.createTextNode(detalhe)); }
      if (it.link) {
        txt.appendChild(document.createElement('br'));
        txt.appendChild(link(it.link.label, it.link.url, /^https?:/.test(it.link.url)));
      }
      box.appendChild(txt);
      li.appendChild(box);
      cv.appendChild(li);
    });

    // currículo em PDF: botões do topo e da seção só aparecem quando há arquivo
    var r = s.resume || {};
    var botoes = [document.getElementById('cv-pdf'), document.getElementById('hero-cv')];
    botoes.forEach(function (b) {
      if (r.url) { b.href = r.url; b.hidden = false; }
      else if (window.RASCUNHO) { b.hidden = false; b.textContent += ' [PREENCHER: link do PDF]'; }
      else { b.hidden = true; }
    });

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
    if (!list.length) { grade.appendChild(el('p', 'muted', 'Em breve.')); return; }
    list.forEach(function (p) {
      var a = el('a', 'card');
      a.href = 'project.html?p=' + encodeURIComponent(p._slug);
      var img = el('img', p.coverPhoto ? 'foto' : null);
      img.src = 'projects/' + p._slug + '/' + p.cover;
      img.alt = 'Capa do projeto ' + p.title;
      img.loading = 'lazy';
      a.appendChild(img);
      a.appendChild(el('h3', null, limpar(p.title)));
      var resumo = limpar(p.summary || '');
      if (resumo) a.appendChild(el('p', null, resumo));
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

  // ---- menu fixo: destaca a seção visível e marca a rolagem ----
  var header = document.querySelector('.site-header');
  function marcarRolagem() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', marcarRolagem, { passive: true });
  marcarRolagem();
  if ('IntersectionObserver' in window) {
    var links = {};
    document.querySelectorAll('.site-header a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (id) { links[id].removeAttribute('aria-current'); });
        if (links[e.target.id]) links[e.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(links).forEach(function (id) { var sec = document.getElementById(id); if (sec) obs.observe(sec); });
  }
})();
