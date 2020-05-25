import { createAction, props } from "@ngrx/store";

export const loadLaunchDetails = createAction("[Launch] Load Launch Details");

export const loadLaunchDetailsSuccess = createAction(
  "[Launch] Load Launch Details Success",
  props<{ payload: any[] }>()
);

export const loadLaunchDetailsFail = createAction(
  "[Launch] Load Launch Details Fail",
  props<{ payload: any }>()
);

export type LaunchDetailsAction =
  | typeof loadLaunchDetails
  | typeof loadLaunchDetailsSuccess
  | typeof loadLaunchDetailsFail;
