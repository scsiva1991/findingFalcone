import * as constants from '../util/constants';
import api from '../api/api';
import {store} from '../store/store';

export const loadPlanetsRequest = () => {
  return {type: constants.LOAD_PLANETS_API}
}

export function getPlanetsSuccess( data ) {
  return {type: constants.LOAD_PLANETS_API_SUCCESS, planetList: data };
}

export function getPlanetsFailure( ) {
  return {type: constants.LOAD_PLANETS_API_FAILURE, planetList: [] };
}

export const loadVehiclesRequest = () => {
  return {type: constants.LOAD_VEHICLES_API}
}

export function getVehiclesSuccess( data ) {
  return {type: constants.LOAD_VEHICLES_API_SUCCESS, vehicleList: data };
}

export function getVehiclesFailure( ) {
  return {type: constants.LOAD_VEHICLES_API_FAILURE, vehicleList: [] };
}

export const getTokenRequest = () => {
  return {type: constants.GET_TOKEN_API}
}

export function getTokenSuccess( data ) {
  return {type: constants.GET_TOKEN_API_SUCCESS, token: data };
}

export function getTokenFailure( ) {
  return {type: constants.GET_TOKEN_API_SUCCESS, token: '' };
}

export const getResult = () => {
  return {type: constants.FIND_FALCONE_API}
}

export function getResultSuccess( data ) {
  return {type: constants.FIND_FALCONE_API_SUCCESS, result: data };
}

export function getResultFailure(error) {
  return {type: constants.FIND_FALCONE_API_FAILURE, result: error };
}

export const getPlanets = () => {
  return dispatch => {
    dispatch(loadPlanetsRequest());
    return api.getPlanets().then(res => { 
      dispatch(getPlanetsSuccess(res.data));
    }).catch(error => {
      dispatch(getPlanetsFailure());
    });
  }
}

export const getVehicles = () => {
  return dispatch => {
    dispatch(loadVehiclesRequest());
    return api.getVehicles().then(res => {
      dispatch(getVehiclesSuccess(res.data));
    }).catch(error => {
      dispatch(getVehiclesFailure());
    });
  }
}

export const getToken = () => {
  return dispatch => {
    dispatch(getTokenRequest());
    return api.getToken().then(res => {
      dispatch(getTokenSuccess(res.data.token));
    }).catch(error => {
      dispatch(getTokenFailure());
    });
  }
}

export const findFalcone = ( falcone ) => {
  return dispatch => {
    dispatch(getTokenRequest());
    return api.findFalcone(falcone).then(res => {
      dispatch(getResultSuccess(res.data));
    }).catch(error => {
      dispatch(getResultFailure(error));
    });
  }
}