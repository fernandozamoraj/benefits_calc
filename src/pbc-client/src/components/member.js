import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import randomImage from '../util/random_image';

const style = {
    margin: 20,
    maxWidth: 250,
    backGroundColor: 444,
    borderRadius:50,
};

class Member extends Component{

    constructor(props){
        super(props);
        this.state = { randomImageUrl: randomImage.get() };
    }

    render() {

        const member = this.props.member;
        const name = member.FirstName + ' ' + member.LastName;
        const role = member.IsEmployee ? 'Employee' : (member.IsSpouse ? 'Spouse' : 'Dependent');
        const dateOfBirth = member.DateOfBirth.toDateString().substr(4);
        const imageUrl = this.state.randomImageUrl;

        return (
            <ListItem 
                disabled={true}
                rightAvatar={
                    <Avatar src={imageUrl} />
                }
                style={style}
                >

                <ul className="member-card">
                    <li>Name: {name}</li>
                    <li>Role: {role}</li>
                    <li>DOB: {dateOfBirth}</li>
                </ul>
            </ListItem>          

        );
    }
}

Member.defaultProps = {
    member: {
        FirstName: '', 
        LastName: '', 
        IsEmployee: false, 
        IsSpouse: false, 
        dateOfBirth: new Date(1,1,200).toDateString().substr(4)
    }
}

export default Member;
