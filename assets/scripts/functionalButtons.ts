import { _decorator, Component, Node, game, director, AudioSource } from "cc";
import AudioControllerObject from "./AudioController";
const { ccclass, property } = _decorator;

@ccclass("menuButton")
export class menuButton extends Component {
  @property({ type: Node })
  SettingPopUp: Node = null;
  AgainClickedSettingButton: boolean = false;

  onLoad() {}
  start() {}
  /**
   * Resume the Game After clicking Resume Button
   */
  resumeGame() {
    console.log("After Clicking Resume Button");
    director.resume();
    this.SettingPopUp.active = false;
    this.AgainClickedSettingButton = false;
  }
  /**
   * @description back to previous page from help pase
   *
   */
  onClickBackButton() {
    console.log("Back Button Clicked");
    this.node.destroy();
    console.log("Help Page Destroyed");
  }
  /**
   * return to Landing Page
   */
  onClickMainMenu() {
    director.loadScene("MAIN");
    // director.resume;
    // game.restart();
  }
  /**
   * Game Ends Quit Browser
   */
  quitGame() {
    director.end();
  }
  /**
   * Open Up Menu Option
   * Close the Menu Option if Open
   */
  menuButtonFunctionality() {
    if (this.AgainClickedSettingButton == false) {
      this.AgainClickedSettingButton = true;
      this.SettingPopUp.active = true;
      console.log("Game paused Menu Showed");
      director.pause();
    } else {
      this.SettingPopUp.active = false;
      this.AgainClickedSettingButton = false;
      console.log("Game Resumed");
      director.resume();
    }
  }
  update(deltaTime: number) {}
}
