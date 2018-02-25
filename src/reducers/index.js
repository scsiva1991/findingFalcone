import * as constants from '../util/constants';
import {combineReducers} from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

const initialState = { 
  planetList : [],
  vehicleList : [],
  token: '',
  result: {}
};

const falconeReducer = (state = initialState, action) => {
    switch(action.type) {
      case constants.LOAD_PLANETS_API:
      case constants.LOAD_VEHICLES_API:
      case constants.GET_TOKEN_API:
      case constants.FIND_FALCONE_API:
        return  {
          ...state,
          isLoading: true
        };
      case constants.LOAD_PLANETS_API_SUCCESS:
        return  {
          ...state,
          planetList: action.planetList,
          isLoading: false
        };
      case constants.LOAD_PLANETS_API_FAILURE:
        return  {
          ...state,
          planetList: [],
          isLoading: false
        };
      case constants.LOAD_VEHICLES_API_SUCCESS:
        return  {
          ...state,
          vehicleList: action.vehicleList,
          isLoading: false
        };
      case constants.LOAD_VEHICLES_API_FAILURE:
        return  {
          ...state,
          vehicleList: [],
          isLoading: false
        };
      case constants.GET_TOKEN_API_SUCCESS:
        return {
          ...state,
          isLoading: false,
          token: action.token
        }
      case constants.GET_TOKEN_API_FAILURE:
        return {
          ...state,
          isLoading: false,
          token: ''
        }
      case constants.FIND_FALCONE_API_SUCCESS:
        return {
          ...state,
          isLoading: false,
          result: action.result
        }
      case constants.FIND_FALCONE_API_FAILURE:
        return {
          ...state,
          isLoading: false,
          result: action.result
        }
      default: 
        return state;
    }
}

const rootReducer = combineReducers({
  falconeReducer,
  toastr: toastrReducer
})

export default rootReducer