import { _decorator, Component, Node, Rect, UITransform, TweenSystem } from "cc";
import { singleton } from "../ClassScripts/singleton";
import { HiveScript } from "../MapSceneComponents/HiveScript";
import { FighterAntScript } from "./FighterAntScript";

const { ccclass, property } = _decorator;

@ccclass("Collision")
export class Collision extends Component {
  @property({ type: Node })
  hiveHolder: Node = null;

  @property({ type: Node })
  Player1Ant: Node = null;
  @property({ type: Node })
  Player2Ant: Node = null;
  AntInPlayer1: Rect = null;
  AntInPlayer2: Rect = null;
  ant1Reference: Node = null;
  ant2Reference: Node = null;
  isAlive: Boolean = true;
  hive: Rect = null;
  hiveofPlayerB: Rect = null;
  hiveofPlayerA: Rect = null;
  SingletonObj: singleton = null;

  antCollision(): any {
    let Collision: Boolean = false;

    for (var i = 0; i < this.SingletonObj.AntsHolder_A.children.length; i++) {
      this.AntInPlayer1 = this.SingletonObj.AntsHolder_A.children[i]
        .getComponent(UITransform)
        .getBoundingBoxToWorld();
      for (var j = 0; j < this.SingletonObj.AntsHolder_B.children.length; j++) {
        this.AntInPlayer2 = this.SingletonObj.AntsHolder_B.children[j]
          .getComponent(UITransform)
          .getBoundingBoxToWorld();
        if (this.AntInPlayer1.intersects(this.AntInPlayer2)) {
          //pause tween
          TweenSystem.instance.ActionManager.pauseTarget(
            this.SingletonObj.AntsHolder_A.children[i]
          );
          TweenSystem.instance.ActionManager.pauseTarget(
            this.SingletonObj.AntsHolder_B.children[j]
          );
          return [
            this.SingletonObj.AntsHolder_A.children[i],
            this.SingletonObj.AntsHolder_B.children[j],
          ];
        }
      }
    }

    return null;
  }
  hiveCollision() {
    for (var i = 0; i < this.SingletonObj.AntsHolder_A.children.length; i++) {
      // this.ant1Reference = this.SingletonObj.AntsHolder_A.children[i];
      this.AntInPlayer1 = this.SingletonObj.AntsHolder_A.children[i]
        .getComponent(UITransform)
        .getBoundingBoxToWorld();
      for (var j = 0; j < this.SingletonObj.HiveHolder_B.children.length; j++) {
        this.hiveofPlayerB = this.SingletonObj.HiveHolder_B.children[j]
          .getComponent(UITransform)
          .getBoundingBoxToWorld();

        if (this.AntInPlayer1.intersects(this.hiveofPlayerB)) {
          //pause tween

          return [
            this.SingletonObj.AntsHolder_A.children[i],
            this.SingletonObj.HiveHolder_B.children[j],
          ];
        }
      }
    }
    for (var i = 0; i < this.SingletonObj.AntsHolder_B.children.length; i++) {
      // this.ant1Reference = this.SingletonObj.AntsHolder_A.children[i];
      this.AntInPlayer2 = this.SingletonObj.AntsHolder_B.children[i]
        .getComponent(UITransform)
        .getBoundingBoxToWorld();
      for (var j = 0; j < this.SingletonObj.HiveHolder_A.children.length; j++) {
        this.hiveofPlayerA = this.SingletonObj.HiveHolder_A.children[j]
          .getComponent(UITransform)
          .getBoundingBoxToWorld();
        if (this.AntInPlayer2.intersects(this.hiveofPlayerA)) {
          //pause tween

          return [
            this.SingletonObj.AntsHolder_B.children[i],
            this.SingletonObj.HiveHolder_A.children[j],
          ];
        }
      }
    }
    return null;
  }

