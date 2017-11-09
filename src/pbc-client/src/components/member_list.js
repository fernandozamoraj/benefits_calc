import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeader,
    TableHeaderColumn
  } from 'material-ui/Table';

import randomImage from '../util/random_image';

/**
 * MemberList - Parent component for displaying
 * members
 */
class MemberList extends Component{

    constructor(props){
        super(props);
        this.state = { randomImageUrl: randomImage.get() };
    }
    render() {

        return (

            <Table selectable={false}>
                <TableHeader displaySelectAll={false} enableSelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Role</TableHeaderColumn>
                        <TableHeaderColumn>Date Of Birth</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {
                        this.props.members.map( member =>{

                                const id = member.Id;
                                const name = member.FirstName + ' ' + member.LastName;
                                const role = member.IsEmployee ? 'Employee' : (member.IsSpouse ? 'Spouse' : 'Dependant');
                                const dateOfBirth = member.DateOfBirth.toDateString().substr(4);
                                
                                return ( 
                                    <TableRow key={id}>
                                        <TableRowColumn>{member.Id}</TableRowColumn>
                                        <TableRowColumn>{name}</TableRowColumn>
                                        <TableRowColumn>{role}</TableRowColumn>
                                        <TableRowColumn>{dateOfBirth}</TableRowColumn>
                                    </TableRow>)
                        })
                    }
                </TableBody>
            </Table>
        );
    }
}

export default MemberList;