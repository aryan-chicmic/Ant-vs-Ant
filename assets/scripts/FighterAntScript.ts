import { _decorator, Component, Node, Sprite, SpriteFrame, Prefab } from "cc";
import { PLAYER } from "./constants";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("FighterAntScript")
export class FighterAntScript extends Component {
  @property({ type: Prefab })
  coinUpdater: Prefab;
  AntName: string = null;
  TimeToCoverChangeInY: number = null;
  SpriteName: SpriteFrame = null;
  Health: number = null;
  Damage: number = null;
  CoinAlloted: number = null;
  Shield: number = null;
  WhichPlayer: PLAYER = PLAYER.NONE;
  singletonObj: singleton = null;
  coins1: number;
  coins2: number;
  onLoad() {
    this.singletonObj = singleton.getInstance();
    this.coins1 = singleton.coins1;
    this.coins2 = singleton.coins2;
  }
  /**
   * @description
   * @param
   */
  AddSpecs(
    AntName: string,
    TimeToCoverChangeInY: number,
    sprite: SpriteFrame,
    Health: number,
    Damage: number,
    CoinAlloted: number,
    Shield: number,
    whichplayer: PLAYER
  ) {
    console.log("call", sprite);
    this.AntName = AntName;
    this.TimeToCoverChangeInY = TimeToCoverChangeInY;
    this.SpriteName = sprite;
    this.node.getComponent(Sprite).spriteFrame = this.SpriteName;
    this.Health = Health;
    this.Damage = Damage;
    this.CoinAlloted = CoinAlloted;
    this.Shield = Shield;
    this.WhichPlayer = whichplayer;
    console.log("FighterPlayer", this.WhichPlayer);
    if (whichplayer == PLAYER.PLAYER1) {
      singleton.coins1 = singleton.coins1 - this.CoinAlloted;
      console.log("player1", singleton.coins1, singleton.coins2);
    }
    if (whichplayer == PLAYER.PLAYER2) {
      singleton.coins2 = singleton.coins2 - this.CoinAlloted;
    }
    // console.log(singleton.coins1);
  }

  start() {}

  update(deltaTime: number) {}
}
