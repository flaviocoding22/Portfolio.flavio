const root = document.getElementById('conteudo');
document.getElementById('ano').textContent = new Date().getFullYear();
const slug = new URLSearchParams(location.search).get('p');

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
async function getJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(url + ' (' + r.status + ')');
  return r.json();
}
function section(title, id) {
  const wrap = document.createElement('section');
  wrap.setAttribute('aria-labelledby', id);
  const h = el('h2', null, title);
  h.id = id;
  wrap.appendChild(h);
  root.appendChild(wrap);
  return wrap;
}
function showError(msg) {
  root.textContent = '';
  root.appendChild(el('p', 'error', msg));
}

async function viewStl(box, url) {
  const THREE = await import('three');
  const { STLLoader } = await import('three/addons/loaders/STLLoader.js');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
  const geo = await new Promise((ok, fail) => new STLLoader().load(url, ok, undefined, fail));
  geo.computeVertexNormals();
  geo.center();
  geo.computeBoundingSphere();
  const r = geo.boundingSphere.radius;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f1f1);
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xff8a00, metalness: 0.2, roughness: 0.55 }));
  scene.add(mesh);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x888888, 1.4));
  const d = new THREE.DirectionalLight(0xffffff, 1.6);
  d.position.set(1, 2, 3);
  scene.add(d);
  const camera = new THREE.PerspectiveCamera(40, 1, r / 100, r * 100);
  camera.position.set(r * 1.2, r * 1.0, r * 2.2);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  box.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  function resize() {
    const w = box.clientWidth, h = box.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(box);
  renderer.setAnimationLoop(() => { controls.update(); renderer.render(scene, camera); });
}

async function viewGlb(box, url, alt) {
  await import('https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js');
  const mv = document.createElement('model-viewer');
  mv.setAttribute('src', url);
  mv.setAttribute('alt', alt);
  mv.setAttribute('camera-controls', '');
  mv.setAttribute('auto-rotate', '');
  mv.setAttribute('shadow-intensity', '1');
  box.appendChild(mv);
}

async function main() {
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) return showError('Projeto não especificado. Volte à lista de projetos.');
  const base = 'projects/' + slug + '/';
  let p;
  try { p = await getJSON(base + 'project.json'); }
  catch (e) { console.warn(e); return showError('Projeto não encontrado.'); }

  document.title = p.title + ' — Flávio';
  root.textContent = '';
  if (p.logo) {
    const logo = el('img', 'project-logo');
    logo.src = base + p.logo;
    logo.alt = p.logoAlt || 'Logo';
    root.appendChild(logo);
  }
  root.appendChild(el('h1', 'display project-title', p.title));
  const meta = el('div', 'meta');
  if (p.year) meta.appendChild(el('span', 'year', String(p.year)));
  const tags = el('ul', 'tags');
  (p.tags || []).forEach((t) => tags.appendChild(el('li', null, t)));
  meta.appendChild(tags);
  root.appendChild(meta);

  if (p.description) {
    const s = section('Descrição', 'h-desc');
    const d = el('div', 'desc');
    p.description.split(/\n\s*\n/).forEach((par) => d.appendChild(el('p', null, par)));
    s.appendChild(d);
  }

  if ((p.models || []).length) {
    const s = section('Modelo 3D', 'h-3d');
    for (const m of p.models) {
      const fig = el('figure', 'item');
      const box = el('div', 'viewer');
      box.setAttribute('role', 'group');
      box.setAttribute('aria-label', 'Visualizador 3D: ' + (m.caption || m.file));
      fig.appendChild(box);
      if (m.caption) fig.appendChild(el('figcaption', null, m.caption + ' — arraste para girar, role para ampliar.'));
      s.appendChild(fig);
      const url = base + m.file;
      try {
        if (/\.glb$|\.gltf$/i.test(m.file)) await viewGlb(box, url, m.caption || 'Modelo 3D');
        else if (/\.stl$/i.test(m.file)) await viewStl(box, url);
        else throw new Error('Formato não suportado: ' + m.file);
      } catch (e) {
        console.warn(e);
        box.appendChild(el('div', 'msg', 'Não foi possível carregar o modelo 3D.'));
      }
    }
  }

  if ((p.code || []).length) {
    const s = section('Código', 'h-code');
    await Promise.all(p.code.map(async (c) => {
      const fig = el('figure', 'item');
      const pre = el('pre');
      pre.tabIndex = 0;
      const code = el('code', 'language-' + (c.language || 'plaintext'));
      pre.appendChild(code);
      fig.appendChild(pre);
      if (c.caption) fig.appendChild(el('figcaption', null, c.caption + ' (' + c.file + ')'));
      s.appendChild(fig);
      try {
        const r = await fetch(base + c.file);
        if (!r.ok) throw new Error(c.file + ' (' + r.status + ')');
        code.textContent = await r.text();
        if (window.hljs) window.hljs.highlightElement(code);
      } catch (e) {
        console.warn(e);
        code.textContent = 'Não foi possível carregar ' + c.file;
      }
    }));
  }

  if ((p.images || []).length) {
    const s = section('Galeria', 'h-gal');
    const g = el('div', 'gallery');
    p.images.forEach((im) => {
      const fig = el('figure', 'item');
      const img = el('img');
      img.src = base + im.file;
      img.alt = im.caption || 'Imagem do projeto ' + p.title;
      img.loading = 'lazy';
      fig.appendChild(img);
      if (im.title || im.caption) {
        const cap = el('figcaption');
        if (im.title) cap.appendChild(el('strong', null, im.title));
        if (im.title && im.caption) cap.appendChild(document.createElement('br'));
        if (im.caption) cap.appendChild(document.createTextNode(im.caption));
        fig.appendChild(cap);
      }
      g.appendChild(fig);
    });
    s.appendChild(g);
  }

  if ((p.links || []).length) {
    const s = section('Links', 'h-links');
    const ul = el('ul', 'links');
    p.links.forEach((l) => {
      const li = el('li');
      const a = el('a', null, l.label);
      a.href = l.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.appendChild(a);
      ul.appendChild(li);
    });
    s.appendChild(ul);
  }
}
main().catch((e) => { console.error(e); showError('Erro ao carregar o projeto.'); });
