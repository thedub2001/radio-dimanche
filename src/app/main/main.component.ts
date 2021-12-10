import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,HostListener  } from '@angular/core';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { vinylAnimation, fadeoutAnimation } from "./animation";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [vinylAnimation,fadeoutAnimation]
})

export class MainComponent implements AfterViewInit, OnInit  {
  @ViewChild('jsconsole') jsconsole: ElementRef;
  @ViewChild('playlist') playlist: ElementRef;
  
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
  sc = {};

  currentIndex: number;
  tabIndex : number = 0;
  currentState:string = "initial";
  overlayState: string = "hidden";

  currentTitle = "Oregon VS Katmandou";
  currentArtist = "James Lee";
  currentExtra = "@1954 records";
  currentEndTime = 1245;
  currentTrackTime = 230;
  isPlaying = false;
  isPlaylist = true;
  currentVolume = 100;

  constructor(
    //public sc : SoundcloudService,
    public router : Router,
    private breakpointObserver: BreakpointObserver,
    ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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

