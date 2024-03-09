const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const PIPE_LEFT_POSITION = 0;
const PIPE_COLISION = 120;
const MARIO_COLISION = 80;
var pipeAnimationCount = 0;

const jump = (event) => {

  if (event.code == "Space") {
    mario.classList.add("jump");
    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);
  }
};

const gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= PIPE_COLISION && pipePosition > PIPE_LEFT_POSITION && marioPosition < MARIO_COLISION) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(gameLoop);

        setTimeout(() => {
          const confirmReload = confirm(`Você perdeu, deseja jogar novamente? Score: ${pipeAnimationCount }`);
          if (confirmReload) {
            location.reload();
          } 
      }, 100);
    }

    if (pipeAnimationCount >= 5 ) {
        alert('vc ganhou')
    }

}, 10)

document.addEventListener("keydown", jump);

pipe.addEventListener('animationiteration', function(event) {
  pipeAnimationCount++;
});
