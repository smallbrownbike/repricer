import React from 'react'
import { Icon, Popup, Modal, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Graph from '../Graph/Graph'
import '../Info/App.css';

class Info extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state = {source: this.props.source}
    // }

    // componentWillReceiveProps(nextProps){
    //     this.setState({source: nextProps.source, order: 'asc'})
    // }

    render(){
        return(
            <Table.Body>
                {this.props.source.map((info, index) => {
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
        )
    }
}

export default Info;


