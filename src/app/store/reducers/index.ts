import { ActionReducerMap } from "@ngrx/store";
import * as fromLaunchList from "./launch-list.reducer";
import * as fromLaunchDetails from "./launch-details.reducer";

export interface LaunchListState {
  launchList: fromLaunchList.LaunchListState;
}

export interface LaunchDetailsState {
  launchDetails: fromLaunchDetails.LaunchDetailsState;
}

export const launchReducers: ActionReducerMap<LaunchListState, any> = {
  launchList: fromLaunchList.reducer
};

export const launchDetailsReducers: ActionReducerMap<LaunchDetailsState, any> = {
  launchDetails: fromLaunchDetails.reducer
};
