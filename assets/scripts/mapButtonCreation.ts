import { _decorator, Component, Node, Prefab, instantiate, Label } from "cc";
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
  makeButton() {
    let button = instantiate(this.mapButtonPrefab);
    return button;
  }
  start() {}
  buttonCreator() {
    this.player1_node.active = false;
    this.player2_node.active = false;
    this.help_node.active = false;
    this.loader.active = true;
    setTimeout(() => {
      this.loader.active = false;
      for (var i = 3; i > 0; i--) {
        var newButton = this.makeButton();

        newButton
          .getComponent(map)
          .setButtonPosition(this.mapButtonCollector, i);
      }
    }, 3000);
  }

  update(deltaTime: number) {}
}
