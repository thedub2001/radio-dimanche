import { Component, OnInit } from '@angular/core';
import { faCoffee, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { faFacebookSquare,faGithubSquare,faSoundcloud,faTwitterSquare,faInstagramSquare } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  faCoffee = faCoffee;
  faFacebookSquare=faFacebookSquare;
  faGithubSquare=faGithubSquare;
  faSoundcloud=faSoundcloud;
  faTwitterSquare=faTwitterSquare;
  faInstagramSquare=faInstagramSquare;
  faEnvelopeOpenText=faEnvelopeOpenText;

  constructor() { }

  ngOnInit(): void {
  }

}
