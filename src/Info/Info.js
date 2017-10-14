import React from 'react'
import { Icon, Popup, Modal, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Graph from '../Graph/Graph'
import '../Info/App.css';

class Info extends React.Component {
    constructor(props){
        super(props)
        this.state = {source: this.props.source, order: 'asc'}
    }

    componentWillReceiveProps(nextProps){
        this.setState({source: nextProps.source, order: 'asc'})
    }

    handleClick = () => {
        const order = this.state.order === 'asc' ? 'desc' : 'asc';
        this.setState({source: _.orderBy(this.props.source, ['time'], [order]), order: order})
    }

    render(){
        return(
            <Table className="mb ui selectable celled table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>SKU</Table.HeaderCell>
                        <Table.HeaderCell>Item Name</Table.HeaderCell>
                        <Table.HeaderCell className='hover' onClick={() => {this.handleClick()}}><Icon name={this.state.order === 'asc' ? 'sort ascending': 'sort descending'}/>Last Sold</Table.HeaderCell>
                        <Table.HeaderCell>Location</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.source.map((info, index) => {
                        return (
                            <Modal
                                basic  
                                size={'large'}
                                on={'click'}
                                content={<Graph data={info}/>}
                                trigger={
                                    <Table.Row className='hover'>
                                        <Table.Cell>{info.title}</Table.Cell>
                                        <Table.Cell>{info.description}</Table.Cell>
                                        <Table.Cell>{info.date}</Table.Cell>
                                        <Table.Cell>{info.loc}</Table.Cell>
                                    </Table.Row>
                                }
                            />                      

                        )
                    })}
                </Table.Body>
            </Table>
        )
    }
}

export default Info;


