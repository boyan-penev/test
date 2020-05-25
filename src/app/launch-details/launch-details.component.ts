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
    this.route.paramMap.subscribe(paramMap => { this.launchId = paramMap.get('id'); });
    this.launchDetails$ = this.detailsFacade.launchDetailsFacade(this.launchId);
    this.launchDetails$.subscribe(launch => this.setLaunchImages(launch.links.flickr_images));
    this.thumbnailOffset = 0;
  }

  setLaunchImages(images): void {
    this.mainImage = images[0];
    this.launchImages = images;
    this.imagesCount = images.length;
  }
  
  slideThumbnails(direction) {
    if (direction == 'left') { this.thumbnailOffset--; } else if (direction == 'right') { this.thumbnailOffset++; }
  }

  changeMainImage() {
    this.mainImage = (event.currentTarget as HTMLLIElement).children[0].getAttribute('src');
  }
}
