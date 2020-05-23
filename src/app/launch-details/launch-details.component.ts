import { Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { LaunchDetailsGQL } from "../services/spacexGraphql.service";
@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent implements OnInit {
  thumbnailOffset: number;
  imagesCount: number;
  mainImage: string;
  launchImages: string[]; 

  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL
    ) {}

  ngOnInit() {
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

    launchDetails$ = this.route.paramMap.pipe(
      map(params => params.get("id") as string),
      switchMap(id => this.launchDetailsService.fetch({ id })),
      map(res => res.data.launch)
      );
  }
