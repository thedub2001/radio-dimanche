import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  @Input() title : string = "No title";
  @Input() artist : string = "No artist";
  @Input() extra : string = "";
  @Input() playing : boolean = false;
  @Input() playlist : boolean = false;
  @Input() volume : number = 100;
  @Input() endTime : string = "99:99";
  @Input() trackTime : string = "88:88";
  @Input() sliderPosition : number = 50;
  @Input() imageUrl : string = "";
  @Input() playlistUrl : string = "";
// TO DO : Add a button wich links to playlistUrl in the player 


  @Output() play = new EventEmitter<string>();
  @Output() pause = new EventEmitter<string>();
  @Output() prev = new EventEmitter<string>();
  @Output() next = new EventEmitter<string>();
  @Output() replay = new EventEmitter<string>();
  @Output() seekTo = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
