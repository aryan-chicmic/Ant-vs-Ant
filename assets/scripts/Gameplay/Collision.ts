import {
  _decorator,
  Component,
  Node,
  Rect,
  UITransform,
  TweenSystem,
} from "cc";
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

    for (
      var holder_A_Ant = 0;
      holder_A_Ant < this.SingletonObj.AntsHolder_A.children.length;
      holder_A_Ant++
    ) {
      this.AntInPlayer1 = this.SingletonObj.AntsHolder_A.children[holder_A_Ant]
        .getComponent(UITransform)
        .getBoundingBoxToWorld();
      for (
        var holder_B_Ant = 0;
        holder_B_Ant < this.SingletonObj.AntsHolder_B.children.length;
        holder_B_Ant++
      ) {
        this.AntInPlayer2 = this.SingletonObj.AntsHolder_B.children[
          holder_B_Ant
        ]
          .getComponent(UITransform)
          .getBoundingBoxToWorld();
        if (this.AntInPlayer1.intersects(this.AntInPlayer2)) {
          //pause tween
          TweenSystem.instance.ActionManager.pauseTarget(
            this.SingletonObj.AntsHolder_A.children[holder_A_Ant]
          );
          TweenSystem.instance.ActionManager.pauseTarget(
            this.SingletonObj.AntsHolder_B.children[holder_B_Ant]
          );
          return [
            this.SingletonObj.AntsHolder_A.children[holder_A_Ant],
            this.SingletonObj.AntsHolder_B.children[holder_B_Ant],
          ];
        }
      }
    }

    return null;
  }
  checkingHiveCollision() {
    var returned_items1 = this.hiveCollisionImplementation(
      this.SingletonObj.AntsHolder_A,
      this.SingletonObj.HiveHolder_B
    );
    var returned_items2 = this.hiveCollisionImplementation(
      this.SingletonObj.AntsHolder_B,
      this.SingletonObj.HiveHolder_A
    );
    if (returned_items1 == null) {
      return returned_items2;
    }
    return returned_items1;
  }
  hiveCollisionImplementation(whichAntHolder, whichHiveHolder) {
    for (
      var antReference = 0;
      antReference < whichAntHolder.children.length;
      antReference++
    ) {
      this.AntInPlayer1 = whichAntHolder.children[antReference]
        .getComponent(UITransform)
        .getBoundingBoxToWorld();
      for (
        var hiveReference = 0;
        hiveReference < whichHiveHolder.children.length;
        hiveReference++
      ) {
        this.hiveofPlayerB = whichHiveHolder.children[hiveReference]
          .getComponent(UITransform)
          .getBoundingBoxToWorld();

        if (this.AntInPlayer1.intersects(this.hiveofPlayerB)) {
          return [
            whichAntHolder.children[antReference],
            whichHiveHolder.children[hiveReference],
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
    let healthOfAnt1 = returnedNodes[0]
      .getComponent(FighterAntScript)
      .getHealth();
    let healthOfAnt2 = returnedNodes[1]
      .getComponent(FighterAntScript)
      .getHealth();
    healthOfAnt1 -=
      returnedNodes[1].getComponent(FighterAntScript).Damage +
      returnedNodes[0].getComponent(FighterAntScript).Shield;
    healthOfAnt2 -=
      returnedNodes[0].getComponent(FighterAntScript).Damage +
      returnedNodes[1].getComponent(FighterAntScript).Shield;

    returnedNodes[0].getComponent(FighterAntScript).Health = healthOfAnt1;
    returnedNodes[1].getComponent(FighterAntScript).Health = healthOfAnt2;

    if (healthOfAnt1 <= 0) {
      setTimeout(() => {
        returnedNodes[0].destroy();

        if (returnedNodes[1] != null) {
          TweenSystem.instance.ActionManager.resumeTarget(returnedNodes[1]);
        }
      }, 1000);
    } else if (healthOfAnt2 <= 0) {
      setTimeout(() => {
        returnedNodes[1].destroy();

        if (returnedNodes[0] != null) {
          TweenSystem.instance.ActionManager.resumeTarget(returnedNodes[0]);
        }
      }, 1000);
    }
  }

  onLoad() {
    this.SingletonObj = singleton.getInstance();
  }
  start() {}

  update(deltaTime: number) {
    if (
      this.SingletonObj.AntsHolder_A != null &&
      this.SingletonObj.AntsHolder_B != null
    ) {
      let collidedAnt = this.antCollision();
      if (collidedAnt != null) {
        this.AntHealth(collidedAnt);
      }
    }

    let anthiveCollision = this.checkingHiveCollision();

    if (anthiveCollision != null) {
      this.hive_ant_health(anthiveCollision);
    }
  }
}
