import {
  _decorator,
  Component,
  Node,
  director,
  Label,
  SpriteFrame,
  ParticleAsset,
  ParticleSystem2D,
  Vec2,
  tween,
  Vec3,
  ProgressBar,
} from "cc";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("ProgressUpdater")
export class ProgressUpdater extends Component {
  @property({ type: Node })
  progressBar: Node = null;
  @property({ type: Label })
  PercentageNumber: Label = null;
  @property({ type: Node })
  rays: Node = null;
  @property({ type: Node })
  particle: Node = null;

  //Variable
  progress: number = 0;

  SingletonObject: singleton = null;
  onLoad() {}
  start() {
    this.SingletonObject = singleton.getInstance();
    this.rays.active = false;
    this.particle.active = false;
    this.progress = this.progressBar.getComponent(ProgressBar).progress;
    let promise1 = this.loadAudioResource("sounds");
    let promise2 = this.loadSpriteResource("sprites");
    let promise3 = this.loadTiledMapResources("TiledMapData");

    //Testing
    Promise.all([promise1, promise2, promise3]).then(() => {
      console.log(
        "resolve",
        this.loadAudioResource("sounds"),
        this.loadSpriteResource("sprites"),
        this.loadTiledMapResources("TiledMapData")
      );
    });
    this.schedule(() => {
      if (this.progress <= 1) {
        this.progressBarChecker();
      }
    }, 0.05);
  }
  /**
   * @description Load Tile Resource
   * @param String:path of  TileMap Resource folder
   * @return promise
   */
  loadTiledMapResources(Path: string) {
    return this.SingletonObject.loadTiledMapData(Path);
  }
  /**
   * @description Load Tile Resource
   * @param String:path of  Sprite Resource folder
   * @return promise
   */
  loadSpriteResource(Path: string) {
    return this.SingletonObject.loadSpriteFrame(Path);
  }
  /**
   * @description Load Music Resource
   * @param String:path of  Audio Resource folder
   * @return promise
   */
  loadAudioResource(Path: string) {
    return this.SingletonObject.loadAudioFiles(Path);
  }
  /**
   * @description Loading Percantage
   */
  progressBarChecker() {
    let percentagenum = this.PercentageNumber.string;
    // console.log(this.progress);

    percentagenum = `${Math.ceil(this.progress * 100)}%`;

    this.progress += 0.01;
    this.PercentageNumber.string = percentagenum;
    this.progressBar.getComponent(ProgressBar).progress = this.progress;
    if (this.progress >= 1) {
      this.rays.active = true;
      this.particle.active = true;
      setTimeout(() => {
        director.loadScene("MAIN");
      }, 500);
    }
  }
  update(deltaTime: number) {}
}
