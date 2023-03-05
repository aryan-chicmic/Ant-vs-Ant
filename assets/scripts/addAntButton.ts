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

  onLoad() {
    this.singletonObject = singleton.getInstance();
    // this.hiveAdder();
  }

  start() {
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
        }, 2000);
      }
    }
  }
  hiveAdder() {
    var newHive = instantiate(this.hive);
    var pos = this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(
        new Vec3(
          this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj1")
            .getObject("OneA").x,
          this.mapNode
            .getComponent(TiledMap)
            .getObjectGroup("PathObj1")
            .getObject("OneA").y
        )
      );
    newHive.setPosition(pos.x, pos.y + this.buttonHeight);
    this.hiveNode.addChild(newHive);
    console.log(
      "consoling map",
      this.mapNode
        .getComponent(TiledMap)
        .getObjectGroup("PathObj1")
        .getObject("OneA")
    );
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
    this.buttonHeight = newButton.getComponent(UITransform).getBoundingBox().y;
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
