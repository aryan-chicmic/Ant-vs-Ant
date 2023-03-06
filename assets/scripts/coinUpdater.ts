import { _decorator, Component, Node, Label } from "cc";
const { ccclass, property } = _decorator;
import { singleton } from "./singleton";
@ccclass("coinUpdater")
export class coinUpdater extends Component {
  @property({ type: Label })
  coinLabel1: Label = null;
  @property({ type: Label })
  coinLabel2: Label = null;
  coins1 = 0;
  coins2 = 0;
  maximumCoins = 300;
  singletonObj: singleton = null;
  onLoad() {
    this.singletonObj = singleton.getInstance();
    this.coins1 = singleton.coins1;
    this.coins2 = singleton.coins2;
  }
  start() {
    if (this.coins1 < this.maximumCoins) {
      this.schedule(this.coinUpdateFunc1, 0.1);
    }
    if (this.coins2 < this.maximumCoins) {
      this.schedule(this.coinUpdateFunc2, 0.1);
    }
  }
  coinUpdateFunc1() {
    if (this.coinLabel1 != null && singleton.coins1 < this.maximumCoins) {
      singleton.coins1++;
      this.coinLabel1.string = `${singleton.coins1}`;
    }
  }
  coinUpdateFunc2() {
    if (this.coinLabel2 != null && singleton.coins2 < this.maximumCoins) {
      singleton.coins2++;
      this.coinLabel2.string = `${singleton.coins2}`;
    }
  }
  update(deltaTime: number) {}
}
