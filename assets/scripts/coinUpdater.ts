import { _decorator, Component, Node, Label } from "cc";
const { ccclass, property } = _decorator;
import { singleton } from "./singleton";
@ccclass("coinUpdater")
export class coinUpdater extends Component {
  @property({ type: Label })
  coinLabel: Label = null;
  coins = 0;
  maximumCoins = 300;
  singletonObj: singleton = null;
  onLoad() {
    this.singletonObj = singleton.getInstance();
    this.coins = singleton.coins;
  }
  start() {
    if (this.coins == 0 || this.coins < this.maximumCoins) {
      this.schedule(this.coinUpdateFunc, 0.1);
    }
  }
  coinUpdateFunc() {
    if (singleton.coins <= this.maximumCoins) {
      singleton.coins++;
      this.coinLabel.string = `${singleton.coins}`;
    }
  }
  update(deltaTime: number) {}
}
