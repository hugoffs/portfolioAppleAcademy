const projetos = document.querySelectorAll(".projeto");

const indicadores = document.querySelectorAll(".indicador");

const carousel = document.getElementById("carousel");

const anterior = document.getElementById("anterior");

const proximo = document.getElementById("proximo");

let projetoAtual = 0;


/* =====================================================
    ATUALIZA O CARROSSEL
===================================================== */

function atualizarCarousel() {

    const projeto = projetos[projetoAtual];

    const largura = projeto.offsetWidth;

    const gap = 24;

    const deslocamento =
        projetoAtual * (largura + gap);


    carousel.style.transform =
        `translateX(-${deslocamento}px)`;


    /* ATIVA O PROJETO */

    projetos.forEach((item, index) => {

        item.classList.toggle(
            "ativo",
            index === projetoAtual
        );

    });


    /* ATIVA O INDICADOR */

    indicadores.forEach((indicador, index) => {

        indicador.classList.toggle(
            "ativo",
            index === projetoAtual
        );

    });

}


/* =====================================================
    PRÓXIMO PROJETO
===================================================== */

function proximoProjeto() {

    projetoAtual++;

    if (projetoAtual >= projetos.length) {

        projetoAtual = 0;

    }

    atualizarCarousel();

}


/* =====================================================
    PROJETO ANTERIOR
===================================================== */

function projetoAnterior() {

    projetoAtual--;

    if (projetoAtual < 0) {

        projetoAtual = projetos.length - 1;

    }

    atualizarCarousel();

}


/* =====================================================
    BOTÃO PRÓXIMO
===================================================== */

proximo.addEventListener(
    "click",
    proximoProjeto
);


/* =====================================================
    BOTÃO ANTERIOR
===================================================== */

anterior.addEventListener(
    "click",
    projetoAnterior
);


/* =====================================================
    INDICADORES
===================================================== */

indicadores.forEach(
    (indicador, index) => {

        indicador.addEventListener(
            "click",
            () => {

                projetoAtual = index;

                atualizarCarousel();

            }
        );

    }
);


/* =====================================================
    TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowRight") {

            proximoProjeto();

        }

        if (event.key === "ArrowLeft") {

            projetoAnterior();

        }

    }
);


/* =====================================================
    REDIMENSIONAMENTO
===================================================== */

window.addEventListener(
    "resize",
    atualizarCarousel
);


/* =====================================================
    INICIALIZAÇÃO
===================================================== */

window.addEventListener(
    "load",
    atualizarCarousel
);