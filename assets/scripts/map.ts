import {
  _decorator,
  Component,
  Node,
  Button,
  Label,
  Input,
  director,
  AudioSource,
} from "cc";
import AudioControllerObject from "./AudioController";
import { mapButtonCreation } from "./mapButtonCreation";
const { ccclass, property } = _decorator;

@ccclass("map")
export class map extends Component {
  @property({ type: Label })
  label: Label = null;
  mapNumber: Number = 0;
  start() {}
  soundEffect(playerButtonEffect: Node) {
    let audio = playerButtonEffect.getComponent(AudioSource);
    console.log("map", audio);
    AudioControllerObject.playSoundEffetcs(audio.clip);
  }
  setButtonPosition(Parent: Node, i: number) {
    this.node.setPosition(-221, -50 - 200 * i);
    this.label.string = `MAP ${i * 2 - 1}`;
    // this.mapNumber = i;
    Parent.addChild(this.node);
  }

  click() {
    this.soundEffect(this.node);
    console.log(this.label.string);
    console.log("btn clicked");
    setTimeout(() => {
      director.loadScene(`${this.label.string}`);
    }, 500);
  }
 
  update(deltaTime: number) {}
}
