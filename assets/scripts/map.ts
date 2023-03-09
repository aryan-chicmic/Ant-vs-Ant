import {
  _decorator,
  Component,
  Node,
  Button,
  Label,
  Input,
  director,
  AudioSource,
  TiledMapAsset,
  UITransform,
} from "cc";
import AudioControllerObject from "./AudioController";
import { mapButtonCreation } from "./mapButtonCreation";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("map")
export class map extends Component {
  @property({ type: Label })
  label: Label = null;
  mapNumber: Number = 0;
  labelString = "";
  singletonObject: singleton;
  onLoad() {
    this.singletonObject = singleton.getInstance();
  }
  start() {}
  soundEffect(playerButtonEffect: Node) {
    let audio = playerButtonEffect.getComponent(AudioSource);
    console.log("map", audio);
    AudioControllerObject.playSoundEffetcs(audio.clip);
  }
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
    this.label.string = `MAP ${i}`;
    // this.mapNumber = i;
    Parent.addChild(this.node);
  }

  click() {
    this.soundEffect(this.node);
    console.log(this.label.string);
    console.log("btn clicked");
    this.labelString = this.label.string;
    this.singletonObject.mapAssigner(this.labelString);

    director.loadScene("MAP");
  }

  update(deltaTime: number) {}
}
