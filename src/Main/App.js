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

  resetComponent = () => this.setState({ isLoading: false, results: this.props.source, value: '' })

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
        <Info source={this.state.results}/>
        <footer>
          <a href='https://github.com/smallbrownbike'>
            <div className="sm ui center aligned container">
              eli kinsey 2017 <i class="github icon"></i>
            </div>
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
