import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Member from './member';
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
        let i = 1;
        return (
            <Paper style={style}>
                <List>
                    {
                       this.props.members.map( member =>{
                            i++;
                            return <Member member={member} key={i}/>;
                        })
                    }
                </List>
            </Paper>
        );
    }
}


export default MemberList;