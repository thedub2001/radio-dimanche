import { Component, OnInit } from '@angular/core';
import { SoundcloudService } from '../soundcloud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  playlistName : string;
  dataSource = [];
  displayedColumns: string[] = ['name', 'time', 'action'];

  constructor(
    public sc : SoundcloudService,
    private route: ActivatedRoute  
  ) {}

  ngOnInit(): void {
    this.playlistName = this.route.snapshot.paramMap.get('id');
    this.dataSource = this.sc.getSoundcloudPlaylisTracks(this.playlistName);
  }

  // TO DO : playPlaylist();
  playPlaylist(): void {
    console.log("play all tracks from dataSource")
  }
}
