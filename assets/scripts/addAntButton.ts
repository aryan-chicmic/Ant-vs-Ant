//Map loading
//Hive Adder
// Ant choice button add
import {
  _decorator,
  Component,
  Node,
  Prefab,
  SpriteFrame,
  Label,
  director,
  TiledMap,
  TiledMapAsset,
  JsonAsset,
  resources,
  instantiate,
  Layout,
  LayoutComponent,
  Sprite,
  UITransform,
  Vec2,
  Vec3,
  game,
  Input,
} from "cc";
import { antTypeButton } from "./antTypeButton";
import { MAP_TYPES, PLAYER } from "./constants";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("addAntButton")
export class addAntButton extends Component {
  //properties
  @property({ type: Prefab })
  antButtonPrefab: Prefab = null;
  @property({ type: Prefab })
  coin1: Prefab = null;
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
  @property({ type: Node })
  menuButton: Node = null;
  @property({ type: JsonAsset })
  mapchooser: JsonAsset = null;

  //Singleton
  singletonObject: singleton;

  //globals
  coinclicker: number = 0;
  buttonHeight: number = 0;

  onLoad() {
    this.singletonObject = singleton.getInstance();
  }
  /**
   * @description Loading Map asset and Setting it up in Singleton Class for further use
   */
  mapAssetLoading() {
    this.Loader.active = false;
    this.menuButton.active = false;
    let dataLoader: any = this.mapchooser.json;
    dataLoader = dataLoader.data;
    var mapButtonnameReceived = this.singletonObject.mapButton;
    for (let index = 0; index < dataLoader.length; index++) {
      let mapLoader_name = dataLoader[index].name;
      if (mapLoader_name == mapButtonnameReceived) {
        resources.load(
          dataLoader[index].path,
          TiledMapAsset,
          (err: any, tmx) => {
            const asset = this.mapNode.getComponent(TiledMap);

            asset.tmxAsset = tmx;
            console.log("type of", typeof asset);

            singleton.Map = asset;
          }
        );
      }
    }
  }
  start() {
    this.mapAssetLoading();
    // Ant button Added
    this.buttonAdder();
    // related to map load thats why set time out used
    setTimeout(() => {
      this.hiveAdder();
    }, 100);

    // Coin Updating work
    var coin1 = instantiate(this.coin1);
    // coin.setPosition(0, 0);
    var coin2 = instantiate(this.coin2);
    coin2.setPosition(0, 180);
    this.node.addChild(coin1);
    this.node.addChild(coin2);
  }

  menuButtonFunctionality() {
    this.menuButton.active = true;
    console.log("before pause");
    // director.pause();
    director.pause();
  }

  /**
   * @description Adding Hive at  Map path after loading Map
   */
  hiveAdder() {
    var n = this.mapNode.getComponent(TiledMap).getObjectGroups().length;
    for (var i = 1; i < n; i++) {
      let pathObj = this.mapNode
        .getComponent(TiledMap)
        .getObjectGroup(`PathObj${i}`);
      var button_Obj = pathObj.getObject(`${i}A`);
      var button_Obj1 = pathObj.getObject(`${i}B`);

      let worlPosOfBtn1 = pathObj.node
        .getComponent(UITransform)
        .convertToWorldSpaceAR(
          new Vec3(
            button_Obj.x - pathObj.node.getComponent(UITransform).width * 0.5,
            button_Obj.y - pathObj.node.getComponent(UITransform).height * 0.5,
            0
          )
        );
      let worlPosOfBtn2 = pathObj.node
        .getComponent(UITransform)
        .convertToWorldSpaceAR(
          new Vec3(
            button_Obj1.x - pathObj.node.getComponent(UITransform).width * 0.5,
            button_Obj1.y - pathObj.node.getComponent(UITransform).height * 0.5,
            0
          )
        );
      var pos_oneA = this.node
        .getComponent(UITransform)
        .convertToNodeSpaceAR(new Vec3(worlPosOfBtn1.x, worlPosOfBtn1.y));

      var pos1_oneA = this.node
        .getComponent(UITransform)
        .convertToNodeSpaceAR(new Vec3(worlPosOfBtn2.x, worlPosOfBtn2.y));

      var buttonclick1 = instantiate(this.hive);
      var buttonclick2 = instantiate(this.hive);

      buttonclick1.setPosition(pos_oneA.x, pos_oneA.y, 0);

      buttonclick2.setPosition(pos1_oneA.x, pos1_oneA.y, 0);

      this.hiveNode.addChild(buttonclick1);
      this.hiveNode.addChild(buttonclick2);
    }
  }
  /**
   * @description Button Added for Choosing Ant Type
   */
  buttonAdder() {
    for (var i = 0; i < 6; i++) {
      var newButton = instantiate(this.antButtonPrefab);

      this.antNodeBottom.addChild(newButton);
      this.antNodeBottom.children[i]
        .getComponent(antTypeButton)
        .addSprites(newButton, i, PLAYER.PLAYER1);
    }

    for (var i = 0; i < 6; i++) {
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
