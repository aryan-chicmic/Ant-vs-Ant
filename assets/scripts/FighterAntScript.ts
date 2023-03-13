import {
  _decorator,
  Component,
  Node,
  Sprite,
  SpriteFrame,
  Prefab,
  Button,
  TiledMap,
  instantiate,
  TiledMapAsset,
} from "cc";
import { PLAYER } from "./constants";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("FighterAntScript")
export class FighterAntScript extends Component {
  //property
  @property({ type: Prefab })
  coinUpdater: Prefab;

  //VARIABLE
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
   *
   * @param AntName Name of Ant String
   * @param TimeToCoverChangeInY in Number
   * @param sprite in Sprite
   * @param Health in Number
   * @param Damage in Number
   * @param CoinAlloted in number
   * @param Shield in Number
   * @param whichplayer in Enum Player
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
    this.AntName = AntName;
    this.TimeToCoverChangeInY = TimeToCoverChangeInY;
    this.SpriteName = sprite;
    this.node.getComponent(Sprite).spriteFrame = this.SpriteName;
    this.Health = Health;
    this.Damage = Damage;
    this.CoinAlloted = CoinAlloted;
    this.Shield = Shield;
    this.WhichPlayer = whichplayer;

    if (whichplayer == PLAYER.PLAYER1) {
      singleton.coins1 = singleton.coins1 - this.CoinAlloted;
    }
    if (whichplayer == PLAYER.PLAYER2) {
      singleton.coins2 = singleton.coins2 - this.CoinAlloted;
    }
  }
  getHealth() {
    return this.Health;
  }

  start() {}

  update(deltaTime: number) {}
}
