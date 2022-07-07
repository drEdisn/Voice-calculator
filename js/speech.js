export default class Speech {
  constructor() {
    this.operation = {
      '+': 'плюс',
      '-': 'минус',
      '*': 'умножить',
      '/': 'поделить'
    }
  }

  active() {
    const speech = window.speechSynthesis;
    const buttons = document.querySelectorAll('[data-click="say"]');
    const input = document.querySelector('.panel');
    const submit = document.querySelector('.submit');
    const clear = document.querySelector('.clear');

    buttons.forEach(i => {
      i.addEventListener('click', () => {
        this.say(i.innerText, speech);
        input.value += this.operation[i.innerText] !== undefined ? ` ${i.innerText} ` : i.innerText;
      })
    })

    clear.addEventListener('click', (e) => {
      this.say(e.target.innerText, speech);
      input.value = '';
    })

    submit.addEventListener('click', (e) => {
      const res = Math.trunc(eval(input.value));
      this.say(`${e.target.innerText} ${isNaN(res) ? '' : String(res).split('').join(' ')}`, speech);
      input.value = isNaN(res) ? '' : res;
    })
  }

  say = (text, speech) => {
    const utter = new SpeechSynthesisUtterance();
    utter.text = this.operation[text] !== undefined ? this.operation[text] : text;
    utter.voice = this.getVoice(speech);
    utter.pitch = 1;
    utter.rate = 2;
    speech.speak(utter);
  }

  getVoice(speech) {
    let voices = [];
    function getVoices() {voices = speech.getVoices()};
    getVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = getVoices;
    }
    return voices[0];
  }
}