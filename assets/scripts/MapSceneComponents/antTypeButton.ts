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
  GeneratedAnt: Node = null;
  AntPlayer: PLAYER = PLAYER.NONE;
  SingletonObj: singleton = null;
  Map: TiledMap = null;
  AntAlldetails = null;
  PathSelected: string = null;

  onLoad() {
    this.SingletonObj = singleton.getInstance();
  }

  /**
   * @description Adding Script on Add Choose Button
   * @param newNode: Node
   * @param antbuttoncount :number
   * @param Player : PLAYER which player
   */
  addSprites(newNode: Node, antbuttoncount: Number, Player: PLAYER) {
    this.AntPlayer = Player;
    let dataLoader: any = this.AntInformation.json;
    dataLoader = dataLoader.AntSpecs;
    for (let index = 0; index < dataLoader.length; index++) {
      if (index == antbuttoncount) {
        this.antSprite.getComponent(Sprite).spriteFrame =
          this.SingletonObj.getSpriteFrame(dataLoader[index].Sprite);
        this.coinLabel.string = dataLoader[index].CoinAlloted;
        newNode.name = dataLoader[index].AntName;
      }
    }
  }
  /**
   * tells which player Side Path Decider Button pop up
   */
  playerPathButton() {
    if (this.AntPlayer == PLAYER.PLAYER1) {
      this.antPathDeciderButton(this.AntPlayer, "A");
    } else if (this.AntPlayer == PLAYER.PLAYER2)
      this.antPathDeciderButton(this.AntPlayer, "B");
  }
  /**
   * Instantiate Path Decider Location Button At Different Path,
   * Path Selected from Map
   */
  antPathDeciderButton(player: PLAYER, side: string) {
    let Map: TiledMap = singleton.Map;
    let numberofobject = Map.getComponent(TiledMap).getObjectGroups().length;
    for (
      var objectcount = 1;
      objectcount <= numberofobject - 2;
      objectcount++
    ) {
      let pathObj = Map.getComponent(TiledMap).getObjectGroup(
        `PathObj${objectcount}`
      );
      var button_pos = pathObj.getObject(`Button${objectcount}${side}`);
      let worlPosOfBtn = pathObj.node
        .getComponent(UITransform)
        .convertToWorldSpaceAR(
          new Vec3(
            button_pos.x - pathObj.node.getComponent(UITransform).width * 0.5,
            button_pos.y - pathObj.node.getComponent(UITransform).height * 0.5,
            0
          )
        );

      var positiontoCan = this.SingletonObj.CanvasNode.getComponent(
        UITransform
      ).convertToNodeSpaceAR(new Vec3(worlPosOfBtn.x, worlPosOfBtn.y));
      var buttonclick = instantiate(this.PathSelectButton);
      buttonclick.setPosition(positiontoCan);
      buttonclick
        .getChildByName("Name")
        .getComponent(Label).string = `PathObj${objectcount}`;
      if (player == PLAYER.PLAYER1) {
        this.SingletonObj.PathDeciderNodeA.addChild(buttonclick);
      } else if (player == PLAYER.PLAYER2) {
        this.SingletonObj.PathDeciderNodeB.addChild(buttonclick);
      }

      buttonclick.getComponent(PathSelectorButton).pathSelected(this.node);
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
    if (this.AntPlayer == PLAYER.PLAYER1) {
      this.SingletonObj.PathDeciderNodeA.destroy();
    } else if (this.AntPlayer == PLAYER.PLAYER2) {
      this.SingletonObj.PathDeciderNodeB.destroy();
    }

    let antName;
    let TimeToCoverChangeInY;
    let spriteName;
    let Health;
    let Damage;
    let CoinAlloted;
    let Shield;
    let dataLoader: any = this.AntInformation.json;
    dataLoader = dataLoader.AntSpecs;
    let Name = this.AntAlldetails.target._name;
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

    var isSufficientCoins = this.SingletonObj.CoinHolder.getComponent(
      coinUpdater
    ).checkCoin(CoinAlloted, this.AntPlayer);

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
        this.PathSelected,
        this.AntPlayer
      );
    }
  }

  /**
   *
   * @description Functions Call when Ant Choosen Option Clicked
   */
  antGenerateButtonClicked(AntDetails) {
    this.AntAlldetails = AntDetails;

    if (
      this.AntPlayer == PLAYER.PLAYER1 &&
      this.SingletonObj.PathDeciderNodeA != null
    ) {
      this.SingletonObj.PathDeciderNodeA.destroy();
      var newNode = this.SingletonObj.PathDeciderNodeA;
      newNode = new Node("PathDeciderNodeA");
      this.SingletonObj.PathDeciderNodeA = newNode;
      this.SingletonObj.MapComponents.addChild(
        this.SingletonObj.PathDeciderNodeA
      );
    } else if (
      this.AntPlayer == PLAYER.PLAYER2 &&
      this.SingletonObj.PathDeciderNodeB != null
    ) {
      this.SingletonObj.PathDeciderNodeB.destroy();
      var newNode1 = this.SingletonObj.PathDeciderNodeB;
      newNode1 = new Node("PathDeciderNodeB");
      this.SingletonObj.PathDeciderNodeB = newNode1;
      this.SingletonObj.MapComponents.addChild(
        this.SingletonObj.PathDeciderNodeB
      );
    }

    setTimeout(() => {
      this.playerPathButton();
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
    let worlPosOfBtn = pathObjGroup.node
      .getComponent(UITransform)
      .convertToWorldSpaceAR(
        new Vec3(
          groupObj.x - pathObjGroup.node.getComponent(UITransform).width * 0.5,
          groupObj.y - pathObjGroup.node.getComponent(UITransform).height * 0.5,
          0
        )
      );
    var positiontoCanvas = this.SingletonObj.CanvasNode.getComponent(
      UITransform
    ).convertToNodeSpaceAR(new Vec3(worlPosOfBtn.x, worlPosOfBtn.y));
    return positiontoCanvas;
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
