import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('id');
    
    //gets track data
    this.spotifyService.getTrack(this.trackId).then((data) => {
      this.track = data;
    });

    // gets audio features
    let features= [];
    this.spotifyService.getAudioFeaturesForTrack(this.trackId).then((data) => {
      for(var i = 0; i<data.length; i++){
        if(TrackFeature.FeatureTypes.indexOf(data[i].name) >= 0)
          features.push(data[i]);
      }
      this.audioFeatures = features;
   
    });
    

  	//TODO: Inject the spotifyService and use it to get the track data and it's audio features
  }

}
