import { DetailsFacadeService } from "./../services/details-facade.service";
import { Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { LaunchDetailsGQL } from "../services/spacexGraphql.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent implements OnInit {
  launchId: string;
  launchDetails$: Observable<any>;
  thumbnailOffset: number;
  imagesCount: number;
  mainImage: string;
  launchImages: string[]; 

  constructor(
    private readonly route: ActivatedRoute, 
    private readonly detailsFacade: DetailsFacadeService
    ) {}

  ngOnInit() {
    // get the id for the launch and set the variables for the view: details, images and finally the offset for the thumbnails to 0
    this.route.paramMap.subscribe(paramMap => { this.launchId = paramMap.get('id'); });
    this.launchDetails$ = this.detailsFacade.launchDetailsFacade(this.launchId); // TODO: implement the StoreCache in effects
    this.launchDetails$.subscribe(launch => this.setLaunchImages(launch.links.flickr_images));
    this.thumbnailOffset = 0;
  }

  setLaunchImages(images): void {
    // if there are no images for the launch, set a dummy image with an empty string as "src" in order to display the "alt" attribute
    if (images.length == 0) {
      this.mainImage = "";
      this.launchImages = [""];
      this.imagesCount = 1;
      return;
    }

    // ...otherwise- set the images for the gallery
    this.mainImage = images[0];
    this.launchImages = images;
    this.imagesCount = images.length;
  }
  
  // changes the offset for the visible thumbnails based on which slide-button (arrow) was clicked
  slideThumbnails(direction) {
    if (direction == 'left') { this.thumbnailOffset--; } else if (direction == 'right') { this.thumbnailOffset++; }
  }

  // changes the main image based on a click on a thumbnail
  changeMainImage() {
    this.mainImage = (event.currentTarget as HTMLLIElement).children[0].getAttribute('src');
  }
}
