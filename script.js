

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
        stopAnimationsGame(pipePosition, marioPosition);

        showMarioGameOver();

        clearInterval(gameLoop);

        setTimeout(() => {
          Swal.fire({
            title: "Você perdeu",
            html: `Score: <strong>${pipeAnimationCount }</strong>`,
            confirmButtonColor: "#4C956C",
            confirmButtonText: "Jogar novamente"
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
      }, 100);
    }

    if (pipeAnimationCount >= 1 ) {
      stopAnimationsGame(pipePosition, marioPosition);
      removeMarioImage();

      setTimeout(() => {
        Swal.fire({
          allowOutsideClick: false,
          showCancelButton: false,
          showConfirmButton: false,
          width: 1414,
          html: `<div style="height: 2000px"></div>`,
          color: "#95D5B1",
          background: "#fff url(images/convite-teste.png)",
          showClass: {
            popup: `
              animate__animated
              animate__bounceInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__backOutUp
              animate__faster
            `
          }
        });


      }, 100)

      clearInterval(gameLoop);
    }

}, 10)

const stopAnimationsGame = (pipePosition, marioPosition) => {
  pipe.style.animation = 'none';
  pipe.style.left = `${pipePosition}px`;

  mario.style.animation = 'none';
  mario.style.bottom = `${marioPosition}px`;
}

const showMarioGameOver = () => {
  mario.src = './images/game-over.png';
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';
}

const removeMarioImage = () => {
  mario.style.visibility = 'hidden';
}

document.addEventListener("keydown", jump);

pipe.addEventListener('animationiteration', function(event) {
  pipeAnimationCount++;
});
