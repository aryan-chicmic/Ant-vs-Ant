import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PathSelectorButton")
export class PathSelectorButton extends Component {
  buttonPosition(text) {
    console.log("Button cliceked", text);
    //return this.node.getPosition();
    console.log("path decider button position", this.node.getPosition());
  }
  start() {}

  update(deltaTime: number) {}
}
