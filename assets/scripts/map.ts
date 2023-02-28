import { _decorator, Component, Node, Button, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("map")
export class map extends Component {
  @property({ type: Label })
  label: Label = null;
  start() {}

  setButtonPosition(Parent: Node, i: number) {
    this.node.setPosition(-221, -50 - 200 * i);
    // this.node.getComponent(Label).string = `MAP ${i + 1}`;
    this.label.string = `MAP ${i * 2 - 1}`;
    Parent.addChild(this.node);
  }
  update(deltaTime: number) {}
}
