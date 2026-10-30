//ACORDEÃO (ABRIR E FECHAR CONTEÚDOS)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});

//LINHA DO TEMPO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//EIXO E ALIADOS
function mostrarBlocoGuerra(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo-guerra").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        pergunta: "O que caracteriza uma Progressão Aritmética (PA)?",
        alternativas: ["A repetição de um único número", "A divisão por números diferentes", "A soma de um valor fixo", "A multiplicação por um valor fixo"],
        correta: 2,
        explicacao: "Uma PA possui uma diferença constante entre termos consecutivos."
    },
    {
        pergunta: "Qual das sequências abaixo é uma PG?",
        alternativas: ["5, 10, 15, 20", "2, 4, 6, 8", "3, 6, 12, 24", "1, 3, 5, 7"],
        correta: 2,
        explicacao: "Cada termo é obtido multiplicando o anterior por 2."
    },
    {
        pergunta: "Qual é a razão da PA: 4, 7, 10, 13...?",
        alternativas: ["2", "3", "4", "7"],
        correta: 1,
        explicacao: "7 − 4 = 3, e essa diferença se repete."
    },
    {
        pergunta: "Qual é a razão da PG: 2, 6, 18, 54...?",
        alternativas: ["4", "2", "6", "3"],
        correta: 3,
        explicacao: "6 ÷ 2 = 3, e os termos seguintes mantêm essa razão."
    },
    {
        pergunta: "Qual é o próximo termo da PA: 10, 15, 20, 25...?",
        alternativas: ["35", "30", "50", "28"],
        correta: 1,
        explicacao: "Somando 5 ao último termo, 25 + 5 = 30."
    },
    {
        pergunta: "Qual é o próximo termo da PG: 3, 6, 12, 24...?",
        alternativas: ["48", "30", "36", "27"],
        correta: 0,
        explicacao: "A razão é 2; portanto, 24 × 2 = 48."
    },
    {
        pergunta: "Na PA, a diferença entre termos consecutivos é constante.",
        alternativas: ["Verdadeiro", "Falso"],
        correta: 0,
        explicacao: "Essa diferença fixa é a razão aditiva da PA."
    },
    {
        pergunta: "Na PG 2, 6, 18, 54, a razão é 3.",
        alternativas: ["Verdadeiro", "Falso"],
        correta: 0,
        explicacao: "Cada termo é o anterior multiplicado por 3."
    },
    {
        pergunta: "Qual fórmula permite calcular o termo geral de uma PA?",
        alternativas: ["S = a₁ × q", "aₙ = a₁ + (n − 1)r", "aₙ = a₁ × qⁿ⁻¹", "aₙ = a₁ ÷ n"],
        correta: 1,
        explicacao: "A fórmula soma ao primeiro termo a quantidade necessária de razões aditivas."
    },
    {
        pergunta: "Qual é o 4º termo da PG: 2, 4, 8, ...?",
        alternativas: ["10", "12", "14", "16"],
        correta: 3,
        explicacao: "O terceiro termo é 8; multiplicando por 2, obtemos 16."
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}
