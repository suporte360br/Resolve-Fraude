// Blog: filtro por tema e busca por palavra-chave (tudo no navegador)
(() => {
  const area = document.querySelector('[data-blog-filtros]');
  if (!area) return;
  const cards = [...document.querySelectorAll('#artigos .post-card')];
  const busca = area.querySelector('#busca-blog');
  const botoes = [...area.querySelectorAll('[data-tema]')];
  const contador = area.querySelector('.blog-contador');
  const vazio = document.querySelector('.blog-vazio');
  const normalizar = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  let tema = 'todos';

  // texto pesquisável de cada card (título, resumo, temas e palavras extras)
  cards.forEach((c) => { c.dataset.indice = normalizar(`${c.textContent} ${c.dataset.temas || ''} ${c.dataset.busca || ''}`); });

  function aplicar() {
    const termos = normalizar(busca.value.trim()).split(/\s+/).filter(Boolean);
    let n = 0;
    cards.forEach((c) => {
      const okTema = tema === 'todos' || (c.dataset.temas || '').split(' ').includes(tema);
      const okBusca = termos.every((t) => c.dataset.indice.includes(t));
      const mostra = okTema && okBusca;
      c.hidden = !mostra;
      if (mostra) n++;
    });
    contador.textContent = n === cards.length ? `${n} artigos` : `${n} de ${cards.length} artigos`;
    vazio.hidden = n !== 0;
    // guarda o estado no endereço, para compartilhar o filtro
    const p = new URLSearchParams();
    if (tema !== 'todos') p.set('tema', tema);
    if (busca.value.trim()) p.set('q', busca.value.trim());
    history.replaceState(null, '', `${location.pathname}${p.toString() ? `?${p}` : ''}#artigos`);
  }

  botoes.forEach((b) => b.addEventListener('click', () => {
    tema = b.dataset.tema;
    botoes.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    aplicar();
  }));
  busca.addEventListener('input', aplicar);
  area.querySelector('form').addEventListener('submit', (e) => e.preventDefault());
  document.querySelector('[data-limpar]').addEventListener('click', () => {
    busca.value = '';
    tema = 'todos';
    botoes.forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.tema === 'todos')));
    aplicar();
    busca.focus();
  });

  // estado inicial vindo do endereço (?tema=...&q=...)
  const p = new URLSearchParams(location.search);
  if (p.get('q')) busca.value = p.get('q');
  const t = p.get('tema');
  if (t && botoes.some((b) => b.dataset.tema === t)) tema = t;
  botoes.forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.tema === tema)));
  if (p.toString()) aplicar(); else contador.textContent = `${cards.length} artigos`;
})();
