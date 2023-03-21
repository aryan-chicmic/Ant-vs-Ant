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
} from "cc";
const { ccclass, property } = _decorator;
import { ANT_TYPES } from "./constants";
import { AntGenerateManager } from "./AntGenerateManager";
import { FighterAntScript } from "./FighterAntScript";
@ccclass("antTypeButton")
export class antTypeButton extends Component {
  @property({ type: Label })
  coinLabel: Label = null;
  @property({ type: Sprite })
  antSprite: Sprite = null;
  @property({ type: JsonAsset })
  mapchooser: JsonAsset = null;

  //AntGenerateNode
  @property({type:Prefab})
  AntGen=null;
  @property({type:Node})
  AddedAnt=null
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
   // console.log(text.target._name)
    let antName;
    let TimeToCoverChangeInY;
    let spriteName;
    let Health;
    let Damage;
   let CoinAlloted;
    let Shield;
   let dataLoader: any = this.mapchooser.json;
    dataLoader = dataLoader.AntSpecs;
    let Name=text.target._name;
    for (let index = 0; index < dataLoader.length; index++) {
      if (dataLoader[index].AntName==Name) {
       // console.log("dataload",dataLoader[index])
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
           // console.log("tmx",tmx);
            spriteName = tmx;
          }
        );
      }
    }

    // set timout k reason taki image load ho sake phir function call ho
    setTimeout(()=>{
    console.log("after",spriteName);
       let AntCheck=AntGenerateManager.getInstance();
    let GeneratedAnt=AntCheck.checkpool(this.AntGen)
    GeneratedAnt.getComponent(FighterAntScript).AddSpecs(antName,TimeToCoverChangeInY,spriteName,Health,Damage,CoinAlloted,Shield)
    console.log("gen",GeneratedAnt)
   // GeneratedAnt.setPosition(600,900)
    this.node.parent.parent.getChildByName("AddedAnt").addChild(GeneratedAnt)
   console.log(this.node.parent.parent)},2000);
  }
  start() {
  }

  update(deltaTime: number) {}
}
