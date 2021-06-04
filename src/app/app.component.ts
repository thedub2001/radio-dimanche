import { Component, OnInit, } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {

  constructor(public fs: FirebaseService
             ) {}

ngOnInit () { //TO DO : est-ce que c la meilleure place pour le mettre et faire du ménage dans les login!
this.fs.checkLog();
}

}
