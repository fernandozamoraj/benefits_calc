import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import Validator from '../util/validate_member';
import AddMember from './add_member';
import CalculationResults from './calculation_results';
import round from '../util/round_money';
import calculator from '../util/calculator';

/**
 * BenefitsApp - Top level component for the benefits application
 */
class BenefitsApp extends Component{

    constructor(props){
        super(props);
        this.state = {members: [], results: {}, open: false, dialogMessage: "", openDialog: false};
    }

    render(){        
        let messageBox = (
            <div/>
        )
        if(this.state.dialogMessage.length > 0){
            messageBox = this.getDialogBox();
        }
        return (
            <div>
                {messageBox}
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

    /**
     * handleOpenDialog - Handler for closing the dialog box
     */
    handleOpenDialog = (message) => {
        this.setState({dialogMessage: message})
        this.setState({openDialog: true});
    };
    
    /**
     * handleCloseDialog - Handler for close dialog click button
     */
    handleCloseDialog = () => {
        this.setState({openDialog: false});
    };
    
    /**
     * getDialogBox - Gets the JSX for displaying the dialog box
     * TODO: Separate this dialog box into a separate component
     */
    getDialogBox(){
        const actions = [
            <FlatButton
              label="OK"
              primary={true}
              onClick={this.handleCloseDialog}
            />,
        ];
    
        return (
            <div>
                <Dialog
                    title="Message"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleCloseDialog}
                    >
                    {this.state.dialogMessage}
                </Dialog>
            </div>
        );
    }

    /**
     * handleCloseDrawer - The calculation results
     * open in a drawer component.
     * This callback handles closing the drawer by
     * changing the state to closed.
     */
    handleCloseDrawer(){
        this.setState({open: false});
    }

    /**
     * handleAddedMember - Call back when member is added
     * @param {Member} member 
     */
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
        } else {
            this.handleOpenDialog(results.message);
        }        
        return results.isValid;
    }

    /**
     * Sets the calculation results after call
     * has been made to run calculations
     * @param {*CalculationResults} results 
     */
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

    /**
     * handleRunCalculations - Makes a call to web servie to run calcuations
     * If data is not valid it will not make the POST request.
     */
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
                this.setResults(data.data);
                this.setState({open: true});
            })
            .catch((err) => {
                this.handleOpenDialog("Error from POST... running calculations locally.");
                
                const data = calculator.runCalculations({ Members: this.state.members});
                this.setResults(data);
                this.setState({open: true});
            })
        } else {            
            this.handleOpenDialog(results.message);
        }
        return results.isValid;
    }
}

export default BenefitsApp;