// Autoavaliação de maturidade: prevenção à fraude, segurança da informação e privacidade.
// Tudo roda no navegador; nada é enviado a servidor. O visitante pode mandar o resultado por e-mail.
(() => {
  const EMAIL_DESTINO = 'contato@resolvefraude.com.br';
  const CHAVE = 'rf-autoavaliacao-v3'; // mude a versão ao alterar a ordem das perguntas

  const ESCALA = [
    { valor: 0, rotulo: 'Não existe', ajuda: 'Não temos ou não sabemos.' },
    { valor: 1, rotulo: 'Informal', ajuda: 'Acontece, mas depende de pessoas e não está documentado.' },
    { valor: 2, rotulo: 'Parcial', ajuda: 'Está documentado, mas aplicado só em parte da empresa.' },
    { valor: 3, rotulo: 'Implementado', ajuda: 'Formalizado e aplicado em toda a empresa.' },
    { valor: 4, rotulo: 'Gerenciado', ajuda: 'Além de implementado, é medido, revisado e melhorado.' },
  ];

  const NIVEIS = [
    { ate: 20, nome: 'Inicial', texto: 'Os controles são raros ou inexistentes. A empresa está muito exposta e depende da sorte.' },
    { ate: 40, nome: 'Básico', texto: 'Há iniciativas isoladas, mas sem estrutura. Riscos relevantes ainda não têm resposta.' },
    { ate: 60, nome: 'Em desenvolvimento', texto: 'A base existe, mas a aplicação é desigual. É hora de formalizar e cobrir as lacunas.' },
    { ate: 80, nome: 'Estruturado', texto: 'Os controles estão implementados. O próximo passo é medir a eficácia e melhorar continuamente.' },
    { ate: 100, nome: 'Avançado', texto: 'Programa maduro, medido e revisado. Mantenha a melhoria contínua e teste os controles.' },
  ];

  const DOMINIOS = [
    {
      id: 'fraude',
      sigla: 'F',
      nome: 'Prevenção à fraude',
      descricao: 'Governança antifraude, controles, monitoramento transacional interno e externo, canal de denúncias e resposta, segundo o guia COSO/ACFE e o programa de integridade da Lei Anticorrupção.',
      referencias: 'COSO/ACFE Fraud Risk Management Guide (2ª ed.), Decreto nº 11.129/2022 (art. 57), Lei nº 9.613/1998, ISO 37001, ISO 37002 e ISO 37301',
      perguntas: [
        { titulo: 'Política antifraude e responsabilidade da direção', texto: 'Existe uma política antifraude aprovada pela alta direção, com responsáveis definidos pelo programa?', ref: 'COSO/ACFE FRM Princípio 1; Decreto 11.129/2022, art. 57', rec: 'Aprove uma política antifraude com o apoio explícito da diretoria e nomeie um responsável pelo programa.' },
        { titulo: 'Código de conduta e conflito de interesses', texto: 'Há código de conduta e declaração de conflito de interesses, com aceite formal e renovado dos colaboradores?', ref: 'Decreto 11.129/2022, art. 57; ISO 37301', rec: 'Publique um código de conduta, colete o aceite anual e crie um formulário de declaração de conflito de interesses.' },
        { titulo: 'Avaliação de riscos de fraude', texto: 'A empresa avalia periodicamente onde pode sofrer fraudes (internas e externas) e prioriza esses riscos?', ref: 'COSO/ACFE FRM Princípio 2', rec: 'Faça uma avaliação de riscos de fraude por processo (compras, pagamentos, vendas, estoque) ao menos uma vez por ano.' },
        { titulo: 'Diligência de terceiros', texto: 'Fornecedores, parceiros e clientes relevantes passam por verificação (due diligence) antes da contratação?', ref: 'Decreto 11.129/2022, art. 57; ISO 37001', rec: 'Implante um checklist de due diligence (CNPJ, sócios, listas restritivas, processos) proporcional ao risco do terceiro.' },
        { titulo: 'Segregação de funções e alçadas', texto: 'Funções críticas são separadas (quem cadastra não aprova, quem aprova não paga) e há limites de aprovação?', ref: 'COSO Controle Interno; COSO/ACFE FRM Princípio 3', rec: 'Mapeie conflitos de funções nos processos financeiros e defina uma matriz de alçadas.' },
        { titulo: 'Controles de pagamento', texto: 'Alterações de dados bancários são confirmadas por outro canal e pagamentos relevantes exigem dupla aprovação?', ref: 'COSO/ACFE FRM Princípio 3 (controles preventivos)', rec: 'Exija confirmação por telefone já cadastrado para qualquer troca de conta e dupla aprovação acima de um valor definido.' },
        { titulo: 'Monitoramento transacional interno', texto: 'Pagamentos, compras, reembolsos de despesas, folha e ajustes de estoque são monitorados por regras ou análise de dados que geram alertas de transações fora do padrão?', ref: 'COSO/ACFE FRM Princípios 3 e 5 (análise de dados proativa)', rec: 'Implante regras de alerta para fornecedores duplicados ou com dados bancários de funcionários, pagamentos fora do horário, valores fracionados abaixo da alçada, reembolsos repetidos e lançamentos manuais.' },
        { titulo: 'Monitoramento transacional externo', texto: 'Transações de clientes e parceiros (vendas, cadastros, pagamentos com cartão e Pix, estornos e chargebacks) passam por análise antifraude antes ou durante a operação?', ref: 'COSO/ACFE FRM Princípio 3; Lei nº 9.613/1998, arts. 10 e 11 (setores obrigados)', rec: 'Use regras e score de risco no cadastro e na transação (velocidade, geolocalização, dispositivo, listas restritivas), autenticação reforçada nas operações de risco e acompanhamento do índice de chargeback.' },
        { titulo: 'Tratamento de alertas e ajuste das regras', texto: 'Os alertas de monitoramento têm responsável, prazo de análise e registro do desfecho, e as regras são recalibradas com base nos resultados?', ref: 'COSO/ACFE FRM Princípios 4 e 5', rec: 'Defina uma fila de alertas com responsável e prazo, registre o desfecho (fraude, falso positivo) e revise as regras periodicamente para reduzir falsos positivos e cobrir novos golpes.' },
        { titulo: 'Canal de denúncias', texto: 'Existe canal de denúncias acessível, com opção de anonimato e política de não retaliação?', ref: 'ISO 37002; Decreto 11.129/2022, art. 57', rec: 'Disponibilize um canal independente (formulário web, e-mail e telefone), divulgue-o e formalize a não retaliação.' },
        { titulo: 'Investigação e ação corretiva', texto: 'Há procedimento definido para apurar suspeitas, preservar evidências e aplicar medidas disciplinares?', ref: 'COSO/ACFE FRM Princípio 4', rec: 'Escreva um procedimento de investigação (quem conduz, como preservar provas, prazos) e um regime disciplinar coerente.' },
        { titulo: 'Treinamento antifraude', texto: 'Os colaboradores recebem treinamento periódico sobre fraudes, golpes e como reportar?', ref: 'Decreto 11.129/2022, art. 57; COSO/ACFE FRM Princípio 1', rec: 'Inclua treinamento antifraude na integração e reciclagem anual, com casos reais do seu setor.' },
        { titulo: 'Gestão de pessoas em funções sensíveis', texto: 'Há checagem de antecedentes para cargos críticos, férias obrigatórias e rodízio de funções?', ref: 'COSO/ACFE FRM Princípio 3', rec: 'Defina cargos sensíveis e aplique a eles checagem prévia, férias obrigatórias e rodízio periódico.' },
        { titulo: 'Indicadores e melhoria do programa', texto: 'O programa antifraude tem indicadores reportados à diretoria e é revisado periodicamente?', ref: 'COSO/ACFE FRM Princípio 5', rec: 'Crie um painel com casos, denúncias, perdas e treinamentos e apresente à diretoria ao menos duas vezes por ano.' },
      ],
    },
    {
      id: 'seguranca',
      sigla: 'S',
      nome: 'Segurança da informação',
      descricao: 'Governança, gestão de riscos, proteção de sistemas, dados e pessoas, continuidade de negócios e gestão de crise, segundo a ISO/IEC 27001:2022, o NIST Cybersecurity Framework 2.0, os CIS Controls e a ISO 22301.',
      referencias: 'ISO/IEC 27001:2022 (Anexo A), ISO/IEC 27005, NIST CSF 2.0, CIS Controls v8.1 e ISO 22301',
      perguntas: [
        { titulo: 'Governança de segurança', texto: 'Segurança da informação tem governança definida: comitê ou fórum com participação da diretoria, papéis e responsabilidades claros, orçamento e alinhamento com os objetivos do negócio?', ref: 'ISO/IEC 27001 cl. 5.1 e 5.3; NIST CSF GV.OC, GV.RR, GV.OV', rec: 'Crie um comitê de segurança com a diretoria, defina papéis (matriz RACI), orçamento anual e pauta periódica de decisões.' },
        { titulo: 'Política e responsável por segurança', texto: 'Existe política de segurança da informação aprovada e uma pessoa responsável pelo tema?', ref: 'ISO/IEC 27001 cl. 5.2 e A.5.1–5.2; NIST CSF GV.PO, GV.RR', rec: 'Aprove uma política de segurança e designe um responsável (interno ou CISO como serviço).' },
        { titulo: 'Inventário de ativos e dados', texto: 'A empresa sabe quais equipamentos, sistemas, contas em nuvem e dados importantes possui?', ref: 'ISO/IEC 27001 A.5.9; NIST CSF ID.AM; CIS 1, 2 e 3', rec: 'Monte um inventário de equipamentos, softwares, serviços em nuvem e bases de dados críticas, com dono de cada item.' },
        { titulo: 'Gestão de riscos de segurança', texto: 'Os riscos de segurança são avaliados e tratados com um plano, revisado periodicamente?', ref: 'ISO/IEC 27001 cl. 6.1 e 8.2; ISO/IEC 27005; NIST CSF ID.RA', rec: 'Faça uma análise de riscos simples (ameaça, impacto, probabilidade) e um plano de tratamento com prazos.' },
        { titulo: 'Aceite de risco', texto: 'Riscos que não serão tratados são aceitos formalmente pelo dono do risco, com justificativa, controles compensatórios e prazo de validade para reavaliação?', ref: 'ISO/IEC 27001 cl. 6.1.3 e 8.3; ISO/IEC 27005; NIST CSF GV.RM', rec: 'Crie um termo de aceite de risco assinado pelo dono do risco dentro do apetite definido pela diretoria, com validade (ex.: 12 meses) e registro centralizado.' },
        { titulo: 'Onboarding, mudança de função e offboarding', texto: 'Acessos são concedidos por perfil aprovado na admissão, ajustados na mudança de função e revogados no mesmo dia do desligamento, com devolução de equipamentos?', ref: 'ISO/IEC 27001 A.5.11, A.5.16, A.5.18, A.6.1–6.5; NIST CSF PR.AA; CIS 5 e 6.1–6.2', rec: 'Integre RH e TI num fluxo único de admissão, mudança e desligamento, com perfis de acesso por cargo, checklist de revogação e devolução de ativos.' },
        { titulo: 'Revisão periódica de acessos e atestação', texto: 'Os gestores revisam e atestam formalmente, em ciclos definidos, quem tem acesso a cada sistema, com atenção especial a contas privilegiadas e inativas?', ref: 'ISO/IEC 27001 A.5.18 e A.8.2; NIST CSF PR.AA; CIS 5.3 e 6', rec: 'Faça campanhas de atestação trimestrais para sistemas críticos e acessos privilegiados (semestrais para os demais), removendo o que não for confirmado.' },
        { titulo: 'Autenticação em dois fatores (MFA)', texto: 'E-mail, acesso remoto, contas administrativas e sistemas críticos exigem MFA?', ref: 'ISO/IEC 27001 A.8.5; CIS 6.3–6.5', rec: 'Ative MFA primeiro no e-mail, VPN/acesso remoto, contas de administrador e internet banking.' },
        { titulo: 'Atualizações e vulnerabilidades', texto: 'Sistemas e equipamentos recebem atualizações de segurança em prazo definido e há varredura de vulnerabilidades?', ref: 'ISO/IEC 27001 A.8.8; NIST CSF PR.PS; CIS 7', rec: 'Defina prazos para aplicar atualizações críticas e faça varreduras de vulnerabilidades periódicas.' },
        { titulo: 'Proteção de computadores e e-mail', texto: 'Há antimalware gerenciado, filtro de e-mail e autenticação do domínio (SPF, DKIM e DMARC)?', ref: 'ISO/IEC 27001 A.8.7; CIS 9 e 10', rec: 'Use proteção de endpoint gerenciada e configure SPF, DKIM e DMARC no domínio para dificultar e-mails falsos.' },
        { titulo: 'Backup e recuperação', texto: 'Há backup automático dos dados críticos, com cópia isolada (offline ou imutável) e testes de restauração?', ref: 'ISO/IEC 27001 A.8.13; NIST CSF RC; CIS 11', rec: 'Siga a regra 3-2-1 com uma cópia isolada e teste a restauração ao menos a cada semestre.' },
        { titulo: 'Monitoramento e registros (logs)', texto: 'Eventos de segurança são registrados e monitorados, com alertas para atividades suspeitas?', ref: 'ISO/IEC 27001 A.8.15–8.16; NIST CSF DE.CM; CIS 8', rec: 'Centralize os logs de e-mail, nuvem e firewall e configure alertas para logins suspeitos.' },
        { titulo: 'Resposta a incidentes', texto: 'Existe plano de resposta a incidentes (ex.: ransomware), com papéis definidos e testado em simulação?', ref: 'ISO/IEC 27001 A.5.24–5.28; NIST CSF RS; CIS 17', rec: 'Escreva um plano de resposta com contatos, decisões e comunicação, e faça um exercício de mesa por ano.' },
        { titulo: 'Continuidade de negócios (SGCN) e mesa de crise', texto: 'Existe gestão de continuidade de negócios (análise de impacto, RTO/RPO, planos de continuidade) e um comitê de crise com papéis, comunicação e exercícios periódicos?', ref: 'ISO 22301; ISO/IEC 27001 A.5.29–5.30; NIST CSF RC.RP', rec: 'Faça a análise de impacto nos negócios (BIA), defina RTO/RPO dos processos críticos, monte o comitê de crise (mesa de crise) e realize ao menos um exercício por ano.' },
        { titulo: 'Conscientização e phishing', texto: 'Os colaboradores recebem treinamento de segurança e participam de simulações de phishing?', ref: 'ISO/IEC 27001 A.6.3; NIST CSF PR.AT; CIS 14', rec: 'Faça treinamentos curtos e frequentes e simulações de phishing trimestrais com retorno educativo.' },
        { titulo: 'Fornecedores e nuvem', texto: 'Fornecedores de TI e serviços em nuvem são avaliados quanto à segurança e têm requisitos em contrato?', ref: 'ISO/IEC 27001 A.5.19–5.23; NIST CSF GV.SC; CIS 15', rec: 'Classifique fornecedores por criticidade, peça evidências de segurança e inclua cláusulas contratuais.' },
        { titulo: 'Indicadores de segurança', texto: 'Há indicadores de segurança (KPIs e KRIs) medidos e reportados periodicamente à diretoria, com metas e análise crítica?', ref: 'ISO/IEC 27001 cl. 9.1 e 9.3; NIST CSF GV.OV, ID.IM', rec: 'Defina poucos indicadores com meta (ex.: % de MFA, tempo para corrigir vulnerabilidades críticas, taxa de clique em phishing, acessos revisados) e apresente à diretoria trimestralmente.' },
      ],
    },
    {
      id: 'privacidade',
      sigla: 'P',
      nome: 'Privacidade e proteção de dados',
      descricao: 'Conformidade com a LGPD e as resoluções da ANPD, com apoio das boas práticas da ISO/IEC 27701.',
      referencias: 'LGPD (Lei nº 13.709/2018), Resoluções CD/ANPD nº 2/2022, 15/2024 e 18/2024 e ISO/IEC 27701',
      perguntas: [
        { titulo: 'Encarregado (DPO)', texto: 'A empresa nomeou um encarregado pelo tratamento de dados e divulga seu contato?', ref: 'LGPD art. 41; Resolução CD/ANPD nº 18/2024', rec: 'Nomeie formalmente o encarregado e publique seu canal de contato no site.' },
        { titulo: 'Mapeamento de dados', texto: 'Existe registro das operações de tratamento (quais dados, para quê, onde ficam e com quem são compartilhados)?', ref: 'LGPD art. 37; ISO/IEC 27701', rec: 'Faça o inventário de dados pessoais por processo e mantenha o registro das operações atualizado.' },
        { titulo: 'Bases legais', texto: 'Cada finalidade de tratamento tem uma base legal definida, inclusive para dados sensíveis?', ref: 'LGPD arts. 7º e 11', rec: 'Associe uma base legal a cada finalidade do mapeamento, com atenção especial aos dados sensíveis.' },
        { titulo: 'Transparência e aviso de privacidade', texto: 'Há aviso de privacidade claro, atualizado e acessível aos titulares?', ref: 'LGPD arts. 6º e 9º', rec: 'Publique um aviso de privacidade em linguagem simples, coerente com o mapeamento de dados.' },
        { titulo: 'Direitos dos titulares', texto: 'Há processo para atender pedidos dos titulares (acesso, correção, exclusão) dentro do prazo?', ref: 'LGPD arts. 18 e 19', rec: 'Crie um fluxo de atendimento com canal, verificação de identidade, responsáveis e prazos.' },
        { titulo: 'Consentimento e cookies', texto: 'Quando o consentimento é a base legal, ele é registrado e pode ser revogado? Os cookies são gerenciados?', ref: 'LGPD arts. 8º e 18', rec: 'Registre consentimentos com data e finalidade e use um gerenciador de cookies que permita recusar os não essenciais.' },
        { titulo: 'Relatório de impacto (RIPD)', texto: 'Tratamentos de alto risco passam por avaliação de impacto à proteção de dados antes de começar?', ref: 'LGPD arts. 5º XVII e 38', rec: 'Defina critérios de alto risco e elabore o RIPD antes de novos projetos que os atinjam.' },
        { titulo: 'Contratos com operadores', texto: 'Contratos com fornecedores que tratam dados pessoais têm cláusulas de proteção de dados?', ref: 'LGPD art. 39; ISO/IEC 27701', rec: 'Revise os contratos com operadores e inclua cláusulas de segurança, sigilo, suboperadores e incidentes.' },
        { titulo: 'Retenção e descarte', texto: 'Existem prazos de guarda e o descarte seguro dos dados pessoais quando não são mais necessários?', ref: 'LGPD arts. 15 e 16', rec: 'Crie uma tabela de temporalidade por tipo de dado e rotinas de eliminação segura.' },
        { titulo: 'Privacidade desde a concepção', texto: 'Novos sistemas e projetos consideram privacidade e segurança desde o início (privacy by design)?', ref: 'LGPD art. 46, §2º; ISO/IEC 27701', rec: 'Inclua uma checagem de privacidade no início de todo projeto ou contratação de sistema.' },
        { titulo: 'Incidentes com dados pessoais', texto: 'A empresa sabe avaliar um incidente e comunicar a ANPD e os titulares no prazo regulamentar?', ref: 'LGPD art. 48; Resolução CD/ANPD nº 15/2024', rec: 'Integre ao plano de incidentes a avaliação de risco aos titulares e a comunicação à ANPD em até 3 dias úteis.' },
        { titulo: 'Treinamento e cultura de privacidade', texto: 'Colaboradores que lidam com dados pessoais são treinados periodicamente em LGPD?', ref: 'LGPD art. 50', rec: 'Ofereça treinamento de LGPD por função (RH, vendas, atendimento, TI) com reciclagem anual.' },
      ],
    },
  ];

  const $ = (sel) => document.querySelector(sel);
  const app = $('#autoavaliacao');
  if (!app) return;

  const estado = carregar() || { etapa: 0, dados: {}, respostas: {} };

  function carregar() {
    try { return JSON.parse(sessionStorage.getItem(CHAVE)); } catch (e) { return null; }
  }
  function salvar() {
    try { sessionStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* navegação privada: segue sem salvar */ }
  }
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const chave = (d, i) => `${d.id}-${i}`;
  const nivel = (nota) => NIVEIS.find((n) => nota <= n.ate);

  function notaDominio(d) {
    const soma = d.perguntas.reduce((t, _, i) => t + (estado.respostas[chave(d, i)] || 0), 0);
    return Math.round((soma / (d.perguntas.length * 4)) * 100);
  }

  function irPara(etapa) {
    estado.etapa = etapa;
    salvar();
    desenhar();
    app.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const foco = app.querySelector('h2');
    if (foco) foco.focus({ preventScroll: true });
  }

  function progresso() {
    const total = DOMINIOS.length + 1;
    const passos = ['Dados', ...DOMINIOS.map((d) => d.nome), 'Resultado'];
    return `<ol class="aa-passos" aria-label="Etapas">${passos.map((p, i) => `<li class="${i < estado.etapa ? 'feito' : i === estado.etapa ? 'atual' : ''}"${i === estado.etapa ? ' aria-current="step"' : ''}><span>${i + 1}</span>${esc(p)}</li>`).join('')}</ol>
      <div class="aa-barra" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${estado.etapa}"><span style="width:${(estado.etapa / total) * 100}%"></span></div>`;
  }

  function telaInicial() {
    const d = estado.dados;
    app.innerHTML = `${progresso()}
      <form class="formulario aa-inicio" novalidate>
        <h2 tabindex="-1" class="largo">Comece por aqui</h2>
        <label class="largo">Nome*<input type="text" name="nome" required autocomplete="name" value="${esc(d.nome || '')}"></label>
        <label class="largo">Empresa*<input type="text" name="empresa" required autocomplete="organization" value="${esc(d.empresa || '')}"></label>
        <label class="largo">E-mail*<input type="email" name="email" required autocomplete="email" value="${esc(d.email || '')}"></label>
        <p class="aa-erro largo" role="alert" hidden>Preencha nome, empresa e um e-mail válido.</p>
        <button class="botao largo" type="submit">Iniciar autoavaliação</button>
        <p class="nota largo">São ${DOMINIOS.reduce((t, d) => t + d.perguntas.length, 0)} perguntas, cerca de 15 minutos. Suas respostas ficam só no seu navegador; você decide no final se quer enviá-las para a Resolve Fraude. Veja a <a href="../privacidade.html">Política de Privacidade</a>.</p>
      </form>`;
    const form = app.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const dados = { nome: f.get('nome').trim(), empresa: f.get('empresa').trim(), email: f.get('email').trim() };
      const valido = dados.nome && dados.empresa && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email);
      form.querySelector('.aa-erro').hidden = valido;
      if (!valido) return;
      estado.dados = dados;
      irPara(1);
    });
  }

  function telaDominio(n) {
    const d = DOMINIOS[n - 1];
    app.innerHTML = `${progresso()}
      <form class="aa-dominio" novalidate>
        <h2 tabindex="-1">${esc(d.nome)}</h2>
        <p class="aa-desc">${esc(d.descricao)}</p>
        <details class="aa-escala"><summary>Como responder</summary><ul>${ESCALA.map((e) => `<li><strong>${e.valor} – ${e.rotulo}:</strong> ${e.ajuda}</li>`).join('')}</ul></details>
        ${d.perguntas.map((p, i) => {
          const k = chave(d, i);
          return `<fieldset class="aa-pergunta" id="q-${k}">
            <legend><span class="aa-num">${i + 1}</span>${esc(p.texto)}</legend>
            <div class="aa-opcoes">${ESCALA.map((e) => `<label><input type="radio" name="${k}" value="${e.valor}"${estado.respostas[k] === e.valor ? ' checked' : ''}><span><b>${e.valor}</b> ${e.rotulo}</span></label>`).join('')}</div>
            <p class="aa-ref">Referência: ${esc(p.ref)}</p>
          </fieldset>`;
        }).join('')}
        <p class="aa-erro" role="alert" hidden>Responda todas as perguntas para continuar. As que faltam estão destacadas.</p>
        <div class="aa-acoes">
          <button class="botao botao-contorno" type="button" data-voltar>Voltar</button>
          <button class="botao" type="submit">${n < DOMINIOS.length ? 'Próxima etapa' : 'Ver resultado'}</button>
        </div>
      </form>`;
    const form = app.querySelector('form');
    form.addEventListener('change', (e) => {
      if (e.target.type !== 'radio') return;
      estado.respostas[e.target.name] = Number(e.target.value);
      e.target.closest('fieldset').classList.remove('falta');
      salvar();
    });
    form.querySelector('[data-voltar]').addEventListener('click', () => irPara(n - 1));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const faltam = d.perguntas.map((_, i) => chave(d, i)).filter((k) => estado.respostas[k] === undefined);
      faltam.forEach((k) => $(`#q-${k}`).classList.add('falta'));
      form.querySelector('.aa-erro').hidden = !faltam.length;
      if (faltam.length) { $(`#q-${faltam[0]}`).scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      irPara(n + 1);
    });
  }

  function lacunas() {
    const lista = [];
    DOMINIOS.forEach((d) => d.perguntas.forEach((p, i) => {
      const v = estado.respostas[chave(d, i)] || 0;
      if (v <= 2) lista.push({ d, p, v });
    }));
    return lista.sort((a, b) => a.v - b.v);
  }

  function resumoEmail(geral, notas, principais) {
    const { nome, empresa, email } = estado.dados;
    const linhas = [
      'Olá, Resolve Fraude. Fiz a autoavaliação no site e gostaria de conversar sobre o resultado.',
      '',
      `Nome: ${nome}`, `Empresa: ${empresa}`, `E-mail: ${email}`, '',
      `Resultado geral: ${geral}/100 (${nivel(geral).nome})`,
      ...DOMINIOS.map((d, i) => `${d.nome}: ${notas[i]}/100 (${nivel(notas[i]).nome})`),
      '',
      'Principais lacunas:',
      ...principais.slice(0, 6).map((l) => `- ${l.d.nome}: ${l.p.titulo} (${l.v}/4)`),
      '',
      'Respostas (0 a 4):',
      ...DOMINIOS.map((d) => `${d.sigla}: ${d.perguntas.map((_, i) => estado.respostas[chave(d, i)] ?? '-').join(' ')}`),
    ];
    return linhas.join('\n');
  }

  function telaResultado() {
    const notas = DOMINIOS.map(notaDominio);
    const geral = Math.round(notas.reduce((a, b) => a + b, 0) / notas.length);
    const nGeral = nivel(geral);
    const principais = lacunas();
    const fortes = [];
    DOMINIOS.forEach((d) => d.perguntas.forEach((p, i) => { if (estado.respostas[chave(d, i)] === 4) fortes.push({ d, p }); }));
    const data = new Date().toLocaleDateString('pt-BR');
    const assunto = `Autoavaliação - ${estado.dados.empresa}`;
    const mailto = `mailto:${EMAIL_DESTINO}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(resumoEmail(geral, notas, principais))}`;

    app.innerHTML = `${progresso()}
      <section class="aa-resultado">
        <header class="aa-cab">
          <div>
            <p class="rotulo">Resultado da autoavaliação · ${esc(data)}</p>
            <h2 tabindex="-1">${esc(estado.dados.empresa)}</h2>
            <p class="aa-quem">Respondido por ${esc(estado.dados.nome)} (${esc(estado.dados.email)})</p>
          </div>
          <div class="aa-geral nivel-${NIVEIS.indexOf(nGeral)}">
            <strong>${geral}</strong><span>de 100</span><em>${nGeral.nome}</em>
          </div>
        </header>
        <p class="aa-nivel-texto">${esc(nGeral.texto)}</p>

        <div class="grade grade-3 aa-cards">
          ${DOMINIOS.map((d, i) => `<article class="item aa-card">
            <h3>${esc(d.nome)}</h3>
            <p class="aa-nota"><strong>${notas[i]}</strong>/100<span>${nivel(notas[i]).nome}</span></p>
            <div class="aa-medidor" aria-hidden="true"><span style="width:${notas[i]}%"></span></div>
            <ul class="aa-mapa">${d.perguntas.map((p, j) => {
              const v = estado.respostas[chave(d, j)] || 0;
              return `<li><span class="aa-pontos v${v}" aria-label="${v} de 4">${'●'.repeat(v)}${'○'.repeat(4 - v)}</span>${esc(p.titulo)}</li>`;
            }).join('')}</ul>
            <p class="aa-ref">Base: ${esc(d.referencias)}</p>
          </article>`).join('')}
        </div>

        <h3 class="aa-subtitulo">Prioridades recomendadas</h3>
        ${principais.length ? `<ol class="aa-prioridades">${principais.slice(0, 10).map((l) => `<li>
            <p><strong>${esc(l.p.titulo)}</strong> <span class="aa-tag">${esc(l.d.nome)} · ${l.v}/4</span></p>
            <p>${esc(l.p.rec)}</p>
            <p class="aa-ref">Referência: ${esc(l.p.ref)}</p>
          </li>`).join('')}</ol>${principais.length > 10 ? `<p class="aa-ref">Mais ${principais.length - 10} ${principais.length - 10 === 1 ? 'item' : 'itens'} com nota 2 ou menor aparecem no mapa acima.</p>` : ''}`
        : '<p>Nenhum item ficou com nota 2 ou menor. Concentre-se em medir a eficácia e testar os controles.</p>'}

        ${fortes.length ? `<h3 class="aa-subtitulo">Pontos fortes</h3><ul class="aa-fortes">${fortes.map((f) => `<li>${esc(f.p.titulo)} <span class="aa-tag">${esc(f.d.nome)}</span></li>`).join('')}</ul>` : ''}

        <div class="aa-cta">
          <div>
            <h3>Quer transformar o diagnóstico em plano de ação?</h3>
            <p>Envie o resultado para a Resolve Fraude. Seu aplicativo de e-mail abrirá com o resumo pronto; nada é enviado sem você confirmar.</p>
          </div>
          <div class="botoes">
            <a class="botao" href="${mailto}">Enviar resultado por e-mail</a>
            <button class="botao botao-contorno" type="button" data-imprimir>Salvar em PDF</button>
          </div>
        </div>

        <p class="aa-aviso">Esta autoavaliação é indicativa e baseada nas respostas informadas. Não substitui auditoria, certificação ou parecer jurídico. As referências citam requisitos e boas práticas da ISO/IEC 27001:2022, ISO/IEC 27005, ISO 22301, NIST CSF 2.0, CIS Controls v8.1, COSO/ACFE Fraud Risk Management Guide, ISO 37001, 37002 e 37301, ISO/IEC 27701, LGPD e resoluções da ANPD.</p>
        <p class="aa-refazer"><button class="link" type="button" data-refazer>Refazer a autoavaliação</button></p>
      </section>`;
    app.querySelector('[data-imprimir]').addEventListener('click', () => window.print());
    app.querySelector('[data-refazer]').addEventListener('click', () => {
      estado.respostas = {};
      irPara(1);
    });
  }

  function desenhar() {
    if (!estado.dados || !estado.dados.email) estado.etapa = 0;
    if (estado.etapa === 0) telaInicial();
    else if (estado.etapa <= DOMINIOS.length) telaDominio(estado.etapa);
    else telaResultado();
  }

  desenhar();
})();
