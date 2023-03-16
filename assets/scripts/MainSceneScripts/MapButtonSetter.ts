/**
 * @description Initial Map Button Setter and their working
 */
import { _decorator, Component, Node, director, Label, UITransform } from "cc";
import AudioControllerObject from "../ClassScripts/AudioController";
import { singleton } from "../ClassScripts/singleton";

const { ccclass, property } = _decorator;

@ccclass("MapButtonSetter")
export class MapButtonSetter extends Component {
  @property({ type: Label })
  label: Label = null;
  mapNumber: Number = 0;
  labelString = "";
  singletonObject: singleton;
  onLoad() {
    this.singletonObject = singleton.getInstance();
  }
  start() {}
  buttonClickedSoundEffect(ClipName: string) {
    let audio = this.singletonObject.getAudioFile(ClipName);
    AudioControllerObject.playSoundEffetcs(audio);
  }
  /**
   * @description Initial Map Buttons position setter
   * @param Parent
   * @param i
   */
  setButtonPosition(Parent: Node, i: number) {
    this.node.getComponent(UITransform).setAnchorPoint(0.5, 0.5);
    this.node
      .getChildByName("Label")
      .getComponent(UITransform)
      .setAnchorPoint(0.5, 0.5);
    this.node
      .getChildByName("Label")
      .getComponent(UITransform)
      .setContentSize(550, 100);
    this.node.getChildByName("Label").getComponent(Label).fontSize = 80;
    this.node.setPosition(55, 70 - 300 * i);
    this.node.getChildByName("Label").setPosition(40, 35);
    this.node.getComponent(UITransform).setContentSize(600, 300);
    this.label.string = `Map${i}`;
    // this.mapNumber = i;
    Parent.addChild(this.node);
  }
  /**
   * @description onClicking of respective Map button
   */
  onClickofMapButton() {
    this.buttonClickedSoundEffect("buttonClickSound");

    this.labelString = this.label.string;
    this.singletonObject.MapAssigner = this.labelString;

    director.loadScene("MAP");
  }

  update(deltaTime: number) {}
}
