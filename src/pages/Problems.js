import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProblemList from './ProblemList';
import Problem from './Problem';

class Problems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: [],
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
        const { problems } = this.state;
        return (
            <>
                <h1>Problems</h1>
                <Route 
                    exact path={this.props.match.path} 
                    render={(props) => <ProblemList problems={problems} {...props} />}
                />
                <Route 
                    path={`${this.props.match.path}/:id`} 
                    render={(props) => <Problem problems={problems} {...props} />}
                />

            </>
        );
    }

}


export default Problems;