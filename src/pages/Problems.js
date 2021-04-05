import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProblemList from './ProblemList';
import Problem from './Problem';

class Problems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: 
            [
                {
                    "id": "0",
                    "name": "null",
                    "explanation" : "null"
                }
            ]
            
        };
    }

    componentDidMount() {
        fetch('/api', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
        })
        .then(res => res.json())
        .then(data => this.setState({ problems: data.problems}));
    }

    render() {
        return (
            <>
                <h1>Problems</h1>
                <Route 
                    exact path={this.props.match.path} 
                    render={(props) => <ProblemList problems={this.state.problems} {...props} />}
                />
                <Route 
                    path={`${this.props.match.path}/:id`} 
                    render={(props) => <Problem problems={this.state.problems} {...props} />}
                />

            </>
        );
    }

}


export default Problems;