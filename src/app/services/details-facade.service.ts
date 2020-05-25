import { LaunchDetailsState } from "./../store/reducers/launch-details.reducer";
import { map } from "rxjs/operators";
import { LaunchDetailsGQL } from "./spacexGraphql.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadLaunchDetails } from "../store/actions";
import * as launchDetailsQuery from "../store/selectors";

@Injectable({
  providedIn: "root"
})
export class DetailsFacadeService {

  launchDetailsState$ = this.store.select(launchDetailsQuery.getLaunchDetailsState); 
  launchDetails$ = this.store.select(launchDetailsQuery.getLaunchDetails);
  launchDetailsLoaded$ = this.store.select(launchDetailsQuery.getLaunchDetailsLoaded);
  launchDetailsLoading$ = this.store.select(launchDetailsQuery.getLaunchDetailsLoading);

  constructor(
    private readonly store: Store<LaunchDetailsState>,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) {}

  launchDetailsStoreCache(id: string) {
    this.store.dispatch(loadLaunchDetails());
    return this.launchDetails$;
  }

  launchDetailsFacade(launchId: string) {
    return this.launchDetailsService
      .fetch({ id: launchId })
      .pipe(map(res => res.data.launch));
  }
}
