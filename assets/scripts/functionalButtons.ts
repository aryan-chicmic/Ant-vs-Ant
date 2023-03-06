import { _decorator, Component, Node, game, director, AudioSource } from "cc";
import AudioControllerObject from "./AudioController";
const { ccclass, property } = _decorator;

@ccclass("menuButton")
export class menuButton extends Component {
  @property({ type: Node })
  menuButton: Node = null;
  @property({ type: Node })
  Loader: Node = null;

  onLoad() {
    //this.Loader.active = false;
  }
  start() {}
  resumeGame() {
    director.resume();
    //this.menuButton.active = false;
  }
  onClickBackButton() {
    console.log("Back Button Clicked");
    this.node.destroy();
    console.log("Help Page Destroyed");
  }
  quitGame() {
    game.end();
  }
  update(deltaTime: number) {}
}
