import { Component, OnInit, Renderer2 } from '@angular/core';
import { faCoffee, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { faFacebookSquare, faGithubSquare, faSoundcloud, faTwitterSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { ViewChild, AfterViewInit, ElementRef } from "@angular/core";


export interface SCData {
  id: number,
  title: string,
  uri: string,
  tracks: [{
    id: number,
    duration: number,
    stream_url: string,
    title: string,
    user: { username: string },
    artwork_url: string
  }
  ],
  Widget: string,
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  faCoffee = faCoffee;
  faFacebookSquare = faFacebookSquare;
  faGithubSquare = faGithubSquare;
  faSoundcloud = faSoundcloud;
  faTwitterSquare = faTwitterSquare;
  faInstagramSquare = faInstagramSquare;
  faEnvelopeOpenText = faEnvelopeOpenText;
  window: any;
  widgetPendingRequest: boolean = false;
  SC : any = {};
  viewIsReady = false ;
  widgetGetters = ["getVolume", "getDuration", "getPosition", "getSounds", "getCurrentSound", "getCurrentSoundIndex", "isPaused"];


  @ViewChild("scFrame", { static: false }) scFrame: ElementRef;

  test01() {
    // this.scFrame.nativeElement.contentWindow.postMessage('{"method":"toggle"}', "https://w.soundcloud.com/player/");
    //this.widgetCall.event
    this.SC.widget1.play();
    
  }

  test02() {
    this.scFrame.nativeElement.contentWindow.postMessage('{"method":"getVolume","value":null}', "https://w.soundcloud.com/player/")
  }

  test03() {
    console.log("this.SC.widget1.getVolume.value : ",this.SC.widget1.getVolume.value)
  }
  
  playWidget() {
    this.scFrame.nativeElement.contentWindow.postMessage('{"method":"play"}', "https://w.soundcloud.com/player/")
  }

  loadWidget() {
    this.scFrame.nativeElement.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1283303590&auto_play=true&show_teaser=false"
      ;
  }

  onReceiveWidgetMessage() {
    this.renderer.listen('window', 'message', (event) => {

      if (event.origin !== 'https://w.soundcloud.com') { // Warning : event.origin can change with SoundCloud updates
        console.log('data received from iframe with origin :', event.origin)
        //console.log(event)
        // to do : gérer les getters et les events (et tout mettre dans une matrice ? un observable ?) : analyser l'origine, parser event.data, analyser dataParsed.widgetId et dataParsed.method et répartir
        // quand on répartit, si on est inscrit à tel ou tel observable, il s'active lorsque sa valeur est mise à jour
        // https://advancedweb.hu/how-to-use-async-await-with-postmessage/
        return;
      }
      else {
        const widgetData = JSON.parse(event.data);
        console.log('data received from trusted source :', widgetData);
        const widgetGetters = ["getVolume", "getDuration", "getPosition", "getSounds", "getCurrentSound", "getCurrentSoundIndex", "isPaused"];

          for (const property in this.SC) {
            if (event.source===this.SC[property].source()) {
              console.log("message recu du widget intitulé :",property)
              for (const p of widgetGetters) {
                  if (p==widgetData.method) {
                    this.SC[property][widgetData.method].value=widgetData.value;
                    return
                  }
              }
              if (widgetData.value==null) this.SC[property].event[widgetData.method].value=Date.now();
              else this.SC[property].event[widgetData.method].value=widgetData.value;
              return
            }
          }
          // to do : répartition : 
          // après une demande de getter ou d'event par postMessage le widget renvoie ce genre de réponse:
          // {"widgetId":"widget_1638384274075","method":"getVolume","value":100}
          // {"widgetId":"widget_1638468970545","method":"ready","value":null}
          // idée 1 : remplir un objet (avec un callback qui s'active en cas de MAJ) associé au widget -> W[method]=value
          //        : pas besoin de callback/observable si les infos sont bindées dans le template -> c'est un option
      }
    });
  }
  // to do : 
  // https://stackoverflow.com/questions/1634268/explain-the-encapsulated-anonymous-function-syntax
  // https://www.w3schools.com/js/js_objects.asp
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Working_with_Objects
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array


  // to do : 
  // gérer la réception unique du message du getter
  // gérer les receptions des events jusqu'a ce qu'on s'y désinscrive
  // gérer les subscription aux events et aux getters et essayer d'y intégrer les promesses ou les observables
  //  ex : {"method":"addEventListener","value":"pause"} et {"method":"removeEventListener","value":"pause"}
  // gérer plusieurs instances de widget
  // gérer l'evênement "ready" 
  ngAfterViewInit() { // to do : lifecycle hook problem : https://stackoverflow.com/questions/43375532/expressionchangedafterithasbeencheckederror-explained
    this.onReceiveWidgetMessage();
    this.widgetConstructor(this.scFrame,"widget1");
    this.viewIsReady = true;

  }

  widgetConstructor(elRef : ElementRef,n : string) {
    
    this.SC[n]= {};
    this.SC[n].event = {};
    this.SC[n].source = () => {return elRef.nativeElement.contentWindow};

    const widgetFunctions = ["play", "pause", "toggle", "seekTo", "setVolume", "next", "prev", "skip"];
    widgetFunctions.forEach(e => {
      this.SC[n][e] = () => {
        elRef.nativeElement.contentWindow.postMessage('{"method":"' + e + '"}', "https://w.soundcloud.com/player/");
      }
    });

    const widgetGetters = ["getVolume", "getDuration", "getPosition", "getSounds", "getCurrentSound", "getCurrentSoundIndex", "isPaused"];
    widgetGetters.forEach(e => {
      this.SC[n][e] = () => {
        elRef.nativeElement.contentWindow.postMessage('{"method":"' + e + '","value":null}', "https://w.soundcloud.com/player/");
      }
      this.SC[n][e]["value"]="";
    });

    const widgetEvents = ["loadProgress", "playProgress", "play", "pause", "finish", "seek", "ready", "sharePanelOpened", "downloadClicked", "buyClicked", "error",];
    widgetEvents.forEach(e => {
      this.SC[n].event[e] = (b : boolean) => {
        if (b)
          elRef.nativeElement.contentWindow.postMessage('{"method":"addEventListener","value":"' + e + '"}', "https://w.soundcloud.com/player/");
        else
          elRef.nativeElement.contentWindow.postMessage('{"method":"removeEventListener","value":"' + e + '"}', "https://w.soundcloud.com/player/");
      }
      this.SC[n].event[e]["value"]="";
    });
  }

  constructor(
    private renderer: Renderer2,
  ) {

    }


}
// TO do : https://angularquestions.com/2020/10/27/angular-property-xxx-does-not-exist-on-type-window-typeof-globalthis/
/*
1. envoyer un message :
document.getElementById('soundcloud_widget').contentWindow.postMessage('{"method":"play"}',"https://w.soundcloud.com/player/"
document.getElementById('soundcloud_widget').contentWindow.postMessage('{"method":"getSounds","value":null}',"https://w.soundcloud.com/player/")

2. recevoir un message
window.onmessage = (event) => {
    console.log(`Message reçu: ${event.data}`);
};
3. parser et filtrer le message avec if JSON.parse(event.data).method="getSounds" alors le message est valide

4. mapper toutes les fonctions utiles
utiliser l'espion ligne 105 et 106 de test2.html

5. appliquer à angular
https://stackoverflow.com/questions/40764995/angular2-issue-getting-iframe-contentwindow-successfully-and-error-calling-pos

 */
