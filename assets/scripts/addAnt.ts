import {
  _decorator,
  Component,
  Node,
  instantiate,
  Prefab,
  AudioClip,
  AudioSource,
} from "cc";
import { ant } from "./ant";
import AudioControllerObject from "./AudioController";
import { AudioSourceManager } from "./AudioSourceManager";
import { singleton } from "./singleton";
const { ccclass, property } = _decorator;

@ccclass("addAnt")
export class addAnt extends Component {
  @property({ type: Prefab })
  antPrefab: Prefab = null;
  @property({ type: Node })
  antNode: Node;
  @property({ type: Node })
  loader: Node = null;
  initialPosX = 0;
  initialPosY = 0;
  @property({ type: Node })
  audiosource = null;
  @property({type:Node})
  player1:Node=null
  backgroundAudioClip() {
    let audio = this.node.getComponent(AudioSource);
    // console.log("Audio", audio);
    AudioControllerObject.playMusic(audio.clip);
  }

  makeAnt() {
    let antObject = instantiate(this.antPrefab);
    return antObject;
  }
  start() {
    this.audiosource.getComponent(AudioSourceManager).initAudioSource();
    // audio clip play
    this.backgroundAudioClip();
    // this.beginBgSound();

    this.loader.active = false;
    for (var i = 0; i < Math.floor(Math.random() * 2) + 10; i++) {
      var newAnt = this.makeAnt();

      newAnt.getComponent(ant).setInitialPos(this.node);
      newAnt.getComponent(ant).startMovement();
    }
  }

  update(deltaTime: number) {}
}
