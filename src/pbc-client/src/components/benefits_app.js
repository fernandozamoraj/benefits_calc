import React, {Component} from 'react';
import uuidv1 from 'uuid/v1';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import Validator from '../util/validate_member';
import AddMember from './add_member';
import MemberList from './member_list';
import CalculationResults from './calculation_results';
import round from '../util/round_money';
import calculator from '../util/calculator';
import Paper from 'material-ui/Paper';
import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance';
import ContentAdd from 'material-ui/svg-icons/content/add';
import '../gridiculous.css';
import '../App.css';

const iconStyles = {
    marginRight: 10,
};

const styles = {
    block: {
      maxWidth: 450,
      marginLeft: 10,
      padding: 50
    },
};
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
                <AppBar title="Benefits Application" />
                <div className="sub-container">

                    {messageBox}
                    <div className="row">
                        <div className="c3">
                            <RaisedButton 
                                label="Add Family Member"
                                onClick={this.addMemberClick.bind(this)}
                                primary={true}>
                                <ContentAdd style={iconStyles} color={"#ccc"} />
                            </RaisedButton>
                        </div>
                        <div className="c3">
                            <RaisedButton 
                                  id="btn-calculate" 
                                  label="Calculate" 
                                  onClick={this.calculateClick.bind(this)}
                                  primary={true}>
                                    <ActionAccountBalance style={iconStyles} color={"#ccc"}/>
                            </RaisedButton>
                        </div>
                    </div>
                    <div className="row">
                        <div className="c8">
                            <MemberList members={this.state.members}/>
                        </div>
                        <div className="c4">
                            <Paper styles={styles.block}>
                                <CalculationResults results={this.state.results} />
                            </Paper>
                        </div>
                    </div>
                    <Drawer  width={500} openSecondary={true} open={this.state.open} >
                        <AddMember 
                            onAddedMember={this.handleAddedMember.bind(this)} 
                            onRunCalculations={this.handleRunCalculations.bind(this)}
                            closeDrawer={this.handleCloseDrawer.bind(this)}
                            members={this.state.members} />
                    </Drawer>
                </div>
            </div>  
        );
    }

     /**
     * calculateClick - Handler for when calculate button is clicked
     * Notifies the parent component so that the parent can run
     * calculations.
     * @param {event args} e 
     */
    calculateClick(e){
        this.handleRunCalculations();
    }

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

    addMemberClick(){
        this.setState({open: true});
    }

    /**
     * handleAddedMember - Call back when member is added
     * @param {Member} member 
     */
    handleAddedMember(member){
        const results = Validator.validateMember(member, this.state.members);
        if(results.isValid){
            member.Id = uuidv1();       

            axios.post('api/familyMember/', member)
            .then((data) => {

                console.log(data);
                console.log(data.data);
                //slice array to avoid modify the original array
                let newMembers = this.state.members.slice();
                let newMember = data.data;
                //Date comes back from the server as string
                newMember.DateOfBirth = new Date(newMember.DateOfBirth);
                newMembers.push(data.data);
                this.setState( (oldState) => {
                    return {
                        members: newMembers
                    }
                });
            })
            .catch((err) => {
                this.handleOpenDialog("Error from POST... running calculations locally.");
                
                //call to back end failed but submit locally anyway
                let newMembers = this.state.members.slice();
                newMembers.push(member);
                this.setState( (oldState) => {
                    return {
                        members: newMembers
                    }
                });
            })
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
            })
            .catch((err) => {
                this.handleOpenDialog("Error from POST... running calculations locally.");
                const data = calculator.runCalculations({ Members: this.state.members});
                this.setResults(data);
            })
        } else {            
            this.handleOpenDialog(results.message);
        }
        return results.isValid;
    }
}

export default BenefitsApp;