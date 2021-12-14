import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,HostListener, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { vinylAnimation, fadeoutAnimation } from "./animation";
import * as widgetAPI from "./widgetAPI";
// TO DO : volume widget -> ngx.html, ligne 203


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [vinylAnimation,fadeoutAnimation]
})

export class MainComponent implements AfterViewInit, OnInit  {
  
  isHandset$= this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  
  detailActivated: boolean = false;

  public play : boolean = false;
  public loaded : boolean = false;
  public pause : boolean = false;
  isOpen=false;
  sliderValue=5;
  public tempTest=0;

  currentIndex: number;
  tabIndex : number = 0;
  currentState:string = "initial";
  overlayState: string = "hidden";

  currentTitle : string = "";
  currentArtist : string = "";
  currentExtra : string = "Extra info";
  currentEndTime : string = "00:00";
  currentEndTimeMillis: number = 0;
  currentTrackTime : string = "00:00";
  currentSliderPosition : number = 0;
  currentImageUrl : string = "";
  isPlaying = false;
  isPlaylist = true;
  currentVolume = 100;
  playProgressTimeout : boolean = false;
  viewIsReady: boolean = false;
  SC : any = {};


  @ViewChild("scFrame", { static: false }) scFrame!: ElementRef;


  constructor(
    //public sc : SoundcloudService,
    public router : Router,
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2
    ) {}

  ngOnInit(): void {
  }
  abc(e): void {
    console.log("abc : ",e);
  }

  ngAfterViewInit(): void {
    this.viewIsReady = true;
    widgetAPI.onReceiveWidgetMessage(this.renderer,this.SC);
    widgetAPI.widgetConstructor(this.scFrame,"widget1",this.SC);

    this.SC.widget1.event.ready.bind = ()=> {
      //play is fired twice ?!
      // subscribe to ready event in order to automatic re-subscribe on loading new url !
      this.SC.widget1.event.play.bind = () => this.isPlaying=true;
      this.SC.widget1.event.play(1);
      this.SC.widget1.event.pause.bind = () => this.isPlaying=false;
      this.SC.widget1.event.pause(1);
      this.SC.widget1.getDuration.bind = (d) => {
        this.currentEndTime=widgetAPI.millisecondsToHms(d);
        this.currentEndTimeMillis = d;
      }
      this.SC.widget1.getDuration();
      this.SC.widget1.event.playProgress.bind = (pp) => {
        if (!this.playProgressTimeout) {
          this.playProgressTimeout = true;
          this.currentTrackTime = widgetAPI.millisecondsToHms(pp.currentPosition);
          this.currentSliderPosition = pp.relativePosition*100;
          setTimeout(()=>{
            this.playProgressTimeout=false;
          }, 1000)
        }
      }
      this.SC.widget1.event.playProgress(1);
      this.SC.widget1.getCurrentSound.bind = (cs) => {
        this.currentImageUrl = cs.artwork_url;
        this.currentTitle = cs.title;
        this.currentArtist = cs.artist; // WARNING : cs.artist could be empty;
        console.log(cs);
      }
      this.SC.widget1.getCurrentSound(); // TO DO : getCurrentSound if new song is played --> prev/next/end event...
    }
  }
  // TO DO : add listener for seek to avoid delay in showing postion on mat-slider

  subscribeToPlayProgress() {
    this.SC.widget1.event.playProgress(1);
  }
  
  navigateToPlaylist(p) : void {
    console.log(p);
    this.router.navigate(['./playlist',p]);
    // TO DO : naviguer jusqu'a la playlist comme [routerLink]="['playlist', element.title]" en html
  }

  changeTabIndex(n) : void {
    this.tabIndex=n;
  }

  captureDoneEvent(e) : void {
    // console.log("captureDoneEvent : ",e)
    switch (e.toState) {
      case 'initial' : this.currentState='0';
      break;
      case '0' : this.currentState='1';
      break;
      case '1' : this.currentState='2';
      break;
    }
  }
  
 }

