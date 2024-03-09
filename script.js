const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const mushroom = document.querySelector(".mushroom");
const counterNumber = document.querySelector(".counter-number");

const PIPE_LEFT_POSITION = 0;
const PIPE_COLISION = 120;
const MARIO_COLISION = 80;
var pipeAnimationCount = 5;

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
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (
    pipePosition <= PIPE_COLISION &&
    pipePosition > PIPE_LEFT_POSITION &&
    marioPosition < MARIO_COLISION
  ) {
    stopAnimationsGame(pipePosition, marioPosition);

    showMarioGameOver();

    clearInterval(gameLoop);

    setTimeout(() => {
      Swal.fire({
        title: "Você perdeu",
        html: `Pule por <strong>5</strong> obstaculos para explodir o cogumelo alucinógeno `,
        confirmButtonColor: "#4C956C",
        confirmButtonText: "Jogar novamente",
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    }, 100);
  }

  if (pipeAnimationCount <= 0) {
    stopAnimationsGame(pipePosition, marioPosition);
    removeMarioImage();
    animateMushroom();
    setTimeout(() => {
      showInvite();
    }, 5000);

    clearInterval(gameLoop);
  }
}, 10);

const stopAnimationsGame = (pipePosition, marioPosition) => {
  pipe.style.animation = "none";
  pipe.style.left = `${pipePosition}px`;

  mario.style.animation = "none";
  mario.style.bottom = `${marioPosition}px`;
};

const showMarioGameOver = () => {
  mario.src = "./images/game-over.png";
  mario.style.width = "75px";
  mario.style.marginLeft = "50px";
};

const removeMarioImage = () => {
  mario.style.visibility = "hidden";
  counterNumber.style.visibility = "hidden";
};

const animateMushroom = () => {
  mushroom.classList.add("mushroom-animation");
  setTimeout(() => {
    mushroom.src = "./images/explosion.gif";
  }, 3000);
};

const showInvite = () => {
  Swal.fire({
    allowOutsideClick: false,
    showCancelButton: false,
    showConfirmButton: false,
    width: 700,
    html: `<div style="height: 655px"></div>`,
    color: "#95D5B1",
    background: "#fff url(images/diogo-iara.gif)",
    showClass: {
      popup: `
        animate__animated
        animate__bounceInUp
        animate__faster
      `,
    },
    hideClass: {
      popup: `
        animate__animated
        animate__backOutUp
        animate__faster
      `,
    },
  });
};

document.addEventListener("keydown", jump);

pipe.addEventListener("animationiteration", function (event) {
  pipeAnimationCount--;

  if ("textContent" in counterNumber) {
    counterNumber.textContent = pipeAnimationCount;
  } else {
    counterNumber.innerText = pipeAnimationCount;
  }
});
