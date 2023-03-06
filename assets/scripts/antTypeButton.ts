import {
  _decorator,
  Component,
  Node,
  Label,
  SpriteFrame,
  Sprite,
  JsonAsset,
  resources,
  TiledMap,
  TiledMapAsset,
  Input,
  Prefab,
  instantiate,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;
import { ANT_TYPES, PLAYER } from "./constants";
import { AntGenerateManager } from "./AntGenerateManager";
import { FighterAntScript } from "./FighterAntScript";
import { singleton } from "./singleton";
@ccclass("antTypeButton")
export class antTypeButton extends Component {
  @property({ type: Label })
  coinLabel: Label = null;
  @property({ type: Sprite })
  antSprite: Sprite = null;
  @property({ type: JsonAsset })
  mapchooser: JsonAsset = null;

  //AntGenerateNode
  @property({ type: Prefab })
  AntGen = null;
  @property({ type: Node })
  AddedAnt = null;

  AntPlayer: PLAYER = PLAYER.NONE;
  //singletonObject
  SingletonObj: singleton = null;
  Map: TiledMap = null;
  onLoad() {
    this.SingletonObj = singleton.getInstance();
    this.Map = this.SingletonObj.getMap();
  }
  // add sprite
  addSprites(newNode: Node, i: Number, Player: PLAYER) {
    this.AntPlayer = Player;
    let dataLoader: any = this.mapchooser.json;
    dataLoader = dataLoader.AntSpecs;
    for (let index = 0; index < dataLoader.length; index++) {
      if (index == i) {
        resources.load(
          dataLoader[index].Sprite,
          SpriteFrame,
          (err: any, tmx) => {
            const asset = this.antSprite.getComponent(Sprite);
            asset.spriteFrame = tmx;
            this.coinLabel.string = dataLoader[index].CoinAlloted;
            newNode.name = dataLoader[index].AntName;
          }
        );
      }
    }
  }
  antGenerateButtonClicked(text) {
    // console.log(text.target._name)
    console.log("WHICH PLAYER", this.AntPlayer);
    let antName;
    let TimeToCoverChangeInY;
    let spriteName;
    let Health;
    let Damage;
    let CoinAlloted;
    let Shield;
    let dataLoader: any = this.mapchooser.json;
    dataLoader = dataLoader.AntSpecs;
    let Name = text.target._name;
    for (let index = 0; index < dataLoader.length; index++) {
      if (dataLoader[index].AntName == Name) {
        // console.log("dataload",dataLoader[index])
        antName = dataLoader[index].AntName;
        TimeToCoverChangeInY = dataLoader[index].TimeToCoverChangeInY;
        Health = dataLoader[index].Health;
        Damage = dataLoader[index].Damage;
        CoinAlloted = dataLoader[index].CoinAlloted;
        Shield = dataLoader[index].Shield;
        resources.load(
          dataLoader[index].Sprite,
          SpriteFrame,
          (err: any, tmx) => {
            // console.log("tmx",tmx);
            spriteName = tmx;
          }
        );
      }
    }

    // set timout k reason taki image load ho sake phir function call ho
    setTimeout(() => {
      console.log("after", spriteName);
      let AntCheck = AntGenerateManager.getInstance();
      let GeneratedAnt = AntCheck.checkpool(this.AntGen);
      GeneratedAnt.getComponent(FighterAntScript).AddSpecs(
        antName,
        TimeToCoverChangeInY,
        spriteName,
        Health,
        Damage,
        CoinAlloted,
        Shield,
        this.AntPlayer
      );
      // console.log("gen", GeneratedAnt);
      GeneratedAnt.getComponent(UITransform).setContentSize(125, 150);

      this.checkPlayerSetPosition(this.AntPlayer, GeneratedAnt);

      this.node.parent.parent.getChildByName("AddedAnt").addChild(GeneratedAnt);
      // console.log(this.node.parent.parent);
    }, 1000);
  }
  checkPlayerSetPosition(Player: PLAYER, GeneratedAnt: Node) {
    console.log("Map exist", this.Map);
    if (this.AntPlayer == PLAYER.PLAYER2) {
      console.log("Player2 angle set");
      GeneratedAnt.angle = 180;
      GeneratedAnt.setPosition(300, 900);
    }
  }
  start() {}

  update(deltaTime: number) {}
}
