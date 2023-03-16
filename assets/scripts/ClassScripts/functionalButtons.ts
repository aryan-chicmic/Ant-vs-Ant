import { _decorator, Component, Node, game, director, AudioSource } from "cc";
import AudioControllerObject from "./AudioController";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("menuButton")
export class menuButton extends Component {
  @property({ type: Node })
  SettingPopUp: Node = null;
  AgainClickedSettingButton: boolean = false;
  SingletonObject: singleton = null;
  onLoad() {}
  start() {
    this.SingletonObject = singleton.getInstance();
  }

  buttonClickedSoundEffect(ClipName: string) {
    let audio = this.SingletonObject.getAudioFile(ClipName);
    AudioControllerObject.playSoundEffetcs(audio);
  }
  /**
   * Resume the Game After clicking Resume Button
   */
  resumeGame() {
    // console.log("After Clicking Resume Button");
    this.buttonClickedSoundEffect("buttonClickSound");
    director.resume();
    this.SettingPopUp.active = false;
    this.AgainClickedSettingButton = false;
  }
  /**
   * @description back to previous page from help pase
   *
   */
  onClickBackButton() {
    this.buttonClickedSoundEffect("buttonClickSound");
    console.log("Back Button Clicked");
    this.node.destroy();
    console.log("Help Page Destroyed");
  }
  /**
   * return to Landing Page
   */
  onClickMainMenu() {
    this.buttonClickedSoundEffect("buttonClickSound");
    director.resume();
    director.loadScene("MAIN");
  }
  /**
   * Game Ends Quit Browser
   */
  quitGame() {
    console.log("end");
    game.end();
  }
  /**
   * Open Up Menu Option
   * Close the Menu Option if Open
   */
  menuButtonFunctionality() {
    this.buttonClickedSoundEffect("buttonClickSound");
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
