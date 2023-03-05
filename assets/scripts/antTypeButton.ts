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
} from "cc";
const { ccclass, property } = _decorator;
import { ANT_TYPES } from "./constants";
import { AntGenerateManager } from "./AntGenerateManager";
@ccclass("antTypeButton")
export class antTypeButton extends Component {
  @property({ type: Label })
  coinLabel: Label = null;
  @property({ type: Sprite })
  antSprite: Sprite = null;
  @property({ type: JsonAsset })
  mapchooser: JsonAsset = null;
  addSprites(newNode: Node, i: Number) {
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
            newNode.name=dataLoader[index].AntName
          }
        );
      }
    }
  }
  antGenerateButtonClicked(text)
  {
    let antName;
    let TimeToCoverChangeInY;
    let spriteName;
    let Health;
    let Damage;
   let CoinAlloted;
    let Shield;
   let AntGenerate=AntGenerateManager.getInstance();
   let dataLoader: any = this.mapchooser.json;
    dataLoader = dataLoader.AntSpecs;
    let AntName=text.target._name;
    for (let index = 0; index < dataLoader.length; index++) {
      if (dataLoader[index].AntName==AntName) {
        console.log(dataLoader[index])
        antName=dataLoader[index].AntName;
        TimeToCoverChangeInY=dataLoader[index].TimeToCoverChangeInY;
        Health=dataLoader[index].Health;
        Damage=dataLoader[index].Damage;
        CoinAlloted=dataLoader[index].CoinAlloted;
        Shield=dataLoader[index].Shield;
        resources.load(
          dataLoader[index].Sprite,
          SpriteFrame,
          (err: any, tmx) => {
            spriteName = tmx;
          }
        );
      }
    }
  AntGenerate.generateAnt(antName,TimeToCoverChangeInY,spriteName,Health,Damage,CoinAlloted,Shield);
   // console.log(text.target._name);
  }
  start() {
  }

  update(deltaTime: number) {}
}
