import { _decorator, Component, Node, resources, AudioClip, Prefab } from "cc";
const { ccclass, property } = _decorator;
import { MAP_TYPES } from "./constants";
@ccclass("singleton")
export class singleton extends Component {
  private static instance: singleton = null;
  mapButton: string = "";
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
  start() {}

  update(deltaTime: number) {}
}
