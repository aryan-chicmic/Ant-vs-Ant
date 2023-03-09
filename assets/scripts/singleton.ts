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
  static canvasNode: Node = null;
  static PathDeciderNode: Node = null;
  static antsHolder: Node = null;
  static mapComponents: Node = null;
  static AntPath: string;
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
    return singleton.PathDeciderNode;
  }
  set node_setter(value: Node) {
    singleton.PathDeciderNode = value;
  }
  get canvasNode_getter(): Node {
    console.log(" get Frame");
    return singleton.canvasNode;
  }
  set canvasNode_setter(value: Node) {
    singleton.canvasNode = value;
  }
  get antsHolder_getter(): Node {
    console.log(" get Frame");
    return singleton.antsHolder;
  }
  set antsHolder_setter(value: Node) {
    singleton.antsHolder = value;
  }
  get mapComponents_getter(): Node {
    console.log(" get Frame");
    return singleton.mapComponents;
  }
  set mapComponents_setter(value: Node) {
    singleton.mapComponents = value;
  }
  mapAssigner(mapName: string) {
    this.mapButton = mapName;
  }
  setAntPath(path: string) {
    singleton.AntPath = path;
  }
  getAntPath(): string {
    return singleton.AntPath;
  }
  start() {}

  update(deltaTime: number) {}
}
