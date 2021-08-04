import { Component, OnInit } from '@angular/core';
import { MixcloudService } from '../mixcloud.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlistName : string;
  playlistDetail=[];

  constructor(
    public mix : MixcloudService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.playlistName = this.route.snapshot.paramMap.get('id');
    this.playlistDetail=this.mix.mixcloudPlaylistsContent.find(p=>p.name===this.playlistName)
  }


}
