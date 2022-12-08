function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
let cactus = document.querySelector("#cactus");
let dino = document.querySelector("#dino");
let start = document.getElementById("start");

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    if (dino.classList !== "jump") {
      dino.classList.add("jump");
    }
    setTimeout(() => {
      if (dino.classList == "jump") {
        dino.classList.remove("jump");
      }
    }, 1000);
  }
});

let restart = document.getElementById("restart");
let maxScore = 0;
let scoreTab = document.getElementById("score");
function timer() {
  let score = 0;
  scoreTab.style.display = "block";
  let timerTick = setInterval(() => {
    score++;
    scoreTab.innerHTML = `Your score:${score}`;
    if (restart.style.display == "block") {
      clearInterval(timerTick);
    }
  }, 1000);
}

let tick = setInterval(() => {
  let cactuses = document.querySelectorAll("#cactus");
  for (let i = 0; i < cactuses.length; i++) {
    let cactusLeft = getComputedStyle(cactuses[i]).left;
    let dinoWidth = getComputedStyle(dino).width;
    let dinoLeft = getComputedStyle(dino).left;
    let cactusTop = getComputedStyle(cactuses[i]).top;
    let cactusHeight = getComputedStyle(cactuses[i]).height;
    let dinoHeight = getComputedStyle(dino).height;
    let dinoTop = getComputedStyle(dino).top;
    if (
      parseInt(cactusLeft) <= parseInt(dinoLeft) + parseInt(dinoWidth) &&
      parseInt(dinoTop) + parseInt(dinoHeight) + parseInt(cactusHeight) >=
        parseInt(cactusTop) + parseInt(cactusHeight)
    ) {
      for (let i = 0; i < cactuses.length; i++) {
        restart.style.display = "block";
        cactuses[i].style.animation = "none";
        cactuses[i].style.display = "none";
      }
    } else {
    }
  }
}, 100);

window.addEventListener("load", () => {
  start.style.display = "block";
});
restart.addEventListener("click", () => {
  timer();
  restart.style.display = "none";
  let cactuses = document.querySelectorAll("#cactus");
  for (let i = 1; i < cactuses.length; i++) {
    cactuses[i].remove();
  }
  cactus.style.display = "block";
  cactus.style.animation = "cactus 6s infinite linear";
  scoreTab.innerHTML = `Your score:0`;
  tick;
  timer();
});

setInterval(() => {
  if (restart.style.display !== "block" && start.style.display !== "block") {
    let cact = document.createElement("div");
    cact.id = "cactus";
    cact.style.animation = "cactus 6s infinite linear";
    let game = document.getElementById("game");
    game.append(cact);
  }
}, getRandom(5000, 10000));
start.addEventListener("click", () => {
  timer();
  start.style.display = "none";
  cactus.style.animation = "cactus 6s infinite linear";
});
