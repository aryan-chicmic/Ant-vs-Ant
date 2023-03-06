import { _decorator, Component, Node, game, director, AudioSource } from "cc";
import AudioControllerObject from "./AudioController";
const { ccclass, property } = _decorator;

@ccclass("menuButton")
export class menuButton extends Component {
  @property({ type: Node })
  menuButton: Node = null;
  @property({ type: Node })
  Loader: Node = null;
  // soundEffect(playerButtonEffect: Node) {
  //   let audio = playerButtonEffect.getComponent(AudioSource);
  //   AudioControllerObject.playSoundEffetcs(audio.clip);
  // }
  onLoad() {
    this.Loader.active = false;
  }
  start() {}
  resumeGame() {
    director.resume();
    this.menuButton.active = false;
  }
  mainMenu() {
    this.Loader.active = true;
    setTimeout(() => {
      this.Loader.active = false;
      director.loadScene("MAIN");

      game.restart();
    }, 1000);
  }
  quitGame() {
    game.end();
  }
  update(deltaTime: number) {}
}
