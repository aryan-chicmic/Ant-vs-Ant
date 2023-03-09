import { _decorator, Component, Node, resources, AudioClip, Prefab, TiledMap } from "cc";
const { ccclass, property } = _decorator;
import { MAP_TYPES } from "./constants";
@ccclass("singleton")
export class singleton extends Component {
  private static instance: singleton = null;

  parent_Node: Node = null;

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
  get node_getter(): Node {
    console.log(" get Frame");
    return this.parent_Node;
  }
  set node_setter(value: Node) {
    this.parent_Node = value;
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
