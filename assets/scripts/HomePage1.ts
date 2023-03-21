import { _decorator, Component, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("HomePage1")
export class HomePage1 extends Component {
  @property({ type: Prefab })
  HomePage2 = null;
  onClickNext() {
    this.node.destroy();
  }
  start() {}

  update(deltaTime: number) {}
}
