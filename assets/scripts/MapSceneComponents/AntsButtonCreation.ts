import {
  _decorator,
  Component,
  Node,
  instantiate,
  JsonAsset,
  Prefab,
  TiledMap,
  UITransform,
  Vec3,
} from "cc";
import AudioControllerObject from "../ClassScripts/AudioController";
import { AudioSourceManager } from "../ClassScripts/AudioSourceManager";
import { PLAYER } from "../ClassScripts/constants";
import { singleton } from "../ClassScripts/singleton";
import { antTypeButton } from "./antTypeButton";
import { HiveScript } from "./HiveScript";
const { ccclass, property } = _decorator;

@ccclass("AntsButtonCreation")
export class AntsButtonCreation extends Component {
  //properties
  @property({ type: Prefab })
  antButtonPrefab: Prefab = null;
  @property({ type: Prefab })
  coin1: Prefab = null;
  @property({ type: Node })
  coinHolder: Node = null;
  @property({ type: Prefab })
  hive: Prefab = null;
  @property({ type: Prefab })
  coin2: Prefab = null;
  @property({ type: Node })
  antNodeBottom: Node = null;
  @property({ type: Node })
  Loader: Node = null;
  @property({ type: Node })
  antNodeTop: Node = null;
  @property(Node)
  hiveNode: Node = null;
  @property({ type: Node })
  mapNode: Node = null;
  @property({ type: JsonAsset })
  mapchooser: JsonAsset = null;
  @property({ type: Node })
  PathDeciderNode: Node = null;

  @property({ type: Node })
  mapComponents: Node = null;
  @property({ type: Node })
  canvas: Node = null;
  @property({ type: Node })
  antsHolder_A: Node = null;
  @property({ type: Node })
  antsHolder_B: Node = null;
  @property({ type: Node })
  audiosource = null;
  @property({ type: Node })
  hiveHolder_A: Node = null;
  @property({ type: Node })
  hiveHolder_B: Node = null;
  //singletonObject
  singletonObject: singleton;

  //globals
  TotalAntButtons: Number = 6;

  backgroundMusicEffect(ClipName: string) {
    let audio = this.singletonObject.getAudioFile(ClipName);
    AudioControllerObject.playMusic(audio);
  }
  onLoad() {
    this.singletonObject = singleton.getInstance();
    this.singletonObject.PathDeciderNode = this.PathDeciderNode;
    this.singletonObject.AntsHolder_A = this.antsHolder_A;
    this.singletonObject.AntsHolder_B = this.antsHolder_B;
    this.singletonObject.CanvasNode = this.canvas;
    this.singletonObject.MapComponents = this.mapComponents;
    this.singletonObject.HiveHolder_A = this.hiveHolder_A;
    this.singletonObject.HiveHolder_B = this.hiveHolder_B;
    this.singletonObject.CoinHolder = this.coinHolder;
    this.audiosource.getComponent(AudioSourceManager).initAudioSource();
    this.backgroundMusicEffect("gameplaySound");
  }

  start() {
    //LOADING MAP

    this.Loader.active = false;
    let dataLoader: any = this.mapchooser.json;
    dataLoader = dataLoader.data;
    var mapButtonnameReceived = this.singletonObject.mapButton;
    for (let index = 0; index < dataLoader.length; index++) {
      let mapLoader_name = dataLoader[index].name;

      if (mapLoader_name == mapButtonnameReceived) {
        this.mapNode.getComponent(TiledMap).tmxAsset =
          this.singletonObject.getMapAsset(dataLoader[index].name);
        // console.log("map loader name", mapLoader_name);
        // console.log("map loader name", mapButtonnameReceived);
        singleton.Map = this.mapNode.getComponent(TiledMap);
        this.totalHives();
        this.buttonAdder();
        var coin1 = instantiate(this.coin1);
        this.coinHolder.addChild(coin1);
        var coin2 = instantiate(this.coin2);
        this.coinHolder.addChild(coin2);
        // console.log("Coin updater added");
      }
    }
  }

  /**
   * @description Checking total number of hives to be added
   */
  totalHives() {
    var n = this.mapNode
      .getComponent(TiledMap)
      .getObjectGroup("HivesLayer")
      .getObjects().length;
    console.log(n);
    for (var i = 1; i <= n / 2; i++) {
      let pathObj = this.mapNode
        .getComponent(TiledMap)
        .getObjectGroup("HivesLayer");
      var pathforhive_Obj = pathObj.getObject(`hive${i}A`);
      var pathforhive_Obj1 = pathObj.getObject(`hive${i}B`);
      this.hivePositionSetter(pathObj, pathforhive_Obj, "A");
      this.hivePositionSetter(pathObj, pathforhive_Obj1, "B");
    }
  }
  /**
   *  @description Setting Hives to their positions
   * @param pathObj
   * @param pathforhive_Obj
   * @param Side
   */
  hivePositionSetter(pathObj, pathforhive_Obj, Side) {
    let worlPosOfBtn1 = pathObj.node
      .getComponent(UITransform)
      .convertToWorldSpaceAR(
        new Vec3(
          pathforhive_Obj.x - pathObj.node.getContentSize().width * 0.5,
          pathforhive_Obj.y - pathObj.node.getContentSize().height * 0.5,
          0
        )
      );
    var pos_oneA = this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(new Vec3(worlPosOfBtn1.x, worlPosOfBtn1.y));

    var hiveinstanstiater = instantiate(this.hive);

    hiveinstanstiater.getComponent(HiveScript).addSpecs(500, 10, 10);

    hiveinstanstiater.setPosition(pos_oneA.x, pos_oneA.y, 0);
    if (Side == "A") {
      this.hiveHolder_A.addChild(hiveinstanstiater);
    } else if (Side == "B") {
      this.hiveHolder_B.addChild(hiveinstanstiater);
    }
  }

  /**
   * @description Button Added for Choosing Ant Type
   */
  buttonAdder() {
    for (var i = 0; i < this.TotalAntButtons; i++) {
      var newButton = instantiate(this.antButtonPrefab);

      this.antNodeBottom.addChild(newButton);
      this.antNodeBottom.children[i]
        .getComponent(antTypeButton)
        .addSprites(newButton, i, PLAYER.PLAYER1);
    }

    for (var i = 0; i < this.TotalAntButtons; i++) {
      var newButton = instantiate(this.antButtonPrefab);

      newButton.angle = 180;

      this.antNodeTop.addChild(newButton);
      this.antNodeTop.children[i]
        .getComponent(antTypeButton)
        .addSprites(newButton, i, PLAYER.PLAYER2);
    }
  }

  update(deltaTime: number) {}
}
