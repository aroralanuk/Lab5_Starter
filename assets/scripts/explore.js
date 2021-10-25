// explore.js

window.addEventListener("DOMContentLoaded", init);
let synth = window.speechSynthesis;

function init() {
  // all HTML elements being pulled
  const speakBtn = document.querySelector("button");
  const textBox = document.querySelector("#text-to-speak");
  const voiceSelect = document.querySelector("#voice-select");
  const speakFace = document.querySelector("section#explore img");

  let voices = [];
  let utterance = new SpeechSynthesisUtterance();

  // waiting for the voices to load from the api
  speechSynthesis.addEventListener("voiceschanged", () => {
    voices = speechSynthesis.getVoices();
    populateVoiceList();
    checkForSpeak();
    voiceControl();
    // console.log(voices);
  });

  // inspired by MDN documentation on speechSynthesis here: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
  function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    var voiceSelect = document.querySelector("select");

    for (var i = 0; i < voices.length; i++) {
      // pretty printing voices as option fields
      var option = document.createElement("option");
      option.textContent = voices[i].name + " (" + voices[i].lang + ")";
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  function checkForSpeak() {
    speakBtn.addEventListener("click", (event) => {
      // checking if voices are loaded and not currenly being spoken or waiting to be spoken
      if (utterance.voice && !utterance.speaking && !utterance.pending) {
        let msg = textBox.value;
        utterance.text = msg;
        speakFace.src = "./assets/images/smiling-open.png";
        speechSynthesis.speak(utterance);
      } else {
        alert("ERROR: select a voice first");
      }
    });

    // getting around making a event for the the mouth to close
    let speakInterval = setInterval(() => {
      if (!utterance.speaking && !utterance.pending) {
        setTimeout(() => {
          speakFace.src = "./assets/images/smiling.png";
        }, 1000);
      }
    }, 1000);
  }

  // picking the voice
  function voiceControl() {
    voiceSelect.addEventListener("change", (event) => {
      console.log(event.target.value);
      var optionData = event.target.options[event.target.selectedIndex].dataset;
      console.log(optionData);
      utterance.voice = voices.filter(function (voice) {
        return voice.name === optionData.name && voice.lang === optionData.lang;
      })[0];
      if (!utterance.voice) {
        alert("ERROR: voice not found!");
      }
      console.log(utterance.voice);
    });
  }
}
