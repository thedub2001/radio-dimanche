import { BehaviorSubject, Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface MixcloudData {
  data: {};
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class MixcloudService {

  public MixcloudUserPlaylists: MixcloudData | undefined;
  public mixcloudPlaylistsTracksArray=[];
  public mixcloudPlaylistsContent=[];
  private MixcloudUserPlaylistUrl = 'https://api.mixcloud.com/spartacus/playlists/';  // URL to Mixcloud web api
  public tempArray;
  public init : boolean =  true; // needed in varListener method
  private ready = new BehaviorSubject<boolean>(false); // https://stackoverflow.com/a/42100443
  ready$ = this.ready.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/html' }) //or json
  };

  constructor(private http: HttpClient) {       //private or public ?
    
    this.varListener.pendingGet=0;
    this.getMixcloudUserPlaylists().subscribe(n=>{
      this.MixcloudUserPlaylists={data: n.data,name:n.name};
      this.tempArray=this.MixcloudUserPlaylists.data
      this.tempArray.forEach(function (value: any,item:number) {
        // console.log(value.url);
        this.mixcloudPlaylistsContent.push(this.tempArray[item])

        let tempUrl = value.url.replace("www.mixcloud.com","api.mixcloud.com")
        this.getMixcloudPlaylistContent(tempUrl+"cloudcasts/").subscribe((n: any)=>{
          this.mixcloudPlaylistsTracksArray.push(...n.data);
          // console.log("item : ", item);

          this.mixcloudPlaylistsContent[item].tracks=n.data;

          // console.log(this.mixcloudPlaylistsTracksArray);
          // WARNING : verify that the last PlaylistContent is pushed before populating the HTML #playlist in main component
          this.varListener.pendingGet=this.varListener.pendingGet-1;

        })
      },this); 

      // the second argument ",this" allows the script to transfer the scope from general to the forEach function
    
    });
    }

  getMixcloudUserPlaylists() {
    console.log('getting MixcloudUserPlaylists')
    return this.http.get<MixcloudData>(this.MixcloudUserPlaylistUrl)
      .pipe(
        tap(_ => console.log('fetched MixcloudUserPlaylists')),
        catchError(this.handleError<MixcloudData>('getMixcloudUserPlaylists'))
      );
  }

  // https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript
  // https://stackoverflow.com/questions/49467069/typescript-property-does-not-exist-on-type
  // https://stackoverflow.com/questions/63154806/is-there-any-chance-to-get-the-outer-scope-in-proxy
  varListener :any = new Proxy({}, {
    set:  (target, key, value) => {
        // console.log(`${String(key)} set to ${value}`);
        target[key] = value;
        if(!this.init && value==0) {
          // console.log("mixcloudPlaylistsTracksArray :", JSON.stringify(this.mixcloudPlaylistsTracksArray));
          this.fisherYates(this.mixcloudPlaylistsTracksArray);
          // console.log("randomized array : ", JSON.stringify(this.mixcloudPlaylistsTracksArray));
          this.ready.next(true);
        }
        if (this.init) this.init=false;
        return true;
    }
  });

  getMixcloudPlaylistContent(url) {
    console.log('getting MixcloudPlaylistContent')
    this.varListener.pendingGet=this.varListener.pendingGet+1;
    return this.http.get<MixcloudData>(url)
      .pipe(
        tap(_ => {console.log('fetched MixcloudPlaylistContent');}),
        catchError(this.handleError<MixcloudData>('getMixcloudPlaylistContent'))
      );
  }

  // randomization algorithm : http://sedition.com/perl/javascript-fy.html
  fisherYates ( myArray ) {
    var i = myArray.length;
    if ( i == 0 ) return false;
    while ( --i ) { 
      var j = Math.floor( Math.random() * ( i + 1 ) );
      var tempi = myArray[i];
      var tempj = myArray[j];
      myArray[i] = tempj;
      myArray[j] = tempi;
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
