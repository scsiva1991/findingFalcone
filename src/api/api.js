import axios from 'axios';

export default class api {
  static getPlanets() {
    const url = 'https://findfalcone.herokuapp.com/planets';
    return axios.get( url ).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

  static getVehicles() {
    const url = 'https://findfalcone.herokuapp.com/vehicles';
    return axios.get( url ).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

  static getToken() {
    const url = 'https://findfalcone.herokuapp.com/token';
    return axios.post(url, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    }).then(response => {
        return response;
      }).catch(error => {
        return error;
      });
  }

  static findFalcone( falcone ) {
    const url = 'https://findfalcone.herokuapp.com/find';
    return axios.post(url, JSON.stringify(falcone) , {
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    }).then(response => {
        return response;
      }).catch(error => {
        return error;
      });
  }
}