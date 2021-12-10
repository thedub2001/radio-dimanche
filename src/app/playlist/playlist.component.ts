import { Component, OnInit, ViewChild } from '@angular/core';
import { SoundcloudService } from '../soundcloud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})

export class PlaylistComponent implements OnInit {
  
  playlistName : string;
  dataSource = [];
  displayedColumns: string[] = ['title', 'duration', 'action'];

  constructor(
    public sc : SoundcloudService,
    private route: ActivatedRoute ,
  ) {}

  ngOnInit(): void {
    this.playlistName = this.route.snapshot.paramMap.get('id');
    this.dataSource = this.sc.getSoundcloudPlaylisTracks(this.playlistName);
  }
    
}
