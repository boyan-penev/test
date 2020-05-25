import { createReducer, on } from "@ngrx/store";
import {
  LaunchDetailsAction,
  loadLaunchDetails,
  loadLaunchDetailsFail,
  loadLaunchDetailsSuccess
} from "../actions";

export type LaunchDetailsState = any;

const initialState: LaunchDetailsState = {
  data: [],
  loaded: false,
  loading: false,
  error: null
};

const launchDetailsReducer = createReducer(
  initialState,
  on(loadLaunchDetails, state => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(loadLaunchDetailsSuccess, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      loading: false,
      loaded: true
    };
  }),
  on(loadLaunchDetailsFail, (state, { payload }) => ({
    ...initialState,
    error: payload
  }))
);

export function reducer(
  state: LaunchDetailsState | undefined,
  action: LaunchDetailsAction
) {
  return launchDetailsReducer(state, action);
}
