const links = document.querySelectorAll(".botoes a");
const transicao = document.querySelector(".transicao");

links.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const destino = this.href;

        // Começa a animação
        transicao.classList.add("ativo");

        // Espera a animação terminar
        setTimeout(() => {
            window.location.href = destino;
        }, 800);

    });

});