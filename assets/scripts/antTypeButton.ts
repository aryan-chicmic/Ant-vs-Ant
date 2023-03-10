//Add Sprite to Ant button
//Ant Path Location

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
  Button,
} from "cc";
const { ccclass, property } = _decorator;
import { ANT_TYPES, PLAYER } from "./constants";
import { AntGenerateManager } from "./AntGenerateManager";
import { FighterAntScript } from "./FighterAntScript";
import { singleton } from "./singleton";
import { PathSelectorButton } from "./PathSelectorButton";
@ccclass("antTypeButton")
export class antTypeButton extends Component {
  //property
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
  @property({ type: Prefab })
  PathDeciderParent: Prefab = null;

  //variable
  //which player
  AntPlayer: PLAYER = PLAYER.NONE;
  //singletonObject
  SingletonObj: singleton = null;
  Map: TiledMap = null;
  text = null;
  PathSelected: string = null;
  onLoad() {
    this.SingletonObj = singleton.getInstance();
  }
  /**
   * @description Adding Script on Add Choose Button
   * @param newNode
   * @param i
   * @param Player which player
   */
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
  /**
   * Instantiate Path Decider Location Button At Different Path,
   * Path Selected from Map
   */
  antPathDeciderButton() {
    console.log("path decide function call");

    let Map: TiledMap = singleton.Map;
    let n = Map.getComponent(TiledMap).getObjectGroups().length;
    for (var i = 1; i < n; i++) {
      let pathObj = Map.getComponent(TiledMap).getObjectGroup(`PathObj${i}`);
      if (this.AntPlayer == PLAYER.PLAYER1) {
        var button_pos_down = pathObj.getObject(`Button${i}A`);
        let worlPosOfBtn1 = pathObj.node
          .getComponent(UITransform)
          .convertToWorldSpaceAR(
            new Vec3(
              button_pos_down.x -
                pathObj.node.getComponent(UITransform).width * 0.5,
              button_pos_down.y -
                pathObj.node.getComponent(UITransform).height * 0.5,
              0
            )
          );

        var pos_oneA = this.node.parent.parent
          .getComponent(UITransform)
          .convertToNodeSpaceAR(new Vec3(worlPosOfBtn1.x, worlPosOfBtn1.y));
        var buttonclick = instantiate(this.PathSelectButton);
        buttonclick
          .getChildByName("Name")
          .getComponent(Label).string = `PathObj${i}`;
        console.log("location pos", this.node.parent.parent);
        buttonclick.setPosition(pos_oneA);
        //this.node.parent.parent.addChild(buttonclick);
        this.node.parent.parent
          .getChildByName("PathDeciderParent")
          .addChild(buttonclick);
        buttonclick.getComponent(PathSelectorButton).pathSelected(this.node);
      }
      // console.log("this figthernode p1", this.node.parent.parent);

      if (this.AntPlayer == PLAYER.PLAYER2) {
        var button_pos_top = pathObj.getObject(`Button${i}B`);
        let worlPosOfBtn2 = pathObj.node
          .getComponent(UITransform)
          .convertToWorldSpaceAR(
            new Vec3(
              button_pos_top.x -
                pathObj.node.getComponent(UITransform).width * 0.5,
              button_pos_top.y -
                pathObj.node.getComponent(UITransform).height * 0.5,
              0
            )
          );
        var pos_oneA = this.node.parent.parent
          .getComponent(UITransform)
          .convertToNodeSpaceAR(new Vec3(worlPosOfBtn2.x, worlPosOfBtn2.y));
        var buttonclick = instantiate(this.PathSelectButton);
        buttonclick.setPosition(pos_oneA);
        buttonclick.angle = 180;
        this.node.parent.parent
          .getChildByName("PathDeciderParent")
          .addChild(buttonclick);
        buttonclick
          .getChildByName("Name")
          .getComponent(Label).string = `PathObj${i}`;
        buttonclick.getComponent(PathSelectorButton).pathSelected(this.node);
      }
    }
  }

  /**
   * @description Callback come from Path Location Decider Button Selected
   * @param event
   * @param customEventData Carries Path Name of Path Location Button
   */
  selectedPathByPlayer = (event: Event, customEventData: string) => {
    console.log("Callback From Location Button");
    this.PathSelected = customEventData;
    console.log("user selected path", customEventData);
    this.antGenerationAfterPathDecided();
  };

  /**
   *
   * @description Ant Generated After Path of Ant Decided According to Player Side
   */
  antGenerationAfterPathDecided() {
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
    let Name = this.text.target._name;
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
      let Position = this.generatedAntPosition();
      GeneratedAnt.setPosition(Position);
      this.playerAntSide(this.AntPlayer, GeneratedAnt);
      this.node.parent.parent.getChildByName("AddedAnt").addChild(GeneratedAnt);
    }, 100);
  }

  /**
   *  Function call When Ant choose button Clicked
   * @description Generate Option to Select Different Path
   * @param text Tells which Ant Button node Clicked
   */
  antGenerateButtonClicked(text) {
    this.text = text;
    if (this.node.parent.parent.getChildByName("PathDeciderParent") != null) {
      this.node.parent.parent.getChildByName("PathDeciderParent").destroy();
    }
    let PathDeciderButtonParent = instantiate(this.PathDeciderParent);
    this.node.parent.parent.addChild(PathDeciderButtonParent);
    //PathDecideButtonPopUp
    setTimeout(() => {
      this.antPathDeciderButton();
    }, 100);
  }
  /**
   *@description Return the Position to Set According to Player Side
   * @returns Vec3 Ant Position According to Player Side
   */
  generatedAntPosition(): Vec3 {
    let side: string;
    if (this.AntPlayer == PLAYER.PLAYER1) {
      side = "A";
    } else if (this.AntPlayer == PLAYER.PLAYER2) {
      side = "B";
    }
    let Map: TiledMap = singleton.Map;
    let pathObj = Map.getComponent(TiledMap).getObjectGroup(this.PathSelected);
    console.log("path123", pathObj);
    let object = this.PathSelected[7] + side;
    console.log(object);
    var button_pos_top = pathObj.getObject(object);
    let worlPos = pathObj.node
      .getComponent(UITransform)
      .convertToWorldSpaceAR(
        new Vec3(
          button_pos_top.x - pathObj.node.getComponent(UITransform).width * 0.5,
          button_pos_top.y - pathObj.node.getComponent(UITransform).width * 0.5,
          0
        )
      );
    var pos_one = this.node.parent.parent
      .getComponent(UITransform)
      .convertToNodeSpaceAR(new Vec3(worlPos.x, worlPos.y));
    console.log("path position", this.node.parent.parent);
    return pos_one;
  }
  /**
   * @description if player 2 rotate ant face
   * @param Player Which Player
   * @param GeneratedAnt Ant Node
   */
  playerAntSide(Player: PLAYER, GeneratedAnt: Node) {
    if (this.AntPlayer == PLAYER.PLAYER2) {
      GeneratedAnt.angle = 180;
    }
  }
  start() {}

  update(deltaTime: number) {}
}
