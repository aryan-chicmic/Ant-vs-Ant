import { _decorator, Component, Node, NodePool, Prefab, instantiate, SpriteFrame } from 'cc';
import { FighterAntScript } from './FighterAntScript';
const { ccclass, property } = _decorator;

@ccclass('AntGenerateManager')
export class AntGenerateManager extends Component {

    private static _instance:AntGenerateManager=null;
    @property({type:Prefab})
    Ant=null;
    @property({type:Node})
    AddedAnt=null;
    AntPool:NodePool;
    private AntGenerateManager(){}
    static getInstance(): AntGenerateManager {
        if (!this._instance) {
          this._instance = new AntGenerateManager();
          
        }
        return AntGenerateManager._instance;
      }
      generateAnt(AntName:string,
        TimeToCoverChangeInY:number,
        sprite:SpriteFrame,
        Health:number,
        Damage:number,
        CoinAlloted:number,
        Shield:number)
      {
        
      //  console.log(Ant.AntName);
      console.log(this.AntPool.size())
        //  if(this.AntPool.size()==0)
        //  {
        //         let fighetAnt=instantiate(this.Ant);
        //         this.AntPool.put(fighetAnt);     
        //  }
        //  let newAnt=this.AntPool.get();
        //  newAnt.getComponent(FighterAntScript).AddSpecs(AntName,TimeToCoverChangeInY,sprite,Health,Damage,CoinAlloted,Shield);
        //  this.AddedAnt.addChild(newAnt);
      }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


