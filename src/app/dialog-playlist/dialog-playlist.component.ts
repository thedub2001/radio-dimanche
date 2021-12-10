import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute ,
  ) {}

  ngOnInit(): void {
    this.playlistName = this.route.snapshot.paramMap.get('id');
  }
    
}
