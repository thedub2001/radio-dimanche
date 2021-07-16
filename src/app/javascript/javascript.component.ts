import { Component, Input } from '@angular/core';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'javascript',
  templateUrl: './javascript.component.html',
  styleUrls: ['./javascript.component.css']
})


export class JavascriptComponent implements AfterViewInit {

  @Input()
  src: string;

  @Input()
  type: string;

  @ViewChild('script') script: ElementRef;

  convertToScript() {
      var element = this.script.nativeElement;

      var newScript = document.createElement("script");
      newScript.type = this.type ? this.type : "text/javascript";
      if (this.src) {
        newScript.src = this.src;
      }
      if (element.innerHTML) {
        newScript.innerHTML = element.innerHTML;
      }
      var parent = element.parentElement;
      parent.parentElement.replaceChild(newScript, parent);
  }

  ngAfterViewInit() {
      this.convertToScript();

  }
}

