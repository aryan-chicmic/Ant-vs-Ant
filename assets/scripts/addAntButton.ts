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
} from "cc";
import { antTypeButton } from "./antTypeButton";
import { MAP_TYPES } from "./constants";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("addAntButton")
export class addAntButton extends Component {
  @property({ type: Prefab })
  antButtonPrefab: Prefab = null;
  @property({ type: Node })
  antNodeBottom: Node = null;
  @property({ type: Node })
  antNodeTop: Node = null;

  @property({ type: Node })
  mapNode: Node = null;

  @property({ type: JsonAsset })
  mapchooser: JsonAsset = null;
  singletonObject: singleton;

  onLoad() {
    this.singletonObject = singleton.getInstance();
  }

  start() {
    let dataLoader = this.mapchooser.json.data;
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
      }
    }
    this.buttonAdder();
  }
  buttonAdder() {
    for (var i = 0; i < 6; i++) {
      var newButton = instantiate(this.antButtonPrefab);
      this.antButtonPrefab.getComponent(addAntButton).addSprites(newButton,i);
      this.antNodeBottom.addChild(newButton);
    }
    for (var i = 0; i < 6; i++) {
      var newButton = instantiate(this.antButtonPrefab);
      newButton.angle = 180;
      this.antNodeTop.addChild(newButton);
    }
  }

  update(deltaTime: number) {}
}
