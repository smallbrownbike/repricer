import React from 'react';
import Info from '../Info/Info';
import Searchbar from '../Searchbar/Searchbar';
import Graph from '../Graph/Graph';
import { Icon, Dropdown, Search, Input } from 'semantic-ui-react';
import _ from 'lodash';
import './Main.css';

class App extends React.Component {

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => {
    let pages = Math.ceil(this.props.source.length / 50),
        source = [];

    for(var i=0; i < pages; i++){
      source.push(this.props.source.slice(i * 50, 50 * (i + 1)))
    }
    
    this.setState({ isLoading: false, results: source, value: '', page: 0})
  }

  handleResultSelect = (e, { result }) => {console.log(result)}

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent()

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = result => re.test(result.title) || re.test(result.description) || re.test(result.loc)

        this.setState({
            isLoading: false,
            results: _.filter(this.props.source, isMatch),
        })
    }, 500)
  }

  handleNumber = (index) => {
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
        <Info source={this.state.results[this.state.page]}/>
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
