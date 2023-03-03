import { _decorator, Component, Node, Label, SpriteFrame, Sprite } from "cc";
const { ccclass, property } = _decorator;
import { ANT_TYPES } from "./constants";
@ccclass("antTypeButton")
export class antTypeButton extends Component {
  @property({ type: Label })
  coinLabel: Label = null;
  @property({ type: Sprite })
  antSprite: Sprite = null;
  addSprites(newNode: Node, i: Number) {}
  start() {}

  update(deltaTime: number) {}
}
