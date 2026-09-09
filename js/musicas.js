const cards = document.querySelectorAll(".musicaCard");

let musicaTocando = null;
let timeoutTrecho = null;


// =========================
// PARAR E VOLTAR PRO INÍCIO DO TRECHO
// =========================

function pararMusica(audio) {

    audio.pause();

    audio.currentTime = parseFloat(audio.dataset.inicio) || 0;

}


cards.forEach(card => {

    const audio = card.querySelector("audio");

    // Segundo em que o trecho de destaque começa (definido no HTML)
    const inicio = parseFloat(audio.dataset.inicio) || 0;

    // Quantos segundos do trecho serão tocados
    const duracao = parseFloat(audio.dataset.duracao) || 15;

    // Acessibilidade: os cards eram <div>, então não davam pra
    // alcançar com Tab nem ativar com o teclado. Agora funcionam
    // como um botão de verdade.
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    if (!card.hasAttribute("aria-label")) {
        const nomeMusica = card.querySelector("p")?.textContent.trim();
        card.setAttribute(
            "aria-label",
            `Tocar trecho de ${nomeMusica || "música"}`
        );
    }


    // =========================
    // TOCAR O TRECHO DE DESTAQUE
    // (usado no hover do mouse e ao focar via teclado)
    // =========================

    function tocarTrecho() {

        // Para a música anterior
        if (musicaTocando && musicaTocando !== audio) {
            pararMusica(musicaTocando);
        }

        // Guarda a música atual
        musicaTocando = audio;

        // Vai direto pro trecho de destaque
        audio.currentTime = inicio;

        // Começa a tocar
        audio.play().catch(() => {
            // Navegador bloqueou o autoplay; o usuário ainda
            // pode ativar clicando ou apertando Enter/Espaço no card.
        });

        // Depois de "duracao" segundos, para sozinho
        clearTimeout(timeoutTrecho);
        timeoutTrecho = setTimeout(() => {
            pararMusica(audio);
        }, duracao * 1000);

    }


    // =========================
    // PARAR AO SAIR (mouse ou foco)
    // =========================

    function sairDoTrecho() {

        clearTimeout(timeoutTrecho);

        pararMusica(audio);

        if (musicaTocando === audio) {
            musicaTocando = null;
        }

    }


    // =========================
    // ALTERNAR PLAY/PAUSE
    // (usado no clique do mouse e no Enter/Espaço do teclado)
    // =========================

    function alternarPlay() {

        if (audio.paused) {

            if (musicaTocando && musicaTocando !== audio) {
                pararMusica(musicaTocando);
            }

            musicaTocando = audio;

            // Se o tempo atual estiver fora do trecho, volta pro início dele
            if (audio.currentTime < inicio || audio.currentTime >= inicio + duracao) {
                audio.currentTime = inicio;
            }

            audio.play();

            clearTimeout(timeoutTrecho);
            timeoutTrecho = setTimeout(() => {
                pararMusica(audio);
            }, duracao * 1000);

        } else {

            clearTimeout(timeoutTrecho);
            audio.pause();

        }

    }


    // Mouse
    card.addEventListener("mouseenter", tocarTrecho);
    card.addEventListener("mouseleave", sairDoTrecho);
    card.addEventListener("click", alternarPlay);

    // Teclado (Tab para focar, Enter/Espaço para tocar/pausar)
    card.addEventListener("focus", tocarTrecho);
    card.addEventListener("blur", sairDoTrecho);

    card.addEventListener("keydown", evento => {

        if (evento.key === "Enter" || evento.key === " ") {

            evento.preventDefault();
            alternarPlay();

        }

    });

});