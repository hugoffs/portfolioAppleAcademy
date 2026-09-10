const imagens = [
    "../img/viagem.webp",
    "../img/bordado.webp",
    "../img/salgado.webp",
    "../img/churasco.webp",
    "../img/megui.webp",
    "../img/academia.webp",
    "../img/fut.webp",
    "../img/jogo.webp",
    "../img/cinuca.webp"
];

// Descrição de cada imagem, na mesma ordem do array acima.
// Usada no "alt" para quem usa leitor de tela conseguir
// acompanhar a troca de foto no carrossel.
const descricoesImagens = [
    "Passeio de barco nas Cataratas do Iguaçu",
    "Bordado com o nome Hugo e escudo de time de futebol",
    "Bandeja de salgados fritos preparados em casa",
    "Preparando churrasco na churrasqueira",
    "Momento de carinho com um cachorro no parque",
    "Treino de musculação na academia",
    "Uniforme da escolinha de futebol",
    "Jogando no console de videogame",
    "Partida de sinuca com um amigo"
];

let imagemAtual = 0;

const imagem = document.getElementById("imagemAtual");
const indicadores = document.getElementById("indicadores");
const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");


// =========================
// CRIAR INDICADORES
// =========================

imagens.forEach((_, index) => {

    const indicador = document.createElement("div");

    indicador.classList.add("indicador");

    // Acessibilidade: dá pra navegar pelos indicadores com Tab
    // e ativá-los com Enter ou Espaço, não só com o mouse.
    indicador.setAttribute("role", "button");
    indicador.setAttribute("tabindex", "0");
    indicador.setAttribute(
        "aria-label",
        `Ver imagem ${index + 1}: ${descricoesImagens[index]}`
    );

    if (index === 0) {
        indicador.classList.add("ativo");
    }

    indicador.addEventListener("click", function () {

        imagemAtual = index;

        atualizarCarousel();

    });

    indicador.addEventListener("keydown", function (evento) {

        if (evento.key === "Enter" || evento.key === " ") {

            evento.preventDefault();

            imagemAtual = index;

            atualizarCarousel();

        }

    });

    indicadores.appendChild(indicador);
});


// =========================
// ATUALIZAR CARROSSEL
// =========================

function atualizarCarousel() {

    imagem.src = imagens[imagemAtual];
    imagem.alt = descricoesImagens[imagemAtual];

    const todosIndicadores =
        document.querySelectorAll(".indicador");

    todosIndicadores.forEach((indicador, index) => {

        if (index === imagemAtual) {
            indicador.classList.add("ativo");
        } else {
            indicador.classList.remove("ativo");
        }

    });
}


// =========================
// BOTÃO ANTERIOR
// =========================

anterior.addEventListener("click", function () {

    imagemAtual--;

    if (imagemAtual < 0) {
        imagemAtual = imagens.length - 1;
    }

    atualizarCarousel();

});


// =========================
// BOTÃO PRÓXIMO
// =========================

proximo.addEventListener("click", function () {

    imagemAtual++;

    if (imagemAtual >= imagens.length) {
        imagemAtual = 0;
    }

    atualizarCarousel();

});