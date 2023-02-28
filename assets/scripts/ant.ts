import {
  _decorator,
  Component,
  Node,
  tween,
  Vec3,
  Prefab,
  instantiate,
  UITransform,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;
import { addAnt } from "./addAnt";

@ccclass("ANT")
export class ant extends Component {
  finalPosX = 0;
  finalPosY = 0;
  x = 0;
  y = 0;
  tweenComp: any = null;

  start() {}

  startMovement() {
    this.finalPosX =
      Math.floor(Math.random() * 520) * Math.pow(-1, Math.round(Math.random()));

    if (this.node.position.y > 0) {
      this.finalPosY = Math.floor(Math.random() - 965);
    } else {
      this.finalPosY = Math.floor(Math.random() + 965);
    }
    console.log("final position x , y", this.finalPosX, this.finalPosY);

    var delta_x = this.finalPosX - this.node.position.x;
    var delta_y = this.finalPosY - this.node.position.y;
    var Angle = Math.atan2(delta_y, delta_x);
    Angle = (Angle * 180) / Math.PI;

    this.node.angle = Angle - 90;
    setTimeout(() => {
      this.tweenComp = tween(this.node)
        .to(10, {
          position: new Vec3(this.finalPosX, this.finalPosY),
        })

        .start();
    }, 50);
  }

  setInitialPos(parent: Node) {
    let initialPosX =
      Math.floor(Math.random() * 500) * Math.pow(-1, Math.round(Math.random()));
    let initialPosY =
      Math.floor(Math.random() * 965) * Math.pow(-1, Math.round(Math.random()));

    this.node.setPosition(initialPosX, initialPosY, 0);
    parent.addChild(this.node);
  }

  update(deltaTime: number) {
    if (
      !this.node
        .getParent()
        .getComponent(UITransform)
        .getBoundingBox()
        .contains(new Vec2(this.node.position.x, this.node.position.y))
    ) {
      this.tweenComp.stop();
      console.log("tween stop called");

      this.startMovement();
    }
  }
}
