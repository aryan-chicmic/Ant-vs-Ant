/**
 * @description main singleton class
 */
import {
  _decorator,
  Component,
  Node,
  resources,
  AudioClip,
  Prefab,
  TiledMap,
  error,
  Sprite,
  SpriteFrame,
  TiledMapAsset,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("singleton")
export class singleton extends Component {
  private static instance: singleton = null;

  // static variables
  private hiveHolder_A: Node = null;
  private hiveHolder_B: Node = null;
  private canvasNode: Node = null;
  private antsHolder_A: Node = null;
  private antsHolder_B: Node = null;
  private pathDeciderNode: Node = null;
  private antsHolder: Node = null;
  private mapComponents: Node = null;
  private antPath: string;
  private coins1: Number = 0;
  private coins2: Number = 0;
  private coinHolder: Node = null;
  private AudioClipArray: AudioClip[] = [];
  private SpriteFrameArray: SpriteFrame[] = [];
  private TiledMapAssetArray: TiledMapAsset[] = [];
  static Map: TiledMap;

  mapButton: string = "";
  maximumCoins = 300;
  private singleton() {}
  static getInstance(): singleton {
    if (!singleton.instance) {
      singleton.instance = new singleton();
    }
    return singleton.instance;
  }
  get HiveHolder_A(): Node {
    return this.hiveHolder_A;
  }
  set HiveHolder_A(value: Node) {
    this.hiveHolder_A = value;
  }
  get HiveHolder_B(): Node {
    return this.hiveHolder_B;
  }
  set HiveHolder_B(value: Node) {
    this.hiveHolder_B = value;
  }
  get CoinHolder(): Node {
    return this.coinHolder;
  }
  set CoinHolder(value: Node) {
    this.coinHolder = value;
  }
  get Coins1(): Number {
    return this.coins1;
  }
  set Coins1(value: Number) {
    this.coins1 = value;
  }
  get Coins2(): Number {
    return this.coins2;
  }
  set Coins2(value: Number) {
    this.coins2 = value;
  }
  get AntsHolder(): Node {
    return this.antsHolder;
  }
  set AntsHolder(value: Node) {
    this.antsHolder = value;
  }
  get PathDeciderNode(): Node {
    return this.pathDeciderNode;
  }
  set PathDeciderNode(value: Node) {
    this.pathDeciderNode = value;
  }
  get CanvasNode(): Node {
    return this.canvasNode;
  }
  set CanvasNode(value: Node) {
    this.canvasNode = value;
  }
  get AntsHolder_A(): Node {
    return this.antsHolder_A;
  }
  set AntsHolder_A(value: Node) {
    this.antsHolder_A = value;
  }

  get AntsHolder_B(): Node {
    return this.antsHolder_B;
  }
  set AntsHolder_B(value: Node) {
    this.antsHolder_B = value;
  }
  get MapComponents(): Node {
    return this.mapComponents;
  }
  set MapComponents(value: Node) {
    this.mapComponents = value;
  }

  set MapAssigner(mapName: string) {
    this.mapButton = mapName;
  }
  get MapAssigner() {
    return this.mapButton;
  }
  set AntPath(path: string) {
    this.antPath = path;
  }
  get AntPath(): string {
    return this.antPath;
  }
  public loadAudioFiles(path: string) {
    return new Promise((resolve, reject) => {
      if (this.AudioClipArray.length > 0) {
        resolve(this.AudioClipArray);
      } else {
        resources.loadDir(path, (err: Error | null, Audios: AudioClip[]) => {
          if (err) {
            reject(err);
            error("load audio files :" + err);
          } else {
            this.AudioClipArray = Audios;
          }
          resolve(this.AudioClipArray);
        });
      }
    });
  }
  public getAudioFile(AudioClipName: string): AudioClip {
    if (this.AudioClipArray) {
      let clip = this.AudioClipArray.find((clip) => {
        if (clip.name == AudioClipName) {
          return clip;
        }
      });
      return clip || null;
    }
  }

  public loadSpriteFrame(path: string) {
    return new Promise((resolve, reject) => {
      if (this.SpriteFrameArray.length > 0) {
        resolve(this.SpriteFrameArray);
      } else {
        resources.loadDir(
          path,
          (err: Error | null, spriteframe: SpriteFrame[]) => {
            if (err) {
              reject(err);
            } else {
              this.SpriteFrameArray = spriteframe;
            }
            resolve(this.SpriteFrameArray);
          }
        );
      }
    });
  }
  public getSpriteFrame(SpriteFrameName: string): SpriteFrame {
    if (this.AudioClipArray) {
      let spriteframe = this.SpriteFrameArray.find((SpriteFrame) => {
        if (SpriteFrame.name == SpriteFrameName) {
          return SpriteFrame;
        }
      });
      return spriteframe || null;
    }
  }
  public loadTiledMapData(path: string) {
    return new Promise((resolve, reject) => {
      if (this.TiledMapAssetArray.length > 0) {
        resolve(this.TiledMapAssetArray);
      } else {
        resources.loadDir(
          path,
          (err: Error | null, MapAsset: TiledMapAsset[]) => {
            if (err) {
              reject(err);
            } else {
              this.TiledMapAssetArray = MapAsset;
            }
            resolve(this.TiledMapAssetArray);
          }
        );
      }
    });
  }
  public getMapAsset(MapName: string): TiledMapAsset {
    if (this.TiledMapAssetArray) {
      let map = this.TiledMapAssetArray.find((Map) => {
        if (Map.name == MapName) {
          return Map;
        }
      });
      return map || null;
    }
  }
  start() {}

  update(deltaTime: number) {}
}
