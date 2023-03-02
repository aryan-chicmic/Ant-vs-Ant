import { _decorator, Component, Node, resources, AudioClip } from "cc";
const { ccclass, property } = _decorator;

@ccclass("singleton")
export class singleton extends Component {
  audioclips: AudioClip[] = [];
  private static instance: singleton = null;
  spriteFrameIndex: number;
  private singleton() {}
  static getInstance(): singleton {
    if (!this.instance) {
      this.instance = new singleton();
    }
    return singleton.instance;
  }

  start() {}
  // resourceSoundLoad(folder: string) {
  //     resources.preloadDir(folder, AudioClip);

  //     return new Promise<AudioClip[]>((resolve, reject) => {
  //       resources.loadDir(folder, AudioClip, (err, assets: AudioClip[]) => {
  //         if (!err) {
  //           // console.log("in promise");

  //           this.audioclips = assets;
  //           // console.log(this.spritesArray);
  //           return resolve(this.audioclips);
  //         } else {
  //           return reject(err);
  //         }
  //       });
  //     });
  //   }

  update(deltaTime: number) {}
}
