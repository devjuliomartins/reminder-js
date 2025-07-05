// function (formatação da data/hora)
function formatarDataHora(data) {
  const optionsData = { weekday: 'short', day: 'numeric', month: 'short' };
  let str = data.toLocaleDateString('pt-BR', optionsData);
  str = str.charAt(0).toUpperCase() + str.slice(1);
  str = str.replace(/(\d+) (\w+)/, '$1 de $2');
  const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${str}, ${hora}`;
}

// array, lista (lista de atividads)
const atividades = [
  {
    nome: "Estudar",
    data: new Date("2025-07-04 09:00"),
    finalizada: true
  },
    {
    nome: "Boxe",
    data: new Date("2025-07-05 19:30"),
    finalizada: true
  },
  {
    nome: "Academia",
    data: new Date("2025-07-05 12:00"),
    finalizada: false
  },
  {
    nome: "Postar conteúdo Linkedin",
    data: new Date("2025-07-05 16:00"),
    finalizada: false
  },
  {
    nome: "Jantar com amigos",
    data: new Date("2025-07-05 19:00"),
    finalizada: false
  },
  {
    nome: "Ver Cadeira nova para comprar",
    data: new Date("2025-07-06 14:00"),
    finalizada: false
  },
  {
    nome: "Limpar PC",
    data: new Date("2025-07-04 17:00"),
    finalizada: true
  },
  {
    nome: "Pescar",
    data: new Date("2025-07-02 14:00"),
    finalizada: false
  },
  {
    nome: "#75 Inteligência Artificial - Jornada da Hashtag (Dia 14 a 17)",
    data: new Date("2025-07-14 19:30"),
    finalizada: false
  },
  {
    nome: "#08 NLW 20 | Rocketseat (Dia 07 a 10)",
    data: new Date("2025-07-7 19:30"),
    finalizada: false
  }
]

// arrow function (cria nova atividade)
const criarAtividade = (atividade, index) => {

  let input = `<input type="checkbox" data-index="${index}" `

  // se for true vai add o checked
  if(atividade.finalizada) {
    input = input + 'checked'
  }

  input += '>'

  return `
  <div>
    ${input}
    <span>${atividade.nome}</span>
    <time>${formatarDataHora(atividade.data)}</time>
  </div>
  `
}

// arrow function (atividadeAtrasada)
const addAtividadeAtrasada = (atividadeAtrasada, index) => {

  let input = `<input type="checkbox" data-index="${index}" `

  // se for true vai add o checked
  if(atividadeAtrasada.finalizada) {
    input = input + 'checked'
  }

  input += '>'

  return `
  <div>
    ${input}
    <span>${atividadeAtrasada.nome}</span>
    <time>${formatarDataHora(atividadeAtrasada.data)}</time>
  </div>
  `
}

// arrow function (atividadeConcluida)
const addAtividadeConcluida = (atividadeConcluida, index) => {

  let input = `<input type="checkbox" data-index="${index}" `

  // se for true vai add o checked
  if(atividadeConcluida.finalizada) {
    input = input + 'checked'
  }

  input += '>'

  return `
  <div>
    ${input}
    <span>${atividadeConcluida.nome}</span>
    <time>${formatarDataHora(atividadeConcluida.data)}</time>
  </div>
  `
}

// function que usa o selector para pegar o elemento "section"
const section = document.querySelector('section')

// function que usa o selector para pegar o elemento ".atrasado"
const atrasado = document.querySelector('.atrasado')

// function que usa o selector para pegar o elemento ".concluido"
const concluido = document.querySelector('.concluido')

// function (renderiza todas as atividades)
function renderizarAtividades() {
  // Apaga o conteudo antes de adicionar as atividades
  section.innerHTML = '';
  atrasado.innerHTML = '';
  concluido.innerHTML = '';
  
  const hoje = new Date();
  
  // Renderiza cada atividade
  atividades.forEach((atividade, index) => {
    const dataAtividade = new Date(atividade.data);
    
    if(atividade.finalizada === true) {
      concluido.innerHTML += addAtividadeConcluida(atividade, index);
    } else if (dataAtividade < hoje) {
      atrasado.innerHTML += addAtividadeAtrasada(atividade, index);
    } else {
      section.innerHTML += criarAtividade(atividade, index);
    }
  });
  
  // Adiciona eventos às checkboxes
  adicionarEventosCheckbox();
}

// function (adicionar eventos de clique a checkbox)
function adicionarEventosCheckbox() {
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const index = parseInt(this.getAttribute('data-index'));
      atividades[index].finalizada = !atividades[index].finalizada;
      renderizarAtividades(); // Re-renderiza após a mudança
    });
  });
}

// Inicializa a aplicação
renderizarAtividades();