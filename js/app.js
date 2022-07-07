import Speech from "./speech.js";
import Voice from "./voice.js";

export default class App {
  constructor() {
    this.speech = new Speech();
    this.voice = new Voice();
  }

  start() {
    this.speech.active();
    this.voice.entry();
  }
}