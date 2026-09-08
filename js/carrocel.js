const imagens = [
    "../img/viagem.png",
    "../img/bordado.png",
    "../img/salgado.png",
    "../img/churasco.png",
    "../img/megui.png",
    "../img/academia.png",
    "../img/fut.png",
    "../img/jogo.png",
    "../img/cinuca.png"
];

let imagemAtual = 0;

const imagem = document.getElementById("imagemAtual");
const indicadores = document.getElementById("indicadores");
const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");


// Verifica se encontrou os elementos
console.log("Imagem:", imagem);
console.log("Indicadores:", indicadores);
console.log("Anterior:", anterior);
console.log("Próximo:", proximo);


// =========================
// CRIAR INDICADORES
// =========================

imagens.forEach((_, index) => {

    const indicador = document.createElement("div");

    indicador.classList.add("indicador");

    if (index === 0) {
        indicador.classList.add("ativo");
    }

    indicador.addEventListener("click", function () {

        imagemAtual = index;

        atualizarCarousel();

    });

    indicadores.appendChild(indicador);
});


// =========================
// ATUALIZAR CARROSSEL
// =========================

function atualizarCarousel() {

    imagem.src = imagens[imagemAtual];

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
