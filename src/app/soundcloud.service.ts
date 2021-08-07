import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface SoundcloudData {
  id: number,
  title: string,
  uri: string,
  tracks:[{
    id:number,
    duration:number,
    stream_url:string,
    title:string,
    user:{username:string}
  }
]
}


export interface SoundcloudTrackData {
  http_mp3_128_url: string;

}

@Injectable({
  providedIn: 'root'
})
export class SoundcloudService {

  public SoundcloudTracks : SoundcloudData[];
  private SoundcloudUserUrl = 'https://api.soundcloud.com/users/14341196/playlists?client_id=31478aadfa8f9db41f03ffb13b43a57d';  // URL to Soundcloud web api
  public tempid : number;
  public SoundcloudTrackStreamUrl : SoundcloudTrackData;
  public SoundcloudTrackUrl = '';  // URL to Soundcloud web api
  public tempResponse: SoundcloudTrackData;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/html' }) //or json
  };
  dataSource =[];


  constructor(private http: HttpClient) {

    this.getSoundcloudTracks().subscribe(n=>{
      this.SoundcloudTracks=n;
      this.tempid= this.SoundcloudTracks[0].tracks[0].id;
      this.SoundcloudTrackUrl = 'https://api.soundcloud.com/tracks/'+this.tempid+'/streams?client_id=31478aadfa8f9db41f03ffb13b43a57d';
      this.getSoundcloudTrackStreamUrl().subscribe(n=>{this.tempResponse= n;console.log(this.tempResponse);});
    
      this.dataSource = this.SoundcloudTracks[0].tracks.map(obj => {
        var rObj = {};
        rObj["title"] = obj.title;
        rObj["link"] = obj.stream_url+'?client_id=31478aadfa8f9db41f03ffb13b43a57d';
        rObj["duration"] = obj.duration;
        rObj["artist"] = obj.user.username;
        return rObj;
      });
      this.dataSource.splice(-1); //delelete the last item that is "setter"
    
    });
    // TO DO : do something with the SoundcloudTracks array
   }

  getSoundcloudTracks() : Observable<SoundcloudData[]>{
    console.log('getting SoundcloudTracks')
    return this.http.get<SoundcloudData[]>(this.SoundcloudUserUrl)
      .pipe(
        tap(_ => console.log('fetched SoundcloudTracks')),
        catchError(this.handleError<SoundcloudData[]>('getSoundcloudTracks'))
      );
  }

  
  getSoundcloudTrackStreamUrl() : Observable<SoundcloudTrackData>{
    console.log('getting SoundcloudTrackStreamUrl')
    return this.http.get<SoundcloudTrackData>(this.SoundcloudTrackUrl)
      .pipe(
        tap(_ => console.log('fetched SoundcloudTrackStreamUrl')),
        catchError(this.handleError<SoundcloudTrackData>('getSoundcloudTrackStreamUrl'))
      );
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
