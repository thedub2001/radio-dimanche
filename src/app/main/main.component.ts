import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,HostListener  } from '@angular/core';
import { AudioPlayerComponent , Track} from 'ngx-audio-player';
// import { SoundcloudService } from '../soundcloud.service';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {trigger,state,style,animate,transition} from "@angular/animations";

// TO DO : export animations in a separate file
// TO DO : replace first logo by vinylLogo not spinning

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger("vinylAnim", [
      state(
        "initial",
        style({
          zIndex: "4",
          position : "relative",

        })
      ),
      state(
        "0",
        style({
          transform: "rotate(360deg)",
          zIndex: "4",
          position : "relative",


        })
      ),
      state(
        "1",
        style({
          transform: "rotate(540deg)",
          zIndex: "4",
          position : "relative",

        })
      ),
      state(
        "2",
        style({
          transform: "rotate(720deg)",
          zIndex: "4",
          position : "relative",
          display :"none",
          opacity : "0",

        })
      ),
      transition("initial=>0", animate("3.5s cubic-bezier(0.5,0,1,1)")),
      transition("0=>1", animate("900ms")),
      transition("1=>2", animate("900ms")),
    ]),
    
    trigger("overlayFadeOut", [
      state(
        "hidden",
        style({
          position: "fixed",
          display: "block",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "#eeeeee",
          zIndex: "3",
          cursor: "pointer",
        })
      ),
      state(
        "visible",
        style({
          position: "fixed",
          display: "none",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "#eeeeee",
          opacity : "0",
          zIndex: "3",
          cursor: "pointer",

        })
      ),
      transition("hidden=>visible", animate("0.9s 5s ease-out")),
    ])
    
  ]
})

export class MainComponent implements AfterViewInit, OnInit  {
  @ViewChild('jsconsole') jsconsole: ElementRef;
  @ViewChild('playlist') playlist: ElementRef;
  
  // we need to get the ElementRef of the HTML5 audio player wich is part of the AudioPlayerComponent
  // See : https://www.pluralsight.com/guides/querying-the-dom-with-@viewchild-and-@viewchildren
  @ViewChild(AudioPlayerComponent, { static: false }) ngxPlayer : AudioPlayerComponent;

  isHandset$= this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  
  detailActivated: boolean = false;

  public play : boolean = false;
  public loaded : boolean = false;
  public pause : boolean = false;
  public currentTrack : Track = {title:"",link:""};
  isOpen=false;
  sliderValue=5;
  public tempTest=0;
  sc = {};


  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;
  currentIndex: number;
  tabIndex : number = 0;
  currentState:string = "initial";
  overlayState: string = "hidden";

  constructor(
    //public sc : SoundcloudService,
    public router : Router,
    private breakpointObserver: BreakpointObserver,
    ) {}

  ngOnInit(): void {
  }

  ngxAudioPlayerPlay(): void {
    this.ngxPlayer.playBtnHandler();
  }

  ngxAudioPlayerPrevious(): void {
    this.ngxPlayer.previousSong();
  }

  ngxAudioPlayerNext(): void {
    this.ngxPlayer.nextSong();
  }

  ngAfterViewInit(): void {
  }

  onEnded(e) : void {
    console.log("onEnded :",e);
  }
  
  onPlayed(e) : void {
    console.log("onPlayed :",e);
    this.play=true;
    this.pause = false;

  }
  
  onPaused(e) : void {
    console.log("onPaused :",e);
    this.play=false;
    this.pause = true;
  }
    
  onLoaded(e) : void {
    console.log("onLoaded :",e);
    this.loaded=true;
    this.play=false;
    this.pause = true;   
    this.currentTrack=this.ngxPlayer.tracks[this.ngxPlayer.currentIndex];
    this.currentIndex=this.ngxPlayer.currentIndex;

  }

  onLoading(e) : void {
    console.log("onLoading :",e);
    this.play=false;
    this.loaded=false;

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

