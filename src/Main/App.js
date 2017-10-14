import React from 'react';
import Info from '../Info/Info';
import Searchbar from '../Searchbar/Searchbar';
import Graph from '../Graph/Graph';
import { Icon, Dropdown, Search, Input, Table } from 'semantic-ui-react';
import _ from 'lodash';
import './Main.css';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {value: '', order: 'asc'}
  }

  componentWillMount() {
    this.resetComponent(this.props.source)
  }

  resetComponent = (source) => {
    
    this.setState({isLoading: false})

    source = source ? source : this.props.source

    const pages =  Math.ceil(source.length / 50);

    let results = [];

    for(var i=0; i < pages; i++){
      results.push(source.slice(i * 50, 50 * (i + 1)))
    }
    this.setState({results: results, page: 0})
  }

  handleResultSelect = (e, { result }) => {console.log(result)}

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent()

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = result => re.test(result.title) || re.test(result.description) || re.test(result.loc)

        this.resetComponent(_.filter(this.props.source, isMatch))
    }, 500)
  }

  handleClick = () => {
    const order = this.state.order === 'asc' ? 'desc' : 'asc';
    this.resetComponent(_.orderBy([].concat.apply([], this.state.results), ['time'], [order]))
    this.setState({order: order})
  }

  handleNumber = (index) => {
    window.scroll(0,0)
    this.setState({page: index})
  }

  render() {
    return (
      <div className="mt ui container">
        <h1>Repricer</h1>
        <div className="">
          <Input
              icon
              placeholder='Search...'
              fluid={true}
              minCharacters={3}
              loading={this.state.isLoading}
              onChange={this.handleSearchChange}
              value={this.state.value}
              {...this.props}

          >
            <input />
            <Icon name='search' />
          </Input>
        </div>
        <Table className="mb ui selectable celled table">
          <Table.Header>
              <Table.Row>
                  <Table.HeaderCell>SKU</Table.HeaderCell>
                  <Table.HeaderCell>Item Name</Table.HeaderCell>
                  <Table.HeaderCell className='hover' onClick={() => {this.handleClick()}}><Icon name={this.state.order === 'asc' ? 'sort ascending': 'sort descending'}/>Last Sold</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
              </Table.Row>
          </Table.Header>
          
          <Info source={this.state.results.length > 0 ? this.state.results[this.state.page] : this.state.results}/>

        </Table>
        <div className="ui center aligned container">
          {this.state.results.map((page, index) => {
            return(
              <span onClick={() => {this.handleNumber(index)}} className={this.state.page === index ? 'm bold' : 'm link pointer'}>{index + 1}</span>
            )
          })}
        </div>
        <footer>
          <div className="sm ui center aligned container">
            eli kinsey 2017 <a href='https://github.com/smallbrownbike'><i class="github icon"></i></a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
