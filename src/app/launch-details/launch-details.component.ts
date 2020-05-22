import { Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { LaunchDetailsGQL } from "../services/spacexGraphql.service";
declare let $: any;

@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL
    ) {}

  ngOnInit() {
    // jQuery functions to implement the thumbnail slider and the loading of the main image on click
    // TODO: solve through angular instead
    $(document).ready(function(){

      // dirty fix to wait for angular to finish loading 
      setTimeout(function(){ 

        // slides the thumbnails by hiding all at first and then showing those between the offset and offset + 3
        function slideWrapper(offset) {
          console.log($thumbnails);
          $thumbnails.hide().filter(index => index >= offset && index < offset + 3).show();
        }

        // clone the clicked thumbnail and load it in the main image area
        $('.thumbnail-wrapper').click(function(){
          let $changeImage = $(this).children("img").clone();

          $('.gallery-image').html('').append($changeImage)
          $('gallery-image img').attr('src', $(this).children('img').attr('src'));
        });

        let imageCount = 0; 
        let thumbnailOffset = 0; // keeps the offset for the thumbnail-slider
        let $thumbnails = $('.thumbnail-wrapper'); 

        // count the available images for the current launch
        $thumbnails.map(function(){
          if ($(this).data('number') > imageCount) {imageCount = $(this).data('number');}
        });

        // all thumbnails are initially hidden, so run the slideWrapper once with zero offset to show the first (max. three) thumbnails
        slideWrapper(thumbnailOffset);

        // disable the right arrow in the beginning if there are no more than three images
        if (imageCount <= 3) {
          $('#thumbnails-slide-right').addClass('disabled');
        }

        // click on the left arrow
        $('#thumbnails-slide-left').click(function(){
          if ($(this).hasClass('disabled')) { return false; }

          slideWrapper(--thumbnailOffset);

          // check if the left or right arrow need to be enabled/disabled because of the thumbnail range
          if (thumbnailOffset == 0) {$(this).addClass('disabled')};
          if (thumbnailOffset == imageCount - 3) {
            $('#thumbnails-slide-right').addClass('disabled');
          } else {
            $('#thumbnails-slide-right').removeClass('disabled');
          } 
        });

        // click on the right arrow
        $('#thumbnails-slide-right').click(function(){
          if ($(this).hasClass('disabled')) { return false; }

          slideWrapper(++thumbnailOffset);

          // check if the left or right arrow need to be enabled/disabled because of the thumbnail range
          $('#thumbnails-slide-left').removeClass('disabled');
          if (thumbnailOffset == imageCount - 3) {$(this).addClass('disabled');}
        });
      }, 1000);
    });
  }

  launchDetails$ = this.route.paramMap.pipe(
    map(params => params.get("id") as string),
    switchMap(id => this.launchDetailsService.fetch({ id })),
    map(res => res.data.launch)
    );
}
