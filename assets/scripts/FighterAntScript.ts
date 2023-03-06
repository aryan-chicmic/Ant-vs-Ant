import { _decorator, Component, Node, Sprite, SpriteFrame, Prefab } from "cc";
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
  singletonObj: singleton = null;
  coins: number;
  onLoad() {
    this.singletonObj = singleton.getInstance();
    this.coins = singleton.coins;
  }
  AddSpecs(
    AntName: string,
    TimeToCoverChangeInY: number,
    sprite: SpriteFrame,
    Health: number,
    Damage: number,
    CoinAlloted: number,
    Shield: number
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

    singleton.coins = singleton.coins - this.CoinAlloted;
    console.log(singleton.coins);
  }

  start() {}

  update(deltaTime: number) {}
}
