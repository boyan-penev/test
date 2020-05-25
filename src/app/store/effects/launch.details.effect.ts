import { LaunchDetailsGQL } from "./../../services/spacexGraphql.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  loadLaunchDetails,
  loadLaunchDetailsFail,
  loadLaunchDetailsSuccess
} from "../actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class DetailsEffects {
  constructor(
    private actions$: Actions,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) {}
    // TODO create effect for caching  
}
