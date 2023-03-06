import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FighterAntScript')
export class FighterAntScript extends Component {
    AntName:string=null;
    TimeToCoverChangeInY:number=null;
    SpriteName:SpriteFrame=null;
    Health:number=null;
    Damage:number=null
    CoinAlloted:number=null;
    Shield:number=null; 

    AddSpecs( AntName:string,
        TimeToCoverChangeInY:number,
        sprite:SpriteFrame,
        Health:number,
        Damage:number,
        CoinAlloted:number,
        Shield:number){
            console.log("call",sprite)
            this.AntName=AntName;
            this.TimeToCoverChangeInY=TimeToCoverChangeInY;
            this.SpriteName=sprite;
          this.node.getComponent(Sprite).spriteFrame=this.SpriteName;
            this.Health=Health;
            this.Damage=Damage;
            this.CoinAlloted=CoinAlloted;
            this.Shield=Shield;
        }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


