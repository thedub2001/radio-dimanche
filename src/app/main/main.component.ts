import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SoundcloudService } from '../soundcloud.service';
import { Track } from 'ngx-audio-player';   

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements AfterViewInit, OnInit  {
  @ViewChild('jsconsole') jsconsole: ElementRef;
  @ViewChild('playlist') playlist: ElementRef;
  detailActivated: boolean = false;

  public play : boolean = false;
  public loaded : boolean = false;
  public pause : boolean = false;

  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;

  constructor(public sc : SoundcloudService) {}

  ngOnInit(): void {
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
  }

  onLoading(e) : void {
    console.log("onLoading :",e);
    this.play=false;
    this.loaded=false;
  }

 }

