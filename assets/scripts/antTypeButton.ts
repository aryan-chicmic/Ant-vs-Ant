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
  AntGen: Prefab = null;

  //Globalvariable
  checker: number = 0;
  flag: number = 1;
  GeneratedAnt: Node = null;
  //variable
  //which player
  AntPlayer: PLAYER = PLAYER.NONE;

  AntTween: Tween<Node>;
  //singletonObject
  SingletonObj: singleton = null;
  Map: TiledMap = null;
  text = null;
  PathSelected: string = null;
  returnedNodes: Node[] = null;
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
    // console.log("path decide function call");

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

        var pos_oneA = singleton.canvasNode
          .getComponent(UITransform)
          .convertToNodeSpaceAR(new Vec3(worlPosOfBtn1.x, worlPosOfBtn1.y));
        var buttonclick = instantiate(this.PathSelectButton);
        buttonclick.setPosition(pos_oneA);
        buttonclick
          .getChildByName("Name")
          .getComponent(Label).string = `PathObj${i}`;
        singleton.PathDeciderNode.addChild(buttonclick);
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
        var pos_oneA = singleton.canvasNode
          .getComponent(UITransform)
          .convertToNodeSpaceAR(new Vec3(worlPosOfBtn2.x, worlPosOfBtn2.y));
        var buttonclick = instantiate(this.PathSelectButton);
        buttonclick.setPosition(pos_oneA);
        buttonclick.angle = 180;
        singleton.PathDeciderNode.addChild(buttonclick);
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
    singleton.PathDeciderNode.destroy();
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
      // singleton.antsHolder.addChild(this.GeneratedAnt);
      if (this.AntPlayer == PLAYER.PLAYER1) {
        singleton.antsHolder_A.addChild(this.GeneratedAnt);
      } else if (this.AntPlayer == PLAYER.PLAYER2) {
        singleton.antsHolder_B.addChild(this.GeneratedAnt);
      }
    }, 100);

    setTimeout(() => {
      this.antMovement();
    }, 200);
    this.checker = 1;
    // console.log("THIS PATH WAS SELECTED", this.PathSelected);
  }
  /**
   * @description Adding Ant movement
   */
  antMovement() {
    var pathObjGroup = singleton.Map.getObjectGroup(this.PathSelected);
    var pathObjects = pathObjGroup.getObjects();
    let Object = pathObjects.filter((objectname) => {
      // object name With ButtonA(PathNumber) and ButtonB(PathNumber) not included
      let ButtonNameA = "Button" + this.PathSelected[7] + "A";
      let ButtonNameB = "Button" + this.PathSelected[7] + "B";
      // console.log("button name", ButtonNameA, ButtonNameB);
      return objectname.name != ButtonNameA && objectname.name != ButtonNameB;
    });
    let positionArray = [];
    // console.log("PATHOBJECTS", Object);

    for (let element = 0; element < Object.length; element++) {
      // console.log("start", Object[element].x);
      let worldpost = pathObjGroup.node
        .getComponent(UITransform)
        .convertToWorldSpaceAR(
          new Vec3(
            Object[element].x -
              pathObjGroup.node.getComponent(UITransform).width * 0.5,
            Object[element].y -
              pathObjGroup.node.getComponent(UITransform).height * 0.5,
            0
          )
        );
      var pos_one = singleton.canvasNode
        .getComponent(UITransform)
        .convertToNodeSpaceAR(new Vec3(worldpost));
      let TurnPositionAndAngle = {
        POSITION: pos_one,
        TurnAngle: Object[element].Rotation,
      };
      positionArray.push(TurnPositionAndAngle);
    }

    this.AntTween = tween(this.GeneratedAnt);
    console.log("Length of Array", positionArray);
    if (this.AntPlayer == PLAYER.PLAYER1) {
      this.antTweenMovement(positionArray);
    } else if (this.AntPlayer == PLAYER.PLAYER2) {
      positionArray.reverse();
      this.antTweenMovement(positionArray);
    }
    this.AntTween.start();
  }
  /**
   * @description Apply tween to every position of  Ant for movement
   * @param positionArray Array of Path Positions from which Ant Passes
   */
  antTweenMovement(positionArray) {
    let Old_Position = positionArray.pop().POSITION;
    for (let i = positionArray.length - 1; i >= 0; i--) {
      let NewPosition = positionArray[i].POSITION;
      let TotalDistance = this.distanceBetweenPosition(
        Old_Position,
        NewPosition
      );

      let Time =
        TotalDistance /
        this.GeneratedAnt.getComponent(FighterAntScript).TimeToCoverChangeInY;
      console.log("Distance-----", TotalDistance, "Time-----", Time);
      this.AntTween.to(Time, {
        position: new Vec3(NewPosition),
      }).call(() => {
        if (this.AntPlayer == PLAYER.PLAYER2) {
          this.GeneratedAnt.angle =
            this.GeneratedAnt.angle + positionArray[i].TurnAngle;
        } else if (this.AntPlayer == PLAYER.PLAYER1) {
          this.GeneratedAnt.angle =
            this.GeneratedAnt.angle - positionArray[i].TurnAngle;
        }
      });

      Old_Position = NewPosition;
    }
  }
  /**
   * @description distance between old and new position
   * @param Old_Position Vec3 old position of Ant
   * @param newPosition  Vec3 new Position of Ant
   * @returns Number distance between old and new position
   */
  distanceBetweenPosition(Old_Position: Vec3, newPosition: Vec3): number {
    let Xaxis = Math.pow(Old_Position.x - newPosition.x, 2);
    let Yaxis = Math.pow(Old_Position.y - newPosition.y, 2);
    let distance = Math.sqrt(Xaxis + Yaxis);
    return distance;
  }
  /**
   *
   * @description Functions Call when Ant Choosen Option Clicked
   */
  antGenerateButtonClicked(text) {
    this.text = text;

    if (singleton.PathDeciderNode != null) {
      singleton.PathDeciderNode.destroy();
    }
    singleton.PathDeciderNode = new Node("PathDeciderNode");
    singleton.mapComponents.addChild(singleton.PathDeciderNode);

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
    var pos_oneA = singleton.canvasNode
      .getComponent(UITransform)
      .convertToNodeSpaceAR(new Vec3(worlPosOfBtn2.x, worlPosOfBtn2.y));
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
  antCollision(): any {
    let generatedAntRect,
      otherAntsRect,
      // otherAntHealth,
      child1obj = null,
      child2obj = null;
    var IDs = new Array();

    singleton.antsHolder_A.children.forEach((child1) => {
      if (child1.name == "FighterAnt") {
        singleton.antsHolder_B.children.forEach((child2) => {
          generatedAntRect = child1
            .getComponent(UITransform)
            .getBoundingBoxToWorld();
          // let generatedAntHealth = child1.getComponent(FighterAntScript).getHealth();
          if (child2.name == "FighterAnt") {
            otherAntsRect = child2
              .getComponent(UITransform)
              .getBoundingBoxToWorld();
            // otherAntHealth = child2.getComponent(FighterAntScript).getHealth();
          }
          if (generatedAntRect.intersects(otherAntsRect)) {
            console.log("COLLIDED");

            this.AntTween.stop();

            console.log("CHILD1,CHILD2", child1, child2);
            this.checker = 0;

            IDs[0] = child1;
            IDs[1] = child2;
          }
        });
      }
    });
    return IDs;
  }
  health(returnedNodes) {
    console.log("IN HEALTH FUNCTION");

    var returnNode_0 = returnedNodes[0]
      .getComponent(FighterAntScript)
      .getHealth();
    var returnNode_1 = returnedNodes[1]
      .getComponent(FighterAntScript)
      .getHealth();
    if (returnNode_0 == 0 || returnNode_1 == 0) return;
    else {
      returnNode_0 -=
        returnedNodes[1].getComponent(FighterAntScript).Damage +
        returnedNodes[0].getComponent(FighterAntScript).Shield;
      returnNode_1 -=
        returnedNodes[0].getComponent(FighterAntScript).Damage +
        returnedNodes[1].getComponent(FighterAntScript).Shield;

      console.log("HEALTH OF BOTH", returnNode_0, returnNode_1);
    }
  }
  start() {}

  update(deltaTime: number) {
    if (this.checker == 1) {
      if (
        singleton.antsHolder_A.children.length &&
        singleton.antsHolder_B.children.length
      ) {
        this.returnedNodes = this.antCollision();
        console.log(this.returnedNodes);

        if (this.returnedNodes.length) {
          console.log("IN UPDATE", this.returnedNodes);

          this.health(this.returnedNodes);
        }

        console.log("Checker");
        // this.checker = 0;
      }
    }
  }
}
