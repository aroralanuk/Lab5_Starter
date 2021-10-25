// expose.js

window.addEventListener("DOMContentLoaded", init);

let horns = ["air-horn", "car-horn", "party-horn"];

function init() {
  let hornOptions = {};
  horns.forEach((horn) => {
    return (hornOptions[horn] = horn + ".svg");
  });

  const changeHorn = document.querySelector("#horn-select");
  const hornImg = document.querySelector("section#expose img");
  let hornSelected;
  let shootConfetti = false;

  // changing horn and checking for the party one
  changeHorn.addEventListener("change", (event) => {
    if (event.target.value in hornOptions) {
      hornImg.src = "./assets/images/" + hornOptions[event.target.value];
      hornSelected = event.target.value;

      if (event.target.value === "party-horn") {
        shootConfetti = true;
      }
    } else {
      hornImg.src = "./assets/images/no-image.png";
    }
  });

  // voice control selections
  const volumeControl = document.querySelector("div#volume-controls input");
  const volumeIcon = document.querySelector("div#volume-controls img");
  volumeControl.addEventListener("change", (event) => {
    let newVol = parseInt(event.target.value);
    if (newVol < 0 || newVol > 100) {
      console.log("ERROR: volume level needs to be in range of 0 to 100.");
    } else {
      hornAudio.volume = newVol / 100;
      if (newVol === 0) {
        volumeIcon.src = "./assets/icons/volume-level-0.svg";
      } else if (newVol < 33) {
        volumeIcon.src = "./assets/icons/volume-level-1.svg";
      } else if (newVol < 67) {
        volumeIcon.src = "./assets/icons/volume-level-2.svg";
      } else if (newVol <= 100) {
        volumeIcon.src = "./assets/icons/volume-level-3.svg";
      }
    }
    shootConfetti = newVol && changeHorn.value === "party-horn" ? true : false;
  });

  const hornAudio = document.querySelector("audio");
  const playBtn = document.querySelector("button");

  // declaring outside, inside changes the canvas
  const jsConfetti = new JSConfetti();

  playBtn.addEventListener("click", (event) => {
    if (hornSelected) {
      hornAudio.src = "./assets/audio/" + hornSelected + ".mp3";
      hornAudio.play();

      if (shootConfetti) {
        jsConfetti.addConfetti({
          confettiRadius: 6,
        });
      }
    }
  });
}
