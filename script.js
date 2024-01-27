   document.addEventListener('DOMContentLoaded', function() {
      const movableImage = document.getElementById('mosca');
      let vidas = 0;
      const limite = 3;
      let clicou = false;
      let intervalID; // Armazena o ID do intervalo
      let tempoRestante = 5;

      function iniciarJogo() {
        const contadorElement = document.getElementById('contador');
        contadorElement.style.display = 'block';

        const contadorIntervalID = setInterval(function() {
          tempoRestante--;
          contadorElement.textContent = tempoRestante;

          if (tempoRestante <= 0) {
            clearInterval(contadorIntervalID);
            contadorElement.style.display = 'none';

            // Chama a função moverImage a cada 5 segundos e armazena o ID do intervalo
            intervalID = setInterval(moverImage, 1500);

            // Adiciona um evento de clique para mover a imagem quando clicada
            movableImage.addEventListener('click', function() {
              clicou = true;
              console.log('Imagem clicada!');
              clearInterval(intervalID); // Cancela o intervalo atual
              intervalID = setInterval(moverImage, 1500); // Configura um novo intervalo
              moverImage();
            });

            // vidas iniciais
            atualizarImagensCoração();

            // cronômetro
            const intervaloCronometroID = setInterval(atualizarCronometro, 1000);

            // Exemplo de como parar o cronômetro após 10 segundos
            setTimeout(() => {
              clearInterval(intervaloCronometroID);
              alert('Cronômetro parado após 10 segundos.');
            }, 120000);
          }
        }, 1000);
      }

      iniciarJogo();

      function moverImage() {
        const maxX = window.innerWidth - movableImage.clientWidth;
        const maxY = window.innerHeight - movableImage.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        movableImage.style.left = `${randomX}px`;
        movableImage.style.top = `${randomY}px`;

        console.log('Imagem movida para:', movableImage.style.left, movableImage.style.top);

        // Incrementa o limite apenas se o movimento foi desencadeado automaticamente (não pelo clique)
        if (!clicou) {
          vidas++;
          console.log('Vidas incrementadas:', vidas);
        }

        if (vidas === limite) {
          console.log('Limite atingido. Redirecionando para gameOver.html');
          clearInterval(intervalID); // Cancela o intervalo
          window.location.href = 'gameOver.html';
        }

        // Reseta o flag de clique após cada movimento
        clicou = false;

        // Atualiza as imagens dos corações
        atualizarImagensCoração();
      }

      // Atualiza as imagens dos corações
      function atualizarImagensCoração() {
        const coracaoElement1 = document.getElementById('coracao1');
        const coracaoElement2 = document.getElementById('coracao2');
        const coracaoElement3 = document.getElementById('coracao3');

        atualizarImagemCoração(coracaoElement1, 1);
        atualizarImagemCoração(coracaoElement2, 2);
        atualizarImagemCoração(coracaoElement3, 3);
      }

      // Atualiza a imagem do coração com base no número de vidas
      function atualizarImagemCoração(coracaoElement, numeroCoração) {
        if (vidas >= numeroCoração) {
          coracaoElement.src = 'imagens/imagens/coracao_vazio.png';
        } else {
          coracaoElement.src = 'imagens/imagens/coracao_cheio.png';
        }
      }

      // cronômetro
      let segundos = 0;
      let minutos = 0;
      let horas = 0;

      const cronometroElement = document.getElementById('cronometro');

      function atualizarCronometro() {
        segundos++;

        if (segundos === 60) {
          segundos = 0;
          minutos++;

          if (minutos === 60) {
            minutos = 0;
            horas++;
          }

            if (minutos === 2) {

                 window.location.href = 'vitoria.html';

            }

        }

        const tempoFormatado = formatarTempo(horas, minutos, segundos);
        cronometroElement.textContent = tempoFormatado;
      }

      function formatarTempo(horas, minutos, segundos) {
        const horasStr = horas < 10 ? `0${horas}` : `${horas}`;
        const minutosStr = minutos < 10 ? `0${minutos}` : `${minutos}`;
        const segundosStr = segundos < 10 ? `0${segundos}` : `${segundos}`;
        return `${horasStr}:${minutosStr}:${segundosStr}`;
      }
    });