  hive_ant_health(anthiveCollision) {
    var Ant = anthiveCollision[0];
    var Hive = anthiveCollision[1];
    let antHealth = Ant.getComponent(FighterAntScript).getHealth();
    let antDamage = Ant.getComponent(FighterAntScript).Damage;
    let antShield = Ant.getComponent(FighterAntScript).Shield;
    let hiveHealth = Hive.getComponent(HiveScript).Health;
    let hiveDamage = Hive.getComponent(HiveScript).Damage;
    let hiveShield = Hive.getComponent(HiveScript).Shield;
    antHealth -= hiveDamage + antShield;
    hiveHealth -= antDamage + hiveShield;
    Ant.getComponent(FighterAntScript).Health = antHealth;
    Hive.getComponent(HiveScript).Health = hiveHealth;

    if (antHealth <= 0) {
      setTimeout(() => {
        Ant.destroy();
      }, 1000);
    } else if (hiveHealth <= 0) {
      setTimeout(() => {
        Hive.destroy();

        if (Ant != null) {
          TweenSystem.instance.ActionManager.resumeTarget(Ant);
        }
      }, 1000);
    }
  }
  AntHealth(returnedNodes) {
    let returnNode_0 = returnedNodes[0].getComponent(FighterAntScript).getHealth();
    let returnNode_1 = returnedNodes[1].getComponent(FighterAntScript).getHealth();
    returnNode_0 -=
      returnedNodes[1].getComponent(FighterAntScript).Damage +
      returnedNodes[0].getComponent(FighterAntScript).Shield;
    returnNode_1 -=
      returnedNodes[0].getComponent(FighterAntScript).Damage +
      returnedNodes[1].getComponent(FighterAntScript).Shield;

    returnedNodes[0].getComponent(FighterAntScript).Health = returnNode_0;
    returnedNodes[1].getComponent(FighterAntScript).Health = returnNode_1;

    if (returnNode_0 <= 0) {
      setTimeout(() => {
        returnedNodes[0].destroy();
        // returnedNodes[1].getComponent(Animation).stop();
        if (returnedNodes[1] != null) {
          TweenSystem.instance.ActionManager.resumeTarget(returnedNodes[1]);
        }
      }, 1000);
    } else if (returnNode_1 <= 0) {
      setTimeout(() => {
        returnedNodes[1].destroy();
        // returnedNodes[0].getComponent(Animation).stop();
        if (returnedNodes[0] != null) {
          TweenSystem.instance.ActionManager.resumeTarget(returnedNodes[0]);
        }
      }, 1000);
    }
  }
  health(returnedNodes) {
    // console.log("IN HEALTH FUNCTION");

    var returnNode_0 = returnedNodes[0].getComponent(FighterAntScript).getHealth();
    console.log();
    var returnNode_1 = returnedNodes[1].getComponent(FighterAntScript).getHealth();
    // console.log(" Starting health", returnNode_0, returnNode_1);
    returnNode_0 -=
      returnedNodes[1].getComponent(FighterAntScript).Damage +
      returnedNodes[0].getComponent(FighterAntScript).Shield;
    returnNode_1 -=
      returnedNodes[0].getComponent(FighterAntScript).Damage +
      returnedNodes[1].getComponent(FighterAntScript).Shield;

    returnedNodes[0].getComponent(FighterAntScript).Health = returnNode_0;
    returnedNodes[1].getComponent(FighterAntScript).Health = returnNode_1;

    if (returnNode_0 <= 0) {
      returnedNodes[0].destroy();
      if (returnedNodes[1] != null) {
        TweenSystem.instance.ActionManager.resumeTarget(returnedNodes[1]);
      }
    }

    if (returnNode_1 <= 0) {
      returnedNodes[1].destroy();
      if (returnedNodes[0] != null) {
        TweenSystem.instance.ActionManager.resumeTarget(returnedNodes[0]);
      }
    }
  }
  onLoad() {
    this.SingletonObj = singleton.getInstance();
  }
  start() {}

  update(deltaTime: number) {
    if (this.SingletonObj.AntsHolder_A != null && this.SingletonObj.AntsHolder_B != null) {
      let collidedAnt = this.antCollision();
      if (collidedAnt != null) {
        this.AntHealth(collidedAnt);
      }
    }

    let anthiveCollision = this.hiveCollision();

    if (anthiveCollision != null) {
      this.hive_ant_health(anthiveCollision);
    }
  }
}
