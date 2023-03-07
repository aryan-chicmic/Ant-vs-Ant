import { _decorator, Component, Node, game, director, AudioSource } from "cc";
import AudioControllerObject from "./AudioController";
const { ccclass, property } = _decorator;

@ccclass("menuButton")
export class menuButton extends Component {
  onLoad() {}
  start() {}
  resumeGame() {
    director.resume();
  }
  /**
   * @description
   * 
   */
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
