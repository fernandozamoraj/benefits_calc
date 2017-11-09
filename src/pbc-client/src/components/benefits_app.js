import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import Validator from '../util/validate_member';
import AddMember from './add_member';
import MemberList from './member_list';
import CalculationResults from './calculation_results';
import round from '../util/round_money';

class BenefitsApp extends Component{

    constructor(props){
        super(props);
        this.state = {members: [], results: {}, open: false };
    }

    render(){
        return (
            <div>
                <AddMember 
                   onAddedMember={this.handleAddedMember.bind(this)} 
                   onRunCalculations={this.handleRunCalculations.bind(this)}
                   closeDrawer={this.handleCloseDrawer.bind(this)}
                   members={this.state.members} />

                <Drawer  width={500} openSecondary={true} open={this.state.open} >
                    <AppBar title="Calculation Results" />
                    <CalculationResults results={this.state.results} />
                </Drawer>
            </div>
        );
    }

    handleCloseDrawer(){
        this.setState({open: false});
    }

    handleAddedMember(member){
        const results = Validator.validateMember(member, this.state.members);
        if(results.isValid){
          //slice array to avoid modify the original array
          let newMembers = this.state.members.slice();
          newMembers.push(member);
          this.setState( (oldState) => {
            return {
              members: newMembers
            }
          });
        }
        else{
            //TODO: update invalid state
            //TODO: remove console logs
            console.log('Member is not valid');
            console.log(results);
        }
    }

    setResults(results){
        this.setState({
            results: {
                EmployeeName: results.EmployeeName,
                FamilyMembers: results.Family.Members.length,
                AnnualSalary: round(results.AnnualSalary, 2),
                AnnualCosts: round(results.AnnualCosts, 2),
                EmployerDiscounts: round(results.EmployerDiscounts, 2),
                AdjustedPeriodPayAmount: round(results.AdjustedPeriodPayAmount, 2),
                PerPeriodCosts: round(results.PerPeriodCosts, 2)
            }
        })
    }

    handleRunCalculations(){
        const results = Validator.validateEmployeeExists(this.state.members);
        if(results.isValid) {
            //api is a different application
            //you must run the application and
            //set the "proxy" property in the package.json file
            //for this project to that (e.g. "proxy": "http://localhost:3002")
            axios.post('api/benefitsApi/', {
                Members: this.state.members
           })
           .then((data) => {
               this.setResults(data.data[0]);
               this.setState({open: true});
           })
           .catch((err) => {
               //TODO: change these alerts to something more aesthetic
               alert("Error trying to request calculations from server");
               alert(err);
               console.log('Error from post to benefitsApi');
               console.log(err);
           })
        }
        else{            
            //TODO: update GUI with message that 
            //request cannot be processed
            //TODO: change alert to validation on form
            alert(results.message);
            console.log(results.message);
        }
    }
}

export default BenefitsApp;