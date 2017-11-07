import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import './App.css';
import AddMember from './components/add_member'
import Validator from './util/validate_member'
import MemberList from './components/member_list'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {members: [], results: {} };
  }

  render() {
    return (

        <div className="App">
          <MuiThemeProvider>
            <AppBar title="Benefits Calculator" />
          </MuiThemeProvider>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>

          <MuiThemeProvider>
            <AddMember onAddedMember={this.handleAddedMember.bind(this)}></AddMember>
          </MuiThemeProvider>

          <MuiThemeProvider>
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
