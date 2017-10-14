import React from 'react';
import { Button, Grid, Image, Input, Label } from 'semantic-ui-react';
import { LineChart, Line, YAxis, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Graph.css';

class Graph extends React.Component{
  constructor(props){
    super(props)
    this.state = {data: this.props.data.data.ebay, color: '#FBBD08', channel: 'ebay', value: {ebay: this.props.data.prices['ebay'], walmart: this.props.data.prices['walmart'], amazon: this.props.data.prices['amazon'], newegg: this.props.data.prices['newegg']}}
  }

  handleClick = (channel) => {
    const colors = {ebay: '#FBBD08', amazon: '#FF851B', newegg: '#A333C8'};
    this.setState({data: this.props.data.data[channel], color: colors[channel], channel: channel});
  }

  handleChange = (e, { value }) => {
    const obj = {
      value: {
        ebay: this.state.channel === 'ebay' ? value : this.state.value['ebay'],
        amazon: this.state.channel === 'amazon' ? value : this.state.value['amazon'],
        newegg: this.state.channel === 'newegg' ? value : this.state.value['newegg']
      }
    }
    this.setState(obj)
  }

  render(){
    return(

        <div className="ui center aligned container">
          <Grid celled>
            <Grid.Row className='bg-white clr-black'>
              <Grid.Column width={3}>
                <Image src={this.props.data.image} />
                <h2>{this.props.data.title}</h2>
                <div className="ui fitted divider"></div>
                <h5>Quantity: <span className='light'>{this.props.data.qoh}</span></h5>
                <h5>Location: <span className='light'>{this.props.data.loc}</span></h5>
                <h5>UPC: <span className='light'>{this.props.data.upc}</span></h5>
              </Grid.Column>
              <Grid.Column width={13}>
                
                  <div className="fl">
                  <Input label='$' onChange={this.handleChange} value={this.state.value[this.state.channel]} action={{ color: 'teal', content: 'Update' }} />
                    
                  </div>
                  <div className="fr">
                    <Button active={this.state.channel === 'ebay' ? true : false} inverted onClick={() => {this.handleClick('ebay')}} color='yellow'>eBay</Button>
                    <Button active={this.state.channel === 'walmart' ? true : false} inverted onClick={() => {this.handleClick('walmart')}} color='blue'>Walmart</Button>
                    <Button active={this.state.channel === 'amazon' ? true : false} inverted onClick={() => {this.handleClick('amazon')}} color='orange'>Amazon</Button>
                    <Button active={this.state.channel === 'newegg' ? true : false} inverted onClick={() => {this.handleClick('newegg')}} color='purple'>Newegg</Button>
                  </div>
                
                <div className="mt inline">
                  <ResponsiveContainer height={400}>
                    <LineChart data={this.state.data}>
                      <XAxis dataKey="date" />
                      <YAxis domain={['auto', 'auto']} />
                      <Tooltip />
                      <Legend />
                      <Line dataKey="price" stroke={this.state.color} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

    )
  }
}

export default Graph;