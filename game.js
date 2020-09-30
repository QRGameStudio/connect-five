const GAME_SIZE = [50, 50];

function gameInit() {
  let gameFinished = false;
  const content = document.querySelector(".content");
  content.innerHTML = "";
  const layer = document.createElement("div");
  layer.className = "layer";

  let currentPlayer = "X";

  for (let y = 0; y < GAME_SIZE[1]; y++) {
    for (let x = 0; x < GAME_SIZE[0]; x++) {
      const field = document.createElement("div");
      field.className = "field empty";
      field.style.gridColumn = `${x + 1}`;
      field.style.gridRow = `${y + 1}`;
      field.id = `f-${y}-${x}`;
      field.onclick = () => {
        if (gameFinished) {
          layer.classList.add("hidden");
          gameInit();
          return;
        }
        if (!field.classList.contains("empty")) {
          return;
        }
        field.innerHTML = `<span>${currentPlayer}</span>`;
        field.classList.remove("empty");
        field.classList.add(`p-${currentPlayer}`);
        for (let move of [
          [1, 0],
          [0, 1],
          [1, 1],
          [1, -1],
        ]) {
          const mx = move[0];
          const my = move[1];
          const parts = field.id.split("-");
          let x = parts[2] - 4 * mx;
          let y = parts[1] - 4 * my;
          for (let i = 0; i < 5; i++) {
            let isWin = true;
            let xb = x;
            let yb = y;
            for (let j = 0; j < 5; j++) {
              const f2 = document.querySelector(`#f-${yb}-${xb}`);
              if (!f2 || !f2.classList.contains(`p-${currentPlayer}`)) {
                isWin = false;
                break;
              }
              f2.classList.add("win");
              xb += mx;
              yb += my;
            }
            if (isWin) {
              content.classList.add("finished");
              gameFinished = true;
              break;
            } else {
              removeWins();
            }
            x += mx;
            y += my;
          }
          if (gameFinished) {
            return;
          }
          removeWins();
        }
        currentPlayer = currentPlayer === "O" ? "X" : "O";
      };
      content.appendChild(field);
    }
  }

  layer.appendChild(content);
  document.body.appendChild(layer);

  setTimeout(() => {
    const rect = content.getBoundingClientRect();
    layer.scrollLeft = rect.width / 2;
    layer.scrollTop = rect.height / 2;
  });
}

function removeWins() {
  const wins = document.getElementsByClassName("win");
  for (let k = 0; k < wins.length; k++) {
    wins.item(k).classList.remove("win");
  }
}

const gameStart = gameInit;
window.onload = gameStart;
