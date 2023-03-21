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
import { MAP_TYPES } from "./constants";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("addAntButton")
export class addAntButton extends Component {
  buttonHeight: number = 0;
  @property({ type: Prefab })
  antButtonPrefab: Prefab = null;
  @property({ type: Node })
  antNodeBottom: Node = null;
  @property({ type: Node })
  antNodeTop: Node = null;
  @property(Node)
  hiveNode: Node = null;
  @property({ type: Node })
  mapNode: Node = null;
  @property({ type: Prefab })
  hive: Prefab = null;
  @property({ type: JsonAsset })
  mapchooser: JsonAsset = null;
  singletonObject: singleton;
  @property({ type: Node })
  menuButton: Node = null;
  onLoad() {
    this.antNodeBottom.on(
      Input.EventType.TOUCH_START,
      () => {
        console.log("hellooooo");
      },
      this
    );

    this.singletonObject = singleton.getInstance();
  }

  start() {
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
          }
        );

        setTimeout(() => {
          this.buttonAdder();
          this.hiveAdder();
        }, 1000);
      }
    }
  }
  menuButtonFunctionality() {
    this.menuButton.active = true;
    console.log("before pause");
    // director.pause();
    director.pause();
    setTimeout(() => {
      console.log("Resumed");

      director.resume();
    }, 5000);
    console.log("after pause");
  }
  hiveAdder() {
    for (var i = 1; i <= 3; i++) {
      var newHive1 = instantiate(this.hive);
      var newHive2 = instantiate(this.hive);

      switch (i) {
        case 1:
          var oneA_x = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj1")
            .getObject("OneA").x;
          var oneA_y = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj1")
            .getObject("OneA").y;
          var oneB_x = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj1")
            .getObject("OneB").x;
          var oneB_y = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj1")
            .getObject("OneB").y;
          var pos_oneA = this.node
            .getComponent(UITransform)
            .convertToNodeSpaceAR(new Vec3(oneA_x, oneA_y));
          var pos_oneB = this.node
            .getComponent(UITransform)
            .convertToNodeSpaceAR(new Vec3(oneB_x, oneB_y));
          newHive1.setPosition(pos_oneA.x + 5, pos_oneA.y + 225);
          newHive2.setPosition(pos_oneB.x + 10, pos_oneB.y - 225); //up
          newHive1.angle = 180;
          this.hiveNode.addChild(newHive1);

          this.hiveNode.addChild(newHive2);

          break;
        case 2:
          var TwoA_x = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj2")
            .getObject("TwoA").x;
          var TwoA_y = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj2")
            .getObject("TwoA").y;
          var TwoB_x = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj2")
            .getObject("TwoB").x;
          var TwoB_y = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj2")
            .getObject("TwoB").y;
          var pos_TwoA = this.node
            .getComponent(UITransform)
            .convertToNodeSpaceAR(new Vec3(TwoA_x, TwoA_y));
          var pos_TwoB = this.node
            .getComponent(UITransform)
            .convertToNodeSpaceAR(new Vec3(TwoB_x, TwoB_y));
          newHive1.setPosition(pos_TwoA.x + 5, pos_TwoA.y + 225);
          newHive2.setPosition(pos_TwoB.x + 10, pos_TwoB.y - 225); //up
          newHive1.angle = 180;
          this.hiveNode.addChild(newHive1);

          this.hiveNode.addChild(newHive2);

          break;
        case 3:
          var ThreeA_x = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj3")
            .getObject("ThreeA").x;
          var ThreeA_y = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj3")
            .getObject("ThreeA").y;
          var ThreeB_x = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj3")
            .getObject("ThreeB").x;
          var ThreeB_y = this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj3")
            .getObject("ThreeB").y;
          var pos_ThreeA = this.node
            .getComponent(UITransform)
            .convertToNodeSpaceAR(new Vec3(ThreeA_x, ThreeA_y));
          var pos_ThreeB = this.node
            .getComponent(UITransform)
            .convertToNodeSpaceAR(new Vec3(ThreeB_x, ThreeB_y));
          newHive1.setPosition(pos_ThreeA.x + 5, pos_ThreeA.y + 225);
          newHive2.setPosition(pos_ThreeB.x + 10, pos_ThreeB.y - 225); //up
          newHive1.angle = 180;
          this.hiveNode.addChild(newHive1);
          this.hiveNode.addChild(newHive2);

          break;
      }
    }
  }
  buttonAdder() {
    for (var i = 0; i < 6; i++) {
      var newButton = instantiate(this.antButtonPrefab);
      this.buttonHeight = newButton.getComponent(UITransform).height;
      this.antNodeBottom.addChild(newButton);
      this.antNodeBottom.children[i]
        .getComponent(antTypeButton)
        .addSprites(newButton, i);
    }
    // this.buttonHeight = newButton.getComponent(UITransform).getBoundingBox().y;
    for (var i = 0; i < 6; i++) {
      var newButton = instantiate(this.antButtonPrefab);
      newButton.angle = 180;

      this.antNodeTop.addChild(newButton);
      this.antNodeTop.children[i]
        .getComponent(antTypeButton)
        .addSprites(newButton, i);
    }
  }

  update(deltaTime: number) {}
}
