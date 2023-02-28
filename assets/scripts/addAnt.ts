import { _decorator, Component, Node, instantiate, Prefab } from "cc";
import { ant } from "./ant";
const { ccclass, property } = _decorator;

@ccclass("addAnt")
export class addAnt extends Component {
  @property({ type: Prefab })
  antPrefab: Prefab = null;
  @property({ type: Node })
  antNode: Node;
  initialPosX = 0;
  initialPosY = 0;
  makeAnt() {
    let antObject = instantiate(this.antPrefab);
    return antObject;
  }
  start() {
    for (var i = 0; i < Math.floor(Math.random() * 2) + 5; i++) {
      var newAnt = this.makeAnt();

      newAnt.getComponent(ant).setInitialPos(this.node);
      newAnt.getComponent(ant).startMovement();
    }
  }

  update(deltaTime: number) {}
}
