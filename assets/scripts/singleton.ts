import {
  _decorator,
  Component,
  Node,
  resources,
  AudioClip,
  Prefab,
  TiledMap,
} from "cc";
const { ccclass, property } = _decorator;
import { MAP_TYPES } from "./constants";
@ccclass("singleton")
export class singleton extends Component {
  private static instance: singleton = null;
  mapButton: string = "";
  static coins1 = 0;
  static coins2 = 0;
  static Map: TiledMap = null;
  maximumCoins = 300;
  private singleton() {}
  static getInstance(): singleton {
    if (!this.instance) {
      this.instance = new singleton();
    }
    return singleton.instance;
  }
  mapAssigner(mapName: string) {
    this.mapButton = mapName;
  }
  setMap(map: TiledMap) {
    singleton.Map = map;
  }
  getMap(): TiledMap {
    return singleton.Map;
  }
  start() {}

  update(deltaTime: number) {}
}
