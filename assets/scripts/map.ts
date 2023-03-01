import {
  _decorator,
  Component,
  Node,
  Button,
  Label,
  Input,
  director,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("map")
export class map extends Component {
  @property({ type: Label })
  label: Label = null;
  mapNumber: Number = 0;
  start() {}

  setButtonPosition(Parent: Node, i: number) {
    this.node.setPosition(-221, -50 - 200 * i);
    this.label.string = `MAP ${i * 2 - 1}`;
    // this.mapNumber = i;
    Parent.addChild(this.node);
  }

  click() {
    console.log(this.label.string);
    console.log("btn clicked");
    director.loadScene(`${this.label.string}`);
  }
  // getMapNumber() {
  //   return this.mapNumber;
  // }

  update(deltaTime: number) {}
}
