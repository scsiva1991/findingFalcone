import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class DropDown extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      options: [],
      searchText: ''
    }
  }

  toggleShow = () => {
    this.setState({ show : !this.state.show});
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ options : nextProps.options });
  }

  onSelectOption = (key) => {
    this.toggleShow();
    this.props.onClick(key);
  }

  searchOption = (e) => {
    const searchText = e.target.value;
    let {options} = this.props;
    if(searchText) {
      options = options.filter(option => option.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    }
    this.setState({searchText, options});
  }

  buildOption = () => {
    let {options} = this.props;
    if( options.length === 0 ) {
      return (<a >No vehicle to choose for this planet distance</a>);
    }
    return (
      options.map((option, index) => <a key={index} onClick={() => this.onSelectOption(option.name)}>{option.name}</a>)
    )
  }

  render() {
    const { show, options, searchText } = this.state;
    console.log(this.state);
    return (
      <div className="dropdown">
        <button className="dropbtn" onClick={this.toggleShow}>{this.props.title}</button>
        <div id="myDropdown" className={`dropdown-content ${show ? 'show' : 'hide'}`}>
          <input type="text" placeholder="Type to Search..." className="searchBox"
          value={searchText} onChange={this.searchOption} />
          {
            this.buildOption()
          }
        </div>
      </div>
    )
  }
}