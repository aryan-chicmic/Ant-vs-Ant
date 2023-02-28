import {
  _decorator,
  Component,
  Node,
  tween,
  Vec3,
  Prefab,
  instantiate,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("ANT_TWEEN")
export class ANT_TWEEN extends Component {
  
  originalPosX = 0;
  originalPosY = 0;
  finalPosX = 0;
  finalPosY = 0;
  
  
  start() {
    
  }

  
  update(deltaTime: number) {
    this.Ants.children.forEach((ant: Node) => {
      var canvasHeight = this.node.getComponent(UITransform).height;
      var hOfAnt = ant.getComponent(UITransform).height;

      if (ant.position.y + hOfAnt / 2 > canvasHeight / 2) {
        console.log("hello");

        // var temp = this.finalPosY;
        // this.originalPosY = temp;

        ant.setPosition(0, 0);

        this.antPosition();
      }
    });
  }
}
