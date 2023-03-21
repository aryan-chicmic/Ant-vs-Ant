import { _decorator, Component, Node, game, director, AudioSource, Prefab, instantiate } from "cc";
import AudioControllerObject from "./AudioController";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("menuButton")
export class menuButton extends Component {
  @property({ type: Prefab })
  SettingPopUp: Prefab = null;
  @property({ type: Node })
  audiosource = null;
  AgainClickedSettingButton: boolean = false;
  SingletonObject: singleton = null;
  settingPopUp: Node = null;
  onLoad() {}
  start() {
    this.SingletonObject = singleton.getInstance();
  }

  // buttonClickedSoundEffect(ClipName: string) {
  //   let audio = this.SingletonObject.getAudioFile(ClipName);
  //   AudioControllerObject.playSoundEffetcs(audio);
  // }

  /**
   * @description back to previous page from help pase
   *
   */
  onClickBackButton() {
    // this.buttonClickedSoundEffect("buttonClickSound");
    console.log("Back Button Clicked");
    this.node.destroy();
    console.log("Help Page Destroyed");
  }

  /**
   * Open Up Menu Option
   * Close the Menu Option if Open
   */
  menuButtonFunctionality() {
    // this.buttonClickedSoundEffect("buttonClickSound");
    if (this.AgainClickedSettingButton == false) {
      this.AgainClickedSettingButton = true;
      this.settingPopUp = instantiate(this.SettingPopUp);
      this.settingPopUp.setPosition(100, 400);
      this.SingletonObject.CanvasNode.addChild(this.settingPopUp);
      console.log(this.node);

      console.log("Game paused Menu Showed");
      director.pause();
    } else {
      // this.SettingPopUp.active = false;
      this.settingPopUp.destroy();
      this.AgainClickedSettingButton = false;
      console.log("Game Resumed");
      director.resume();
    }
  }

  /**
   * Resume the Game After clicking Resume Button
   */
  resumeGame() {
    // console.log("After Clicking Resume Button");
    // this.buttonClickedSoundEffect("buttonClickSound");
    director.resume();
    this.node.destroy();
    // this.SettingPopUp.active = false;
    this.AgainClickedSettingButton = false;
  }
  /**
   * return to Landing Page
   */
  onClickMainMenu() {
    // this.buttonClickedSoundEffect("buttonClickSound");
    this.node.destroy();
    director.resume();
    director.loadScene("MAIN");
  }
  /**
   * Game Ends Quit Browser
   */
  quitGame() {
    // this.buttonClickedSoundEffect("buttonClickSound");
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
