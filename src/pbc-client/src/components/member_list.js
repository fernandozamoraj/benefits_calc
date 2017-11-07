import React, {Component} from 'react'
import Member from './member'
import List from 'material-ui/List/List';
import Paper from 'material-ui/Paper';

const style = {
    margin: 20,
    maxWidth: 450
};

class MemberList extends Component{

    constructor(props) {
        super(props);
    }    

    render() {
        return (
            <Paper style={style}>
                <List>
                    {
                        this.props.familyMembers.map( member =>{
                            return <Member member={member}/>;
                        })
                    }
                </List>
            </Paper>
        );
    }
}

export default MemberList;