import { Component, Input, OnInit } from '@angular/core';

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
  @Input() endTime : number = 1527;
  @Input() trackTime : number = 250;

  constructor() { }

  ngOnInit(): void {
  }

}
