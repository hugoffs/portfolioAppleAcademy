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


    // =========================
    // MOUSE ENTROU
    // =========================

    card.addEventListener("mouseenter", () => {

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

            console.log(
                "O navegador bloqueou o autoplay. Clique no card para tocar."
            );

        });

        // Depois de "duracao" segundos, para sozinho
        clearTimeout(timeoutTrecho);
        timeoutTrecho = setTimeout(() => {
            pararMusica(audio);
        }, duracao * 1000);

    });


    // =========================
    // MOUSE SAIU
    // =========================

    card.addEventListener("mouseleave", () => {

        clearTimeout(timeoutTrecho);

        pararMusica(audio);

        if (musicaTocando === audio) {
            musicaTocando = null;
        }

    });


    // =========================
    // CLIQUE
    // =========================

    card.addEventListener("click", () => {

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

    });

});