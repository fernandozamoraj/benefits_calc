import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import './App.css';
import BenefitsApp from './components/benefits_app';

/**
 * Overall root level component of the application
 */
class App extends Component {

  constructor(props){
    super(props);
    this.state = {members: [], results: {} };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper>
          <div className="App">   
              <BenefitsApp />
          </div>
        </Paper>       
      </MuiThemeProvider>      
    );
  }
}

export default App;
