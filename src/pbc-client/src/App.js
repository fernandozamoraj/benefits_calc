import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import './App.css';
import AddMember from './components/add_member';
import Validator from './util/validate_member';
import MemberList from './components/member_list';
import BenefitsApp from './components/benefits_app';


const muiTheme = getMuiTheme({

  appBar: {
    height: 50,
  },
});

class App extends Component {

  constructor(props){
    super(props);
    this.state = {members: [], results: {} };
  }

  render() {
    return (

      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">   
            <BenefitsApp />
        </div>     
      </MuiThemeProvider>
      
    );
  }
}

export default App;
