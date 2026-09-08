/* =========================
   TRANSIÇÃO DE PÁGINA
========================= */

const transicao = document.querySelector(".transicao");


/* =========================
   ENTRADA DA PÁGINA
========================= */

window.addEventListener("DOMContentLoaded", () => {

    if (transicao) {

        transicao.classList.add("ativo");

        setTimeout(() => {
            transicao.classList.remove("ativo");
        }, 100);

    }

});


/* =========================
   LINKS ENTRE PÁGINAS
========================= */

const links = document.querySelectorAll("a");

links.forEach(link => {

    link.addEventListener("click", function(event) {

        const destino = this.href;


        // Ignora links sem destino
        if (!destino) {
            return;
        }


        // Ignora links que abrem em outra aba
        if (this.target === "_blank") {
            return;
        }


        // Ignora links internos da própria página
        if (this.hash) {
            return;
        }


        // Se não existir a transição
        if (!transicao) {
            return;
        }


        // Impede a troca imediata de página
        event.preventDefault();


        // Ativa a transição
        transicao.classList.add("ativo");


        // Espera a animação terminar
        setTimeout(() => {

            window.location.href = destino;

        }, 1000);

    });

});


/* =========================
   ANIMAÇÃO DAS SEÇÕES
========================= */

const secoes = document.querySelectorAll(
    "section, .rodape"
);


/* Adiciona a classe de animação */

secoes.forEach(secao => {

    secao.classList.add("revelar");

});


/* =========================
   OBSERVER
========================= */

const observer = new IntersectionObserver(

    (entradas) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visivel");

            }

        });

    },

    {
        threshold: 0.15
    }

);


/* Observa todas as seções */

secoes.forEach(secao => {

    observer.observe(secao);

});