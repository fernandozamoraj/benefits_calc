import React, {Component} from 'react'
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';

const style = {
    margin: 20,
    maxWidth: 250,
    backGroundColor: 444,
    borderRadius:50,
};

class Member extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
          name: props.member.FirstName + ' ' + props.member.LastName,
          role: props.member.IsEmployee ? 'Employee' : (props.member.IsSpouse ? 'Spouse' : ''),
          dateOfBirth: props.member.DateOfBirth.toDateString().substr(4)
        };
    }
    
    render() {
        return (

        <ListItem
            disabled={true}
            leftAvatar={
              <Avatar src="https://randomuser.me/api/portraits/men/83.jpg" />
            }
            style={style}
            >
            <p>Name: {this.state.name}</p>
            <p>Role: {this.state.role}</p>
            <p>DOB: {this.state.dateOfBirth}</p>

        </ListItem>          

        );
    }
}

export default Member;
