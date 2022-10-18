// passagem pela pag
$(document).ready(function () {
    $(window).scroll(function () {
        // verifica se a janela é rolada mais de 500px, adiciona/remove a classe sólida
        if ($(this).scrollTop() > 100) {
            $('.menu').addClass('visible');
            $('.back-to-top').addClass('visible');
            $('.progress-line').addClass('barra__base');
            $('.barra__cor').addClass('barra__cor-animacao');
        } else {
            $('.menu').removeClass('visible');
            $('.back-to-top').removeClass('visible');
            $('.progress-line').removeClass('barra__base');
            $('.barra__cor').removeClass('barra__cor-animacao');
        }

    });
});


$(document).ready(function () {
    // Adicione rolagem suave a todos os links
    $("a").on('click', function (event) {

        // Certifique-se de que this.hash tenha um valor antes de substituir o comportamento padrão
        if (this.hash !== "") {
            // Impedir o comportamento de clique de âncora padrão
            event.preventDefault();

            // Armazenar hash
            var hash = this.hash;

            // Usando o método animate() do jQuery para adicionar rolagem de página suave
            // O número opcional (800) especifica o número de milissegundos necessários para rolar para a área especificada
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Adicione hash (#) ao URL quando terminar de rolar (comportamento de clique padrão)
                window.location.hash = hash;
            });
        } // Fim
    });
});