import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProblemList from './ProblemList';
import Problem from './Problem';

class Problems extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <>
                <h1>Problems</h1>
                <Route exact path={this.props.match.path} component={ProblemList} />
                <Route path={`${this.props.match.path}/:id`} component={Problem} />

            
            </>
        );
    }

}


export default Problems;