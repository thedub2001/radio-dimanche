import { Component, OnInit, ViewChild } from '@angular/core';
import { SoundcloudService } from '../soundcloud.service';
import { ActivatedRoute } from '@angular/router';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-dialog-playlist',
  templateUrl: './dialog-playlist.component.html',
  styleUrls: ['./dialog-playlist.component.scss']
})
export class DialogPlaylistComponent implements OnInit {
  
  playlistName : string;
  dataSource = [];
  displayedColumns: string[] = ['title', 'duration', 'action'];

  constructor(
    public sc : SoundcloudService,
    private route: ActivatedRoute ,
    public main : MainComponent
  ) {}

  ngOnInit(): void {
    this.playlistName = this.route.snapshot.paramMap.get('id');
    this.dataSource = this.sc.getSoundcloudPlaylisTracks(this.playlistName);
  }
  
  playPlaylist(): void {
    this.main.ngxPlayer.player.nativeElement.pause();
    setTimeout(() => {
      console.log("Playing all tracks from playlist ", this.playlistName )
      this.sc.dataSource=this.dataSource;
      //this.ngxPlayer is not working so we must use the one of the MainComponent
      this.main.ngxPlayer.currentIndex =0;
      setTimeout(() => {
        this.main.ngxPlayer.player.nativeElement.play();
      }, 50);
    }, 50);


  }
  playTrack(m): void {
    this.main.ngxPlayer.player.nativeElement.pause();
    setTimeout(() => {
      console.log("Playing one track from playlist with indexOfelement :", m )
      this.sc.dataSource=[this.dataSource[m]];
      //this.ngxPlayer is not working so we must use the one of the MainComponent
      this.main.ngxPlayer.currentIndex =0;
      setTimeout(() => {
        this.main.ngxPlayer.player.nativeElement.play();
      }, 50);
    }, 50);
  }

  
}
