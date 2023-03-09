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
  Vec3,
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
  @property({ type: Prefab })
  PathSelectButton: Prefab = null;
  //AntGenerateNode
  @property({ type: Prefab })
  AntGen = null;
  @property({ type: Node })
  AddedAnt = null;
  @property({ type: Prefab })
  PathDeciderParent: Prefab = null;
  //which player
  AntPlayer: PLAYER = PLAYER.NONE;
  //singletonObject
  SingletonObj: singleton = null;
  Map: TiledMap = null;

  onLoad() {
    this.SingletonObj = singleton.getInstance();
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
  antPathDeciderButton() {
    console.log("path decide function call");

    let Map: TiledMap = singleton.Map;
    let n = Map.getComponent(TiledMap).getObjectGroups().length;
    if (this.AntPlayer == PLAYER.PLAYER1) {
      for (var i = 1; i < n; i++) {
        var button_pos_X = Map.getComponent(TiledMap)
          .getObjectGroup(`PathObj${i}`)
          .getObject(`Button${i}A`).x;
        var button_pos_Y = Map.getComponent(TiledMap)
          .getObjectGroup(`PathObj${i}`)
          .getObject(`Button${i}A`).y;
        var pos_oneA = this.node.parent.parent
          .getComponent(UITransform)
          .convertToNodeSpaceAR(new Vec3(button_pos_X, button_pos_Y));
        var buttonclick = instantiate(this.PathSelectButton);
        buttonclick
          .getChildByName("Name")
          .getComponent(Label).string = `Button${i}A`;
        buttonclick.setPosition(pos_oneA);
        //this.node.parent.parent.addChild(buttonclick);
        this.node.parent.parent
          .getChildByName("PathDeciderParent")
          .addChild(buttonclick);
      }
      console.log("this figthernode p1", this.node.parent.parent);
    }
    if (this.AntPlayer == PLAYER.PLAYER2) {
      for (var i = 1; i < n; i++) {
        var button_pos_X = Map.getComponent(TiledMap)
          .getObjectGroup(`PathObj${i}`)
          .getObject(`Button${i}B`).x;
        var button_pos_Y = Map.getComponent(TiledMap)
          .getObjectGroup(`PathObj${i}`)
          .getObject(`Button${i}B`).y;
        var pos_oneA = this.node.parent.parent
          .getComponent(UITransform)
          .convertToNodeSpaceAR(new Vec3(button_pos_X, button_pos_Y));
        var buttonclick = instantiate(this.PathSelectButton);
        buttonclick.setPosition(pos_oneA);
        buttonclick.angle = 180;
        this.node.parent.parent
          .getChildByName("PathDeciderParent")
          .addChild(buttonclick);
        buttonclick
          .getChildByName("Name")
          .getComponent(Label).string = `Button${i}B`;
      }
      console.log("this figthernode p2", this.node.parent.parent);
    }
  }
  antGenerateButtonClicked(text) {
    if (this.node.parent.parent.getChildByName("PathDeciderParent") != null) {
      this.node.parent.parent.getChildByName("PathDeciderParent").destroy();
    }
    let PathDeciderButtonParent = instantiate(this.PathDeciderParent);
    this.node.parent.parent.addChild(PathDeciderButtonParent);
    //PathDecideButtonPopUp
    setTimeout(() => {
      this.antPathDeciderButton();
    }, 100);

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
            spriteName = tmx;
          }
        );
      }
    }

    // set timout k reason taki image load ho sake phir function call ho
    setTimeout(() => {
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

      GeneratedAnt.getComponent(UITransform).setContentSize(125, 150);
      this.playerAntSide(this.AntPlayer, GeneratedAnt);
      this.node.parent.parent.getChildByName("AddedAnt").addChild(GeneratedAnt);
    }, 1000);
  }
  playerAntSide(Player: PLAYER, GeneratedAnt: Node) {
    if (this.AntPlayer == PLAYER.PLAYER2) {
      GeneratedAnt.angle = 180;
      GeneratedAnt.setPosition(300, 900);
    }
  }
  start() {}

  update(deltaTime: number) {}
}
