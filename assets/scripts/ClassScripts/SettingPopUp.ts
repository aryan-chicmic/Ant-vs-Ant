import { _decorator, Component, Node, director, game } from "cc";
import AudioControllerObject from "./AudioController";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("SettingPopUp")
export class SettingPopUp extends Component {
  AgainClickedSettingButton: boolean = false;
  SingletonObject: singleton = null;
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
    this.node.destroy();
    director.resume();
    // this.SettingPopUp.active = false;
    this.AgainClickedSettingButton = false;
  }
  /**
   * return to Landing Page
   */
  onClickMainMenu() {
    this.buttonClickedSoundEffect("buttonClickSound");
    this.node.destroy();
    director.resume();
    director.loadScene("MAIN");
  }
  /**
   * Game Ends Quit Browser
   */
  quitGame() {
    this.buttonClickedSoundEffect("buttonClickSound");
    console.log("end");
    game.end();
  }
  restartGame() {
    this.node.destroy();
    director.resume();
    director.loadScene("MAP");
  }
  update(deltaTime: number) {}
}
