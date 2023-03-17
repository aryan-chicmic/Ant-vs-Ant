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
  tween,
  Tween,
} from "cc";
const { ccclass, property } = _decorator;
// import { ANT_TYPES, PLAYER } from "./constants";

// import { singleton } from "./singleton";
import { PathSelectorButton } from "./PathSelectorButton";
import { coinUpdater } from "./coinUpdater";

import { PLAYER } from "../ClassScripts/constants";
import { singleton } from "../ClassScripts/singleton";
import { AntGenerateManager } from "../Gameplay/AntGenerateManager";
import { FighterAntScript } from "../Gameplay/FighterAntScript";

@ccclass("antTypeButton")
export class antTypeButton extends Component {
  //property
  @property({ type: Label })
  coinLabel: Label = null;
  @property({ type: Sprite })
  antSprite: Sprite = null;
  @property({ type: JsonAsset })
  AntInformation: JsonAsset = null;
  @property({ type: Prefab })
  PathSelectButton: Prefab = null;
  //AntGenerateNode
  @property({ type: Prefab })
  AntGen: Prefab = null;

  //Globalvariable

  flag: number = 1;
  GeneratedAnt: Node = null;

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
    let dataLoader: any = this.AntInformation.json;
    dataLoader = dataLoader.AntSpecs;
    for (let index = 0; index < dataLoader.length; index++) {
      if (index == i) {
        this.antSprite.getComponent(Sprite).spriteFrame =
          this.SingletonObj.getSpriteFrame(dataLoader[index].Sprite);
        this.coinLabel.string = dataLoader[index].CoinAlloted;
        newNode.name = dataLoader[index].AntName;
      }
    }
  }
  /**
   * Instantiate Path Decider Location Button At Different Path,
   * Path Selected from Map
   */
  antPathDeciderButton() {
    // console.log("path decide function call");

    let Map: TiledMap = singleton.Map;
    let n = Map.getComponent(TiledMap).getObjectGroups().length;
    for (var i = 1; i <= n - 2; i++) {
      let pathObj = Map.getComponent(TiledMap).getObjectGroup(`PathObj${i}`);
      if (this.AntPlayer == PLAYER.PLAYER1) {
        console.log(pathObj);
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

        var pos_oneA = this.SingletonObj.CanvasNode.getComponent(
          UITransform
        ).convertToNodeSpaceAR(new Vec3(worlPosOfBtn1.x, worlPosOfBtn1.y));
        var buttonclick = instantiate(this.PathSelectButton);
        buttonclick.setPosition(pos_oneA);
        buttonclick
          .getChildByName("Name")
          .getComponent(Label).string = `PathObj${i}`;
        this.SingletonObj.PathDeciderNode.addChild(buttonclick);
        buttonclick.getComponent(PathSelectorButton).pathSelected(this.node);
      }
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
        var pos_oneA = this.SingletonObj.CanvasNode.getComponent(
          UITransform
        ).convertToNodeSpaceAR(new Vec3(worlPosOfBtn2.x, worlPosOfBtn2.y));
        var buttonclick = instantiate(this.PathSelectButton);
        buttonclick.setPosition(pos_oneA);
        //buttonclick.angle = 180;
        this.SingletonObj.PathDeciderNode.addChild(buttonclick);
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
    // console.log("Callback From Location Button");
    this.PathSelected = customEventData;
    // console.log("user selected path", customEventData);

    this.antGenerationAfterPathDecided();
  };

  /**
   *
   * @description Ant Generated After Path of Ant Decided According to Player Side
   */
  antGenerationAfterPathDecided() {
    this.SingletonObj.PathDeciderNode.destroy();

    let antName;
    let TimeToCoverChangeInY;
    let spriteName;
    let Health;
    let Damage;
    let CoinAlloted;
    let Shield;
    let dataLoader: any = this.AntInformation.json;
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
        spriteName = this.SingletonObj.getSpriteFrame(dataLoader[index].Sprite);
      }
    }
    // setTimeout(() => {
    let AntCheck = AntGenerateManager.getInstance();
    this.GeneratedAnt = AntCheck.checkpool(this.AntGen);
    this.GeneratedAnt.getComponent(FighterAntScript).AddSpecs(
      antName,
      TimeToCoverChangeInY,
      spriteName,
      Health,
      Damage,
      CoinAlloted,
      Shield,
      this.AntPlayer
    );

    this.GeneratedAnt.getComponent(UITransform).setContentSize(125, 150);
    let Position = this.generatedAntPosition();
    this.GeneratedAnt.setPosition(Position);
    this.playerAntSide(this.AntPlayer, this.GeneratedAnt);

    // console.log("PARENT CHECK", this.node.parent.parent);

    var isSufficientCoins = this.SingletonObj.CoinHolder.getComponent(
      coinUpdater
    ).checkCoin(CoinAlloted, this.AntPlayer);
    console.log({ isSufficientCoins });

    if (this.AntPlayer == PLAYER.PLAYER1 && isSufficientCoins) {
      this.SingletonObj.AntsHolder_A.addChild(this.GeneratedAnt);
    }
    if (this.AntPlayer == PLAYER.PLAYER2 && isSufficientCoins) {
      this.SingletonObj.AntsHolder_B.addChild(this.GeneratedAnt);
    }

    if (isSufficientCoins) {
      this.SingletonObj.CoinHolder.getComponent(coinUpdater).coinDeduction(
        this.AntPlayer,
        CoinAlloted
      );
      this.GeneratedAnt.getComponent(FighterAntScript).antMovement(
        this.GeneratedAnt,
        this.PathSelected,
        this.AntPlayer
      );
    }

    console.log("Add Ant");
    // }, 100);
  }

  /**
   *
   * @description Functions Call when Ant Choosen Option Clicked
   */
  antGenerateButtonClicked(text) {
    this.text = text;

    if (this.SingletonObj.PathDeciderNode != null) {
      this.SingletonObj.PathDeciderNode.destroy();
    }
    var newNode = this.SingletonObj.PathDeciderNode;
    newNode = new Node("PathDeciderNode");
    this.SingletonObj.PathDeciderNode = newNode;
    this.SingletonObj.MapComponents.addChild(this.SingletonObj.PathDeciderNode);

    //PathDecideButtonPopUp
    setTimeout(() => {
      this.antPathDeciderButton();
    }, 100);
  }
  /**
   *@description Return the Ant Position , to Set position According to Player Side
   * @returns Vec3 Ant Position According to Player Side
   */
  generatedAntPosition(): Vec3 {
    var pathObjGroup = singleton.Map.getObjectGroup(
      `PathObj${this.PathSelected[7]}`
    );
    if (this.AntPlayer == PLAYER.PLAYER1) {
      var groupObj = pathObjGroup.getObject(`${this.PathSelected[7]}A`);
    } else if (this.AntPlayer == PLAYER.PLAYER2) {
      var groupObj = pathObjGroup.getObject(`${this.PathSelected[7]}B`);
    }
    let worlPosOfBtn2 = pathObjGroup.node
      .getComponent(UITransform)
      .convertToWorldSpaceAR(
        new Vec3(
          groupObj.x - pathObjGroup.node.getComponent(UITransform).width * 0.5,
          groupObj.y - pathObjGroup.node.getComponent(UITransform).height * 0.5,
          0
        )
      );
    var pos_oneA = this.SingletonObj.CanvasNode.getComponent(
      UITransform
    ).convertToNodeSpaceAR(new Vec3(worlPosOfBtn2.x, worlPosOfBtn2.y));
    return pos_oneA;
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
  /**
   * @description Checking for ant collision and its further coding
   */

  start() {}

  update(deltaTime: number) {}
}
