// Marcadores [PREENCHER: ...] ficam escondidos no site publicado.
// Para ver o que ainda falta, abra qualquer página com ?rascunho=1 no final do endereço.
(function () {
  var rascunho = new URLSearchParams(location.search).has('rascunho');
  window.RASCUNHO = rascunho;
  // Remove os marcadores (e o "Foto:" que vem antes deles) e devolve '' se não sobrar nada.
  window.limpar = function (t) {
    if (t == null) return t;
    if (rascunho) return String(t);
    return String(t).replace(/\s*(Foto:\s*)?\[PREENCHER[^\]]*\]/g, '').replace(/[\s,;:—-]+$/, '').trim();
  };
})();
