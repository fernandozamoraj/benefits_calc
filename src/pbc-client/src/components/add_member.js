import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';


const styles = {
    block: {
      maxWidth: 450,
      marginLeft: 250,
      padding: 50
    },
    checkbox: {
      marginBottom: 16,
      maxWidth: 150
    }    
  };



class AddMember extends Component{

    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            LastName: '',
            DateOfBirth: new Date(1995, 1, 1, 12, 0, 0),
            IsEmployee: false,
            IsSpouse: false
        }
    }

    updateEmployeeCheck(){
        this.setState((oldState) => {

            //TODO figure out how to toggle state for employee
            let newState = !oldState.IsEmployee;

            return {
              IsEmployee: newState,
              IsSpouse: false
            };
          });
    }

    updateSpouseCheck(){        
        
        this.setState((oldState) => {
            let newState = !oldState.IsSpouse;
            return {
              IsSpouse: newState,
              IsEmployee: false
            };
        });
    }

    onFirstNameChange(e){
        console.log(e.target.value);
        this.setState({
            FirstName: e.target.value
        });
    }

    onLastNameChange(e){
        console.log(e.target.value);
        this.setState({
            LastName: e.target.value
        });
    }

    addMemberClick(e){
        this.props.onAddedMember(Object.assign({}, this.state));
    }

    getDefaultDate(){
        return new Date(1995, 1, 1, 12, 0, 0);
    }

    render() {

        let thisDefaultDate = this.getDefaultDate();

        return(
            <Paper zDepth={1} style={styles.block}>
                <div className="row" id="invalid-message" data-validation-id="0">

                </div>
                <TextField hintText="First Name" id="first-name" type="text" onChange={this.onFirstNameChange.bind(this)} className="validate" required />
                <TextField hintText="Last Name" id="last-name" type="text" onChange={this.onLastNameChange.bind(this)} className="validate" required/>

                <DatePicker hintText="01/01/1972" defaultDate={thisDefaultDate} id="date-of-birth" type="text" className="validate" required/>
                
                <Paper zDepth={0} >
                    <Checkbox 
                        label="Employee"
                        checked={this.state.IsEmployee}
                        id="is-employee"
                        onCheck={this.updateEmployeeCheck.bind(this)}
                        style={styles.checkbox}
                        />

                    <Checkbox
                        label="Spouse"
                        checked={this.state.IsSpouse}
                        id="is-spouse"
                        onCheck={this.updateSpouseCheck.bind(this)}
                        style={styles.checkbox}
                        />
                </Paper>    

                <RaisedButton id="btn-add-member" label="Add Member" onClick={this.addMemberClick.bind(this)}/>

            </Paper>
        );
    }
}

export default AddMember;
