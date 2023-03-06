import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  Label,
  Input,
  Button,
  Director,
  director,
  AudioSource,
  UITransform,
  SpriteFrame,
  Sprite,
} from "cc";
import { map } from "./map";
const { ccclass, property } = _decorator;
import AudioControllerObject from "./AudioController";
import { AudioSourceManager } from "./AudioSourceManager";
@ccclass("mapButtonCreation")
export class mapButtonCreation extends Component {
  @property({ type: Node })
  mainscreen: Node = null;
  @property({ type: Prefab })
  mapButtonPrefab: Prefab = null;
  @property({ type: Node })
  mapButtonCollector: Node;
  @property({ type: Node })
  player1_node: Node;
  @property({ type: Node })
  player2_node: Node;
  @property({ type: Node })
  help_node: Node;
  @property({ type: Node })
  quit_node: Node;
  @property({ type: Node })
  loader: Node;
  button: Node = null;
  countofMaps: number = 3;

  // getting font(AntvsAnt)

  //PrefabHomePageOne
  @property({ type: Prefab })
  HomepageOne = null;

  onLoad() {}

  soundEffect(playerButtonEffect: Node) {
    let audio = playerButtonEffect.getComponent(AudioSource);
    AudioControllerObject.playSoundEffetcs(audio.clip);
  }
  start() {
    this.loader.active = false;
  }

  buttonCreator() {
    this.player1_node.active = false;
    this.player2_node.active = false;
    this.help_node.active = false;
    this.quit_node.active = false;
    this.loader.active = true;
    this.soundEffect(this.player2_node);
    this.soundEffect(this.help_node);
    this.soundEffect(this.quit_node);

    setTimeout(() => {
      this.loader.active = false;
      for (var i = 1; i <= this.countofMaps; i++) {
        this.button = instantiate(this.mapButtonPrefab);

        this.button
          .getComponent(map)
          .setButtonPosition(this.mapButtonCollector, i);
        // this.button.on(Input.EventType.TOUCH_START, this.loadMap, this);
      }
    }, 1000);
  }

  onClickHelpButton() {
    console.log("Help Button Clicked");

    this.player1_node.active = false;
    this.player2_node.active = false;
    this.help_node.active = false;
    this.loader.active = true;
    setTimeout(() => {
      this.loader.active = false;
      // this.mainscreen.getComponent(Sprite).spriteFrame;
      let HelpPage = instantiate(this.HomepageOne);
      this.node.addChild(HelpPage);
    }, 3000);
  }

  update(deltaTime: number) {}
}
