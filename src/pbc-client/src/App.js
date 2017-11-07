import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import './App.css';
import AddMember from './components/add_member'
import Validator from './util/validate_member'
import MemberList from './components/member_list'


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

        <div className="App">
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <AppBar title="Benefits Calculator" />
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <AddMember onAddedMember={this.handleAddedMember.bind(this)}></AddMember>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <MemberList familyMembers={this.state.members}/>
          </MuiThemeProvider>
        </div>     
      
    );
  }

  handleAddedMember(member){
    
        let results = Validator.validateMember(member, this.state.members);
    
        if(results.isValid){

          let newMembers = this.state.members.slice();
          newMembers.push(member);

          this.setState(oldState => {
            return {
              members: newMembers
            }
          });
        }
        else{
          console.log('Member is not valid');
          console.log(results);
        }
      }
}

export default App;
