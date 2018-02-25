import React, {Component} from 'react';
import ReactDOM from 'react-dom'; 
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'; 
import { Button, Row, Col } from 'react-bootstrap';
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



class Result extends Component {

  constructor(props) {
    super(props);
  }

  showResult = () => {
    if(this.props.result.status === 'success' ) {
      return (
        <div >
          <h1>
            Success!! Congratulations on finding Falcone.
          </h1>
          <div>
            <h4>Total Time Taken: {this.props.match.params.time}</h4>
            <h4>Planet Found: {this.props.result.planet_name}</h4>
          </div>
        </div>
      )
    }
  
    return (
      <h1>
        Sorry. You could not find Falcone. Better luck next time.
      </h1>
    )
  }

  goBack = () => {
    this.props.history.push('/');
  }

  render() {
    console.log('--- result props --', this.props);
    return(
      <div className="container result_container">
        {this.showResult()}
      
        
        <Button bsStyle="success" onClick={this.goBack}>
          Start Again!
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);