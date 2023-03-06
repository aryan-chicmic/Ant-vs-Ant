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
    this.node.setPosition(-221, -50 - 200 * i);
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
