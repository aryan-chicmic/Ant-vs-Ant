/**
 * @description updating coins on a label
 */
import { _decorator, Component, Node, Label, Prefab, instantiate } from "cc";
import { PLAYER } from "../ClassScripts/constants";
import { singleton } from "../ClassScripts/singleton";

const { ccclass, property } = _decorator;

@ccclass("coinUpdater")
export class coinUpdater extends Component {
  @property({ type: Prefab })
  coinPrefab1: Prefab = null;
  @property({ type: Prefab })
  coinPrefab2: Prefab = null;
  coins1: number = 0;
  coins2: number = 0;
  maximumCoins = 300;
  coinlabel1: string = "";
  coinlabel2: string = "";
  singletonObj: singleton = null;
  onLoad() {
    this.singletonObj = singleton.getInstance();
  }
  start() {
    if (this.coins1 < this.maximumCoins) {
      this.schedule(() => {
        this.coinUpdateFunc1(this.coins1);
      }, 0.1);
    }
    if (this.coins2 < this.maximumCoins) {
      this.schedule(() => {
        this.coinUpdateFunc1(this.coins2);
      }, 0.1);
    }
  }
  coinUpdateFunc1(whichCoins: number) {
    if (whichCoins == this.coins1) {
      this.coinlabel1 = this.node
        .getChildByName("CoinUpdater1")
        .getChildByName("Label")
        .getComponent(Label).string;
      if (this.coinlabel1 != null && this.coins1 < this.maximumCoins) {
        this.coins1++;
        this.node
          .getChildByName("CoinUpdater1")
          .getChildByName("Label")
          .getComponent(Label).string = `${this.coins1}`;
      }
    }
    if (whichCoins == this.coins2) {
      this.coinlabel2 = this.node
        .getChildByName("CoinUpdater2")
        .getChildByName("Label")
        .getComponent(Label).string;
      if (this.coinlabel2 != null && this.coins2 < this.maximumCoins) {
        this.coins2++;
        this.node
          .getChildByName("CoinUpdater2")
          .getChildByName("Label")
          .getComponent(Label).string = `${this.coins2}`;
      }
    }
    // console.log(this.coinlabel1);
  }

  coinDeduction(AntPlayer: PLAYER, CoinAlloted: number) {
    if (AntPlayer == PLAYER.PLAYER1) {
      this.coins1 -= CoinAlloted;
      this.node
        .getChildByName("CoinUpdater1")
        .getChildByName("Label")
        .getComponent(Label).string = `${this.coins1}`;
    }
    if (AntPlayer == PLAYER.PLAYER2) {
      this.coins2 -= CoinAlloted;
      this.node
        .getChildByName("CoinUpdater2")
        .getChildByName("Label")
        .getComponent(Label).string = `${this.coins2}`;
    }
  }

  checkCoin(CoinAlloted: number, AntPlayer: PLAYER): boolean {
    console.log("COINALLOTED", CoinAlloted);
    console.log("PARSEINT", parseInt(this.coinlabel1, 10));

    if (AntPlayer == PLAYER.PLAYER1) {
      if (CoinAlloted >= parseInt(this.coinlabel1, 10)) {
        console.log("Not enough coins");
        return false;
      } else {
        console.log("Deducting");
        return true;
      }
    } else if (AntPlayer == PLAYER.PLAYER2) {
      if (CoinAlloted >= parseInt(this.coinlabel2, 10)) {
        console.log("Not enough coins");
        return false;
      } else {
        console.log("Deducting");
        return true;
      }
    }
  }

  update(deltaTime: number) {}
}
