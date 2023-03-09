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
  AntPath: string;
  mapButton: string = "";
  static coins1 = 0;
  static coins2 = 0;
  static Map: TiledMap;
  maximumCoins = 300;
  private singleton() {}
  static getInstance(): singleton {
    if (!singleton.instance) {
      singleton.instance = new singleton();
    }
    return singleton.instance;
  }
  mapAssigner(mapName: string) {
    this.mapButton = mapName;
  }
  setAntPath(path: string) {
    this.AntPath = path;
  }
  getAntPath(): string {
    return this.AntPath;
  }
  start() {}

  update(deltaTime: number) {}
}
