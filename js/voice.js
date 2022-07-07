import Speech from "./speech.js";

export default class Voice {
  constructor() {
    this.speech = new Speech();
  }

  entry() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new  SpeechRecognition();
    const speech = window.speechSynthesis;

    const voice = document.querySelector('.voise__img');
    const input = document.querySelector('.panel');

    voice.onclick = () => recognition.start();

    recognition.onresult = (event) => {
      const strArr = event.results[0][0].transcript.split(' ');
      const str = strArr.map(i => i == 'х' || i == 'x' ? i = '*' : i).join(' ');
      const res = Math.trunc(eval(str));
      this.speech.say(String(res).split('').join(' '), speech);
      input.value = res;
    }
  }
}