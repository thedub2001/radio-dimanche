import { Component, OnInit } from '@angular/core';
import { MixcloudService } from '../mixcloud.service';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';

export interface playlistDetailData {
  tracks: [
    {
      audio_length:number,
      key:string,
      name:string
    }
  ];
}

// TO DO : ajouter icone à la place de "play"
// TO DO : playTrack();

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlistName : string;
  playlistDetail : playlistDetailData ;
  dataSource = [];
  displayedColumns: string[] = ['name', 'time', 'action'];


  constructor(
    public mix : MixcloudService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.playlistName = this.route.snapshot.paramMap.get('id');
    this.playlistDetail=this.mix.mixcloudPlaylistsContent.find(p=>p.name===this.playlistName)
    this.dataSource = this.playlistDetail.tracks.map(obj => {
      var rObj = {};
      rObj["name"] = obj.name;
      rObj["key"] = obj.key;
      rObj["audio_length"] = this.secondsToHms(obj.audio_length);
      return rObj;
    });
  }


  playTrack(): void {
    console.log("play track from playlistDetail")

  }

   secondsToHms(d:number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = this.checkTime(h);
    var mDisplay = this.checkTime(m);
    var sDisplay = this.checkTime(s);
    return hDisplay+":"+mDisplay+":"+sDisplay; 
}

 checkTime(i:number) {
  return (i < 10) ? "0" + i : i;
}

}
