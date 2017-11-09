import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentBackspace from 'material-ui/svg-icons/content/backspace';
import './styles/add_member.css';
import {teal400} from 'material-ui/styles/colors';



const iconStyles = {
    marginRight: 10,
};

const styles = {
    block: {
      maxWidth: 450,
      marginLeft: 10,
      padding: 50
    },
    checkbox: {
      marginBottom: 16,
      maxWidth: 150
    },
    main:{
        height: 1200,
        paddingBottom: 400, 
    }
};

/**
 * AddMember - Component for adding family members
 */
class AddMember extends Component{

    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            LastName: '',
            DateOfBirth: new Date(1995, 1, 1, 12, 0, 0),
            IsEmployee: false,
            IsSpouse: false,
        }
    }

    render() {
        let thisDefaultDate = this.getDefaultDate();
        return(
            <Paper style={styles.main}>
                <Paper zDepth={0} style={styles.block}>
                    <div className="row" id="invalid-message" data-validation-id="0"/>
                    <TextField value={this.state.FirstName} hintText="First Name" id="first-name" type="text" onChange={this.onFirstNameChange.bind(this)} className="validate" required />
                    <TextField value={this.state.LastName}hintText="Last Name" id="last-name" type="text" onChange={this.onLastNameChange.bind(this)} className="validate" required/>
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
                    <RaisedButton id="btn-add-member" label="Add" onClick={this.addMemberClick.bind(this)} 
                        style={{
                            margin: '10px',
                            color: '#ff0000'
                        }} 
                    >
                        <ContentAdd style={iconStyles} color={teal400} />
                    </RaisedButton>
                    <RaisedButton id="btn-close" label="Cancel" onClick={this.btnCloseClick.bind(this)} 
                        style={{
                            margin: '10px',
                            color: '#ff0000'
                        }} 
                    >
                        <ContentBackspace style={iconStyles} color={teal400} />
                    </RaisedButton>
                </Paper>
                <Paper>

                </Paper>
            </Paper>
        );
    }

    btnCloseClick(e){
       this.props.closeDrawer()
    }

    /**
     * clearState - clears the form... normally after a successful entry
     */
    clearState(){
        this.setState( {
            FirstName: '',
            LastName: '',
            DateOfBirth: new Date(1995, 1, 1, 12, 0, 0),
            IsEmployee: false,
            IsSpouse: false,
        });
    }

    /**
     * updateEmployeeCheck - To Indicate this user is
     * the sponsor employee.
     * The two checkboxes on the form
     * behave sort of like radio buttons. Only one check
     * box can be checked at a time or neither.
     */
    updateEmployeeCheck(){
        this.setState((oldState) => {
            const newState = !oldState.IsEmployee;
            return {
              IsEmployee: newState,
              IsSpouse: false
            };
        });
    }

    /**
     * updateSpouseCheck - The two checkboxes on the form
     * behave sort of like radio buttons. Only one check
     * box can be checked at a time or neither.
     */
    updateSpouseCheck(){        
        this.setState((oldState) => {
            const newState = !oldState.IsSpouse;
            return {
              IsSpouse: newState,
              IsEmployee: false
            };
        });
    }

    /**
     * onFirstNameChange - Handler for when the
     * name changes.
     * It closes the calculation results drawer.
     * @param {event args} e 
     */
    onFirstNameChange(e){
        this.setState({
            FirstName: e.target.value
        });
    }

    /**
     * onLastNameChange - Handler for when the
     * last name changes.
     * It closes the calculation results drawer
     * @param {event args} e 
     */
    onLastNameChange(e){
        this.setState({
            LastName: e.target.value
        });
    }

    /**
     * addMemberClick - Handler when the button add member is
     * clicked.
     * The parent may is interested in knowing when a member has
     * been added.
     * @param {event args} e 
     */
    addMemberClick(e){
        const success = this.props.onAddedMember(Object.assign({}, this.state));
        if(success){
            this.clearState();
            this.props.closeDrawer()
        }
    }

    /**
     * getDefaultDate - Helper function to set a default
     * date on the calendar picker on the form.
     */
    getDefaultDate(){
        return new Date(1995, 1, 1, 12, 0, 0);
    }

    handleToggle = () => this.setState({open: !this.state.open});
}

export default AddMember;
