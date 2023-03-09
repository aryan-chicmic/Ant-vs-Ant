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
  singletonObject: singleton;

  //globals
  coinclicker: number = 0;
  buttonHeight: number = 0;

  onLoad() {
    this.singletonObject = singleton.getInstance();
  }

  start() {
    this.Loader.active = false;
    this.menuButton.active = false;
    let dataLoader: any = this.mapchooser.json;
    dataLoader = dataLoader.data;
    var mapButtonnameReceived = this.singletonObject.mapButton;
    for (let index = 0; index < dataLoader.length; index++) {
      let mapLoader_name = dataLoader[index].name;
      if (mapLoader_name == mapButtonnameReceived) {
        resources.load(dataLoader[index].path, TiledMapAsset, (err: any, tmx) => {
          const asset = this.mapNode.getComponent(TiledMap);
          console.log("true cond");
          console.log(tmx);
          asset.tmxAsset = tmx;
          console.log("type of", typeof asset);
          //setmaptosingleton
          singleton.Map = asset;
        });
        setTimeout(() => {
          this.hiveAdder();
          this.buttonAdder();
        }, 100);

        var coin1 = instantiate(this.coin1);
        // coin.setPosition(0, 0);
        var coin2 = instantiate(this.coin2);
        coin2.setPosition(0, 180);
        this.node.addChild(coin1);
        this.node.addChild(coin2);
      }
    }
  }
  hiveAdder() {
    console.log("hivemaker");
    // console.log();

    var n = this.mapNode.getComponent(TiledMap).getObjectGroups().length;
    console.log(n);
    for (var i = 1; i < n; i++) {
      let pathObj = this.mapNode.getComponent(TiledMap).getObjectGroup(`PathObj${i}`);
      var button_Obj = pathObj.getObject(`${i}A`);
      var button_Obj1 = pathObj.getObject(`${i}B`);

      let worlPosOfBtn1 = pathObj.node
        .getComponent(UITransform)
        .convertToWorldSpaceAR(
          new Vec3(
            button_Obj.x - pathObj.node.getContentSize().width * 0.5,
            button_Obj.y - pathObj.node.getContentSize().height * 0.5,
            0
          )
        );
      let worlPosOfBtn2 = pathObj.node
        .getComponent(UITransform)
        .convertToWorldSpaceAR(
          new Vec3(
            button_Obj1.x - pathObj.node.getContentSize().width * 0.5,
            button_Obj1.y - pathObj.node.getContentSize().height * 0.5,
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
      console.log("Hive node-", this.hiveNode);
      this.hiveNode.addChild(buttonclick1);
      this.hiveNode.addChild(buttonclick2);
    }
    console.log("is hive added", this.node);
  }
  menuButtonFunctionality() {
    this.menuButton.active = true;
    console.log("before pause");
    // director.pause();
    director.pause();
  }

  buttonAdder() {
    for (var i = 0; i < 6; i++) {
      var newButton = instantiate(this.antButtonPrefab);
      // this.buttonHeight = newButton.getComponent(UITransform).height;
      this.antNodeBottom.addChild(newButton);
      this.antNodeBottom.children[i]
        .getComponent(antTypeButton)
        .addSprites(newButton, i, PLAYER.PLAYER1);
    }
    // this.buttonHeight = newButton.getComponent(UITransform).getBoundingBox().y;
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
