import { BehaviorSubject, Observable, of } from 'rxjs';

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
// playlistTracksData is not used but could be
export interface playlistTracksData {
  tracks: [
    {
      id:number,
      duration:number,
      stream_url:string,
      title:string,
      user:{username:string}
    }
  ];
}

@Injectable({
  providedIn: 'root'
})
export class SoundcloudService {
  public soundcloudPlaylists : SoundcloudData[];
  public soundcloudPlaylistsTracksArray=[];

  private soundcloudUserPlaylistsUrl = 'https://api.soundcloud.com/users/14341196/playlists?client_id=31478aadfa8f9db41f03ffb13b43a57d';  // URL to Soundcloud web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/html' }) //or json
  };

  dataSource =[];

  constructor(private http: HttpClient) {

    this.getSoundcloudUserPlaylists().subscribe(n=>{
      this.soundcloudPlaylists=n;
      this.soundcloudPlaylists.forEach(function (value: any,item:number) {
        // console.log(value.url);
        var playlistTitle=value.title;
        value.tracks.forEach(function (value: any,item:number) {
          this.soundcloudPlaylistsTracksArray.push({
            title:value.title,
            link:value.stream_url+'?client_id=31478aadfa8f9db41f03ffb13b43a57d',
            duration:value.duration,
            artist:value.user.username,
            playlistTitle:playlistTitle
          })
        },this);

      },this); 

      this.fisherYates(this.soundcloudPlaylistsTracksArray);
      this.dataSource = this.soundcloudPlaylistsTracksArray;
      /* 
      // Interesant example of maping an array
      this.dataSource = this.soundcloudPlaylists[3].tracks.map(obj => {
        var rObj = {};
        rObj["title"] = obj.title;
        rObj["link"] = obj.stream_url+'?client_id=31478aadfa8f9db41f03ffb13b43a57d';
        rObj["duration"] = obj.duration; // duration is not used by the player...
        rObj["artist"] = obj.user.username;
        return rObj;
      }); */


      this.dataSource.splice(-1); //ATTENTION : necessary ? delelete the last item that is "setter"
    
    });
   }

  getSoundcloudUserPlaylists() : Observable<SoundcloudData[]>{
    console.log('getting soundcloudUserPlaylists')
    return this.http.get<SoundcloudData[]>(this.soundcloudUserPlaylistsUrl)
      .pipe(
        tap(_ => console.log('fetched soundcloudUserPlaylists')),
        catchError(this.handleError<SoundcloudData[]>('getSoundcloudUserPlaylists'))
      );
  }
  
  getSoundcloudPlaylisTracks(playlistName : string) : any {
    const tempPlaylistTracks=this.soundcloudPlaylists.find(p=>p.title===playlistName)
    const playlistTracks = tempPlaylistTracks.tracks.map(obj => {
      var rObj = {};
      rObj["title"] = obj.title;
      rObj["key"] = obj.id;
      rObj["link"] = obj.stream_url+'?client_id=31478aadfa8f9db41f03ffb13b43a57d';
      rObj["artist"] = obj.user.username;
      rObj["duration"] = this.secondsToHms(obj.duration/1000);
      rObj["playlistTitle"] = playlistName;

      return rObj;
    });
    return playlistTracks;
  }

  secondsToHms(d:number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = (h>0)?this.checkTime(h):"";
    var hcolons = (h>0)?":":"";
    var mDisplay = this.checkTime(m);
    var sDisplay = this.checkTime(s);
    return hDisplay+hcolons+mDisplay+":"+sDisplay; 
  }

 checkTime(i:number) {
  return (i < 10) ? "0" + i : i;
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
