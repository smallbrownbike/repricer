import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Icon } from 'semantic-ui-react'
import './Searchbar.css'

class Searchbar extends Component {
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
        const { isLoading, value, results } = this.state

        return (
            <div className="ui container medium">
                <Grid>
                    <Grid.Column>
                        <Search
                            minCharacters={3}
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={this.handleSearchChange}
                            results={results}
                            value={value}
                            {...this.props}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Searchbar;