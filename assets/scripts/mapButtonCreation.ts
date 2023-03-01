import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  Label,
  Input,
  Button,
  Director,
  director,
} from "cc";
import { map } from "./map";
const { ccclass, property } = _decorator;

@ccclass("mapButtonCreation")
export class mapButtonCreation extends Component {
  @property({ type: Prefab })
  mapButtonPrefab: Prefab = null;
  @property({ type: Node })
  mapButtonCollector: Node;
  @property({ type: Node })
  player1_node: Node;
  @property({ type: Node })
  player2_node: Node;
  @property({ type: Node })
  help_node: Node;
  @property({ type: Node })
  loader: Node;
  button: Node = null;

  onLoad() {}
  // loadMap() {
  //   var num = this.button.getComponent(map).getMapNumber();
  //   // director.loadScene(`MAP${num}`);
  //   console.log(num);
  // }

  start() {}
  buttonCreator() {
    this.player1_node.active = false;
    this.player2_node.active = false;
    this.help_node.active = false;
    this.loader.active = true;
    setTimeout(() => {
      this.loader.active = false;
      for (var i = 3; i > 0; i--) {
        this.button = instantiate(this.mapButtonPrefab);

        this.button
          .getComponent(map)
          .setButtonPosition(this.mapButtonCollector, i);
        // this.button.on(Input.EventType.TOUCH_START, this.loadMap, this);
      }
    }, 3000);
  }

  update(deltaTime: number) {}
}
