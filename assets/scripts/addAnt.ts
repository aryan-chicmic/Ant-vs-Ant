import { _decorator, Component, Node, instantiate, Prefab } from "cc";
import { ant } from "./ant";
const { ccclass, property } = _decorator;

@ccclass("addAnt")
export class addAnt extends Component {
  @property({ type: Prefab })
  antPrefab: Prefab = null;
  @property({ type: Node })
  antNode: Node;
  @property({ type: Node })
  loader: Node = null;
  initialPosX = 0;
  initialPosY = 0;
  makeAnt() {
    let antObject = instantiate(this.antPrefab);
    return antObject;
  }
  start() {
    this.loader.active = false;
    for (var i = 0; i < Math.floor(Math.random() * 2) + 10; i++) {
      var newAnt = this.makeAnt();

      newAnt.getComponent(ant).setInitialPos(this.antNode);
      newAnt.getComponent(ant).startMovement();
    }
  }

  update(deltaTime: number) {}
}
