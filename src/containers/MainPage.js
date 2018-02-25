import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import DropDown from '../components/DropDown';
import { Button, Row, Col, Table } from 'react-bootstrap';
import * as actions from '../actions';
import { toastr } from 'react-redux-toastr';
import { MESSAGES } from '../util/constants';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

const mapStateToProps = (state) => ({
  planetList: state.falconeReducer.planetList,
  vehicleList: state.falconeReducer.vehicleList,
  token: state.falconeReducer.token,
  result: state.falconeReducer.result
})

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      planetList : [],
      vehicleList: [],
      selectedList: [],
      planets: [],
      vehicles: [],
      totalTime: 0,
      planetDistance: 0,
      vehicleDistance: 0,
      selectedPlanet: 'Click to select a planet',
      selectedVehicle: 'Click to select a vehicle'
    }
  }

  componentWillMount() {
    //To fetch planet list
    this.props.getPlanets().then(() => {
      //console.log('@@@@@@', this.props.planetList); 
      const planets = this.props.planetList.map(planet => planet.name);
      this.setState({planetList: this.props.planetList});
    }, () => {
      toastr.error(MESSAGES.PLANET_LIST_EMPTY)
    });

    //To fetch vehicle list
    this.props.getVehicles().then(() => {
      //console.log('@@@@@@', this.props.vehicleList);
      const vehicles = this.props.vehicleList.map(vehicle => `${vehicle.name} (${vehicle.total_no}) `);
      this.setState({vehicleList: this.props.vehicleList}); 
    }, () => {
      toastr.error(MESSAGES.VEHICLE_LIST_EMPTY)
    });
  }

  //Validate vehicle based on distance and availability
  checkForVechicleDistance = (vehicle) => {
    const { selectedList } = this.state;
    return selectedList.filter(sv => sv.vehicle === vehicle.name).length < vehicle.total_no
  }

  onSelectPlanet = (name) => {
    const { selectedList } = this.state;
    const selectedPlanet = selectedList.filter(planet => planet.planet === name);
    if(selectedPlanet.length > 0) {
      toastr.error(MESSAGES.PLANET_ALREADY_EXISTS);
      return;
    }
    const planet = this.props.planetList.filter(pl => pl.name === name);
    let { vehicleList } = this.props;
    vehicleList = vehicleList.filter(vehicle => (vehicle.max_distance >= planet[0].distance && this.checkForVechicleDistance(vehicle)));
    this.setState({
      selectedPlanet: planet[0].name,
      planetDistance: planet[0].distance,
      vehicleList,
      selectedVehicle: 'Click to select a vehicle',
      vehicleDistance: 0
    });
  }

  onSelectVehicle = (name) => {
    const {selectedPlanet} = this.state;
    if(selectedPlanet === 'Click to select a planet') {
      toastr.error(MESSAGES.SELECT_PLANET);
      return;
    }
    const vehicle = this.props.vehicleList.filter(vh => vh.name === name);
    this.setState({selectedVehicle: name, vehicleDistance: vehicle[0].max_distance});
  }

  addToArmy = () => {
    let { selectedList, selectedVehicle, selectedPlanet, totalTime  } = this.state;
    if(selectedPlanet === 'Click to select a planet' || selectedVehicle === 'Click to select a vehicle') {
      toastr.error(MESSAGES.PLEASE_CHECK_SELECTION);
      return;
    }
    
    const vehicle = this.props.vehicleList.filter(vh => vh.name === selectedVehicle);
    const timeTaken = vehicle[0].max_distance/ vehicle[0].speed;
    const selectedArmy = {
      planet: selectedPlanet,
      vehicle: selectedVehicle,
      timeTaken
    };
    totalTime += timeTaken;
    selectedList.push(selectedArmy);
    this.setState({
      selectedList,
      totalTime,
      selectedPlanet: 'Click to select a planet',
      selectedVehicle: 'Click to select a vehicle',
      planetDistance: 0,
      vehicleDistance: 0
    });
  }

  deleteArmy = (key) => {
    let { selectedList, totalTime } = this.state;
    totalTime -= selectedList[key].timeTaken;
    selectedList = selectedList.filter((army, index) => index !== key);
    this.setState({
      selectedList,
      totalTime
    })
  }

  tableBody = () => {
    const { selectedList } = this.state;
    return (
      selectedList.map((army, index) => {
        return(
          <tr key={index}>
            <td>{army.planet}</td>
            <td>{army.vehicle}</td>
            <td>{army.timeTaken}</td>
            <td><i className="fa fa-close" onClick={() => this.deleteArmy(index)}/></td>
          </tr>
        )
      })
    )
  }

  onSubmit = () => {
    let { selectedList } = this.state;
    let falcone = {}, planets = [], vehicles = [];
    selectedList.map(army => {
      planets.push( army.planet );
      vehicles.push( army.vehicle );
    });
    this.props.getToken().then(() => {
      falcone.token = this.props.token;
      falcone.planet_names = planets;
      falcone.vehicle_names = vehicles;
      this.props.findFalcone( falcone ).then(() => {
        if( this.props.result === undefined || this.props.result.error ) {
          toastr.error(MESSAGES.PLEASE_TRY_AGAIN)
        } else {
          this.props.history.push(`/result/${this.state.totalTime}`);
        }
      }, () => {
        toastr.error(MESSAGES.PLEASE_TRY_AGAIN)
      });
    }, () => {
      toastr.error(MESSAGES.TOKEN_ERROR)
    });
  }

  render() {
    //console.log('!!!!!!!!!!', this.props);
    const {planetDistance, vehicleDistance, totalTime, planetList, vehicleList,
      selectedPlanet, selectedVehicle, selectedList} = this.state;
    return( 
      <div className="container m_t_100">
        {
          selectedList.length < 4 &&
          <Row>
            <Col xs={12} md={4} className="m_t_10"> 
              <DropDown title={selectedPlanet} options={planetList} onClick={this.onSelectPlanet}/>
              { planetDistance > 0 &&
                <span>{selectedPlanet} is at distance of {planetDistance} from Lengaburu</span>
              }
            </Col>
            <Col xs={12} md={4} className="m_t_10">
              <DropDown title={selectedVehicle} options={vehicleList} onClick={this.onSelectVehicle}/>
              { vehicleDistance > 0 &&
                <span>{selectedVehicle} can cover a distance of {vehicleDistance}</span>
              }
            </Col>
            <Col xs={12} md={4} className="m_t_10 text-center">
              <Button bsStyle="success" className="btn_add" onClick={this.addToArmy}>Add To My Army</Button>
            </Col>
          </Row>
        }
        <Row className="m_t_100">
          
          {
            selectedList.length > 0 &&
            <Table striped bordered condensed hover responsive className="armyTable">
              <thead>
                <tr>
                  <th>Planet</th>
                  <th>Vehicle</th>
                  <th>Time Taken</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.tableBody()}
                {
                  <tr>
                    <td/>
                    <td/>
                    <td > Total Time: {this.state.totalTime}</td>
                    <td/>
                  </tr>
                }
              </tbody>
            </Table>
            
          }
          {
            selectedList.length > 0 &&
            <Col xs={12} className="text-center">
              <Button bsStyle="success" onClick={this.onSubmit}
              disabled={selectedList.length < 4}>
                Find Falcone!
              </Button>
            </Col>
          }
        </Row>
      </div>  
    )
  }
}

MainPage.prototypes = {
  planetList: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);