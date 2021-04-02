import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {

	elements = [
	{name: 'write',date:"10/01/2021", icon: '../assets/img/writer-icon.svg', comment:'Nous écrire un message',method:"openDialogWrite()"},
	{name: 'record',date:"10/01/2021", icon: '../assets/img/voice-recorder-icon.svg', comment:'Enregistrer un message audio',method:"openDialogWrite()"},
	{name: 'file',date:"10/01/2021", icon: '../assets/img/send-audio-icon.svg', comment:'Nous envoyer un fichier',method:"openDialogWrite()"},
	{name: 'playlist',date:"10/01/2021", icon: '../assets/img/jukebox-icon.svg', comment:'Ecouter les pistes des autres utilisateurs',method:"openDialogWrite()"},

	];

  constructor() { }

  ngOnInit(): void {
  }

}
