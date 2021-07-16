import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MixcloudService } from '../mixcloud.service';
import { SoundcloudService } from '../soundcloud.service';


@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})

export class TrackListComponent implements OnInit {

  public MixcloudTracks = this.mix.MixcloudUserPlaylists;
  public SoundcloudTracks = this.sound.SoundcloudTracks;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/html' }) //or json
  };

  constructor(private http: HttpClient, private mix : MixcloudService, private sound : SoundcloudService) {

   }

  ngOnInit(): void {
    this.mix.ready$.subscribe(n => { if (n) console.log("ready : ", n)}) 
  }

}
