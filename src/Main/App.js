import React from 'react';
import Info from '../Info/Info';
import Searchbar from '../Searchbar/Searchbar';
import Graph from '../Graph/Graph';
import { Icon, Dropdown, Search, Input, Table } from 'semantic-ui-react';
import { Link, Redirect, Router } from 'react-router-dom';
import queryString from 'query-string';
import faker from 'faker';
import tinytime from 'tinytime';
import _ from 'lodash';
import './Main.css';

class App extends React.Component {

  constructor(props){
    super(props)

    let source = []
    const template = tinytime('{MM} {DD} {YYYY}');
    for(var i=0; i < 200; i++){
    
      let randomDate = faker.date.past(),
          UNIX = Math.round(randomDate.getTime() / 1000),
          date = template.render(randomDate);
    
      source.push(
        {
          title: faker.finance.bic(),
          description: faker.company.catchPhrase(),
          time: UNIX,
          date: date,
          loc: 'sherv' + Math.round(Math.random() * (15 - 1) + 1),
          image: 'https://react.semantic-ui.com/assets/images/wireframe/image.png',
          qoh: Math.round(Math.random() * (50 - 1) + 1),
          upc: Math.round(Math.random() * (999999999999)),
          prices: {
            amazon: faker.finance.amount(),
            ebay: faker.finance.amount(),
            newegg: faker.finance.amount()
          },
          data: {
            amazon:
              [
                { date: 'Jan 04 2016', price: 105.35 },
                { date: 'Jan 05 2016', price: 102.71 },
                { date: 'Jan 06 2016', price: 100.7 },
                { date: 'Jan 07 2016', price: 96.45 },
                { date: 'Jan 08 2016', price: 96.96 },
                { date: 'Jan 11 2016', price: 98.53 },
                { date: 'Jan 12 2016', price: 99.96 }
              ],
            walmart: 
              [
                { date: 'Oct 05 2016', price: 113.05 },
                { date: 'Oct 06 2016', price: 113.89 },
                { date: 'Oct 07 2016', price: 114.06 },
                { date: 'Oct 10 2016', price: 116.05 },
                { date: 'Oct 11 2016', price: 116.3 },
                { date: 'Oct 12 2016', price: 117.34 },
                { date: 'Oct 13 2016', price: 116.98 },
                { date: 'Oct 14 2016', price: 117.63 },
                { date: 'Oct 17 2016', price: 117.55 },
                { date: 'Oct 18 2016', price: 117.47 },
                { date: 'Oct 19 2016', price: 117.12 },
                { date: 'Oct 20 2016', price: 117.06 }
              ],
            ebay: 
              [
                { date: 'Jun 02 2016', price: 97.72 },
                { date: 'Jun 03 2016', price: 97.92 },
                { date: 'Jun 06 2016', price: 98.63 },
                { date: 'Jun 07 2016', price: 99.03 },
                { date: 'Jun 08 2016', price: 98.94 },
                { date: 'Jun 09 2016', price: 99.65 },
                { date: 'Jun 10 2016', price: 98.83 },
                { date: 'Jun 13 2016', price: 97.34 },
                { date: 'Jun 14 2016', price: 97.46 },
                { date: 'Jun 15 2016', price: 97.14 },
                { date: 'Jun 16 2016', price: 97.55 }
              ],
            newegg:
              [
                { date: 'Dec 09 2016', price: 113.95 },
                { date: 'Dec 12 2016', price: 113.3 },
                { date: 'Dec 13 2016', price: 115.19 },
                { date: 'Dec 14 2016', price: 115.19 },
                { date: 'Dec 15 2016', price: 115.82 },
                { date: 'Dec 16 2016', price: 115.97 },
                { date: 'Dec 19 2016', price: 116.64 },
                { date: 'Dec 20 2016', price: 116.95 },
                { date: 'Dec 21 2016', price: 117.06 },
                { date: 'Dec 22 2016', price: 116.29 },
                { date: 'Dec 23 2016', price: 116.52 },
                { date: 'Dec 27 2016', price: 117.26 },
                { date: 'Dec 28 2016', price: 116.76 },
                { date: 'Dec 29 2016', price: 116.73 },
                { date: 'Dec 30 2016', price: 115.82 }
              ]
          },
        }
      )
    }

    const pages = Math.ceil(source.length / 50),
          search = parseInt(queryString.parse(window.location.search).page);

    if(!search){
      props.history.push('?page=1')
    } else if(search > pages){
      props.history.push('?page=' + pages)
    }

    this.state = {value: '', order: 'asc', source: _.orderBy(source, ['time'], ['asc'])}
  }

  componentWillReceiveProps(nextProps){
    const search = queryString.parse(window.location.search).page;
    if(nextProps.history.action === 'POP'){
      this.setState({page: search ? parseInt(search) - 1 : 0})
    }
  }

  componentWillMount() {
    this.resetComponent(this.state.source)
  }

  resetComponent = (source) => {
    source = source ? source : this.state.source

    const pages =  Math.ceil(source.length / 50),
          search = queryString.parse(window.location.search).page;

    let results = [];

    for(var i=0; i < pages; i++){
      results.push(source.slice(i * 50, 50 * (i + 1)))
    }

    this.setState({results: results, totalPages: pages, isLoading: false, page: search && search <= pages ? parseInt(search) - 1: 0})
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
        this.props.history.push('?page=1')
        if (this.state.value.length < 1) return this.resetComponent()
        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = result => re.test(result.title) || re.test(result.description) || re.test(result.loc)
        this.resetComponent(_.filter(this.state.source, isMatch))
    }, 500)
  }

  handleClick = () => {
    const order = this.state.order === 'asc' ? 'desc' : 'asc';
    this.resetComponent(_.orderBy([].concat.apply([], this.state.results), ['time'], [order]))
    this.setState({order: order})
  }

  handleNext = () => {
    this.setState({page: this.state.page + 1})
  }

  handlePrevious = () => {  
    this.setState({page: this.state.page - 1})
  }

  render() {
    return (
      <div className="mt ui container">
        <h1 className='fl inline'>Repricer</h1>

        <div className="fr inline">
          <h5 className='pt'>
            <Link to={{search: '?page=' + (this.state.page)}} onClick={() => {this.handlePrevious()}} className='light link select-none pointer'>{this.state.page + 1 > 1 ? '<< ' : ''}</Link>
            <span className='select-none'>{this.state.page + 1}</span>
            <Link to={{search: '?page=' + (this.state.page + 2)}} onClick={() => {this.handleNext()}} className='next inline light link select-none pointer'>{this.state.page + 1 < this.state.totalPages ? ' >>' : ''}</Link>
          </h5>
        </div>
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
