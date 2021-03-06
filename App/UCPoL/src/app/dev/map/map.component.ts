import { Component, OnInit,HostListener } from '@angular/core';
import {DevModule} from '../dev.module';
import {COLLIDERS1,COLLIDERS2,MAPS} from '../colliders';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  collidersarr = COLLIDERS1;
  maps = MAPS;
  colsMaps = ['map1','map2','map3'];
  currMap = 0;
  collider = false;
  userY : number;
  userX : number;
  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    this.userY = e.clientY;
    this.userX = e.clientX;
    document.documentElement.style.setProperty('--setterY', `${e.clientY}px`);
    document.documentElement.style.setProperty('--setterX', `${e.clientX}px`);
    
  }
  constructor() { }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--setterW', `16px`);
    document.documentElement.style.setProperty('--setterH', `16px`);
    document.documentElement.style.setProperty('--vis', `hidden`);
    document.documentElement.style.setProperty('--map', `url(../../../assets/img/env/1.png)`);
    document.documentElement.style.setProperty('--mapSize', `30%`);
  }
  next():void{
   if(this.currMap == 2){
     this.currMap = 0
   }
   else{
     this.currMap++;
   }
   this.changemap(this.currMap);
  }
  changemap(mapID): void{
    document.documentElement.style.setProperty('--map', `url(../../../assets/img/env/${this.maps[mapID].path})`);
    document.documentElement.style.setProperty('--mapSize', `${this.maps[mapID].size}`);
    console.log(mapID);
    //this.colliders = JSON.parse(localStorage.getItem(this.colsMaps[mapID]));
  }
  sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }
  async change(){
    await this.sleep(20);
    this.collider? this.collider= false: this.collider  =true; 
    this.collider? document.documentElement.style.setProperty('--vis', `visible`): document.documentElement.style.setProperty('--vis', `hidden`); 
  }
  hv : number = 0;
  wv :number = 0;
  rightCornerX =0;
  rightCornerY = 0;
  setHv(hv: number)
   {
     if(hv >= 16){
      this.hv = hv;
      document.documentElement.style.setProperty('--setterH', `${this.hv}px`);}
   }
  setWv(wv: number) 
  { 
    if(wv >= 16){
    this.wv = wv;
    document.documentElement.style.setProperty('--setterW', `${this.wv}px`);}
   }
   setCollider():void{
     if(this.collider){
      
       console.log(this.userX +" " + this.userY);
       this.rightCornerX = +this.wv + this.userX ;
       this.rightCornerY = +this.hv + this.userY ;
       this.collidersarr.push({x1:this.userY,y1:this.userX,x2:this.rightCornerY,y2:this.rightCornerX});
       for(let col of this.collidersarr){
         console.log(col);
       }
     }
   }
   saveCollider():void{
    localStorage.setItem(this.colsMaps[this.currMap], JSON.stringify(this.collidersarr));
   }
   clearCollider():void{
    localStorage.removeItem(this.colsMaps[this.currMap]);
    localStorage.removeItem('currmap');
    localStorage.removeItem("didI?");
    localStorage.removeItem('images');
    localStorage.removeItem('images2');
    localStorage.removeItem('images3');
    localStorage.removeItem('eq');
    localStorage.removeItem('eq2');
    localStorage.removeItem('eq3');
    localStorage.removeItem('str');
  localStorage.removeItem('int');
  localStorage.removeItem('def');
  localStorage.removeItem('sp');
  localStorage.removeItem('lvl');
  localStorage.removeItem('exp');
   }

}
