import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MixcloudService } from '../mixcloud.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements AfterViewInit, OnInit  {
  @ViewChild('jsconsole') jsconsole: ElementRef;
  @ViewChild('playlist') playlist: ElementRef;

  public play : boolean = false;
  public loaded : boolean = false;
  public pause : boolean = false;

  constructor(public mix : MixcloudService) {

  }

  ngOnInit(): void {
    this.mix.ready$.subscribe(n => { if (n) {console.log("ready : ", n);this.populatePlaylist();}}) 
  }

  ngAfterViewInit(): void {
    var targetNode = this.jsconsole.nativeElement;
    var config = { attributes: true, childList: true };
    var observer = new MutationObserver(() => {
      console.log(targetNode.innerHTML);
      switch (targetNode.innerHTML) {
        case "playing" :
          this.play=true;
          this.pause = false;
          break;
        case "pause" :
          this.play=false;
          this.pause = true;
          break;
        case "loading" :
          this.play=false;
          this.loaded=false;
          break;
        case "loaded" :
          this.loaded=true;
          this.play=false;
          this.pause = true;          
          break;
        default:
          console.log(`jsconsole unknown message : ${targetNode.innerHTML}.`);
      }


    });

    observer.observe(targetNode, config);
  }

  populatePlaylist() : void {
    this.playlist.nativeElement.innerHTML=JSON.stringify(this.mix.mixcloudPlaylistsTracksArray);
    // console.log(this.mix.mixcloudPlaylistsTracksArray);
    // console.log(JSON.stringify(this.mix.mixcloudPlaylistsTracksArray));
  }

 }

