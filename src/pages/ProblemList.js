import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { problems } from './problemDate.json';
import ProblemListItem from '../components/ProblemListItem';


class ProblemList extends Component {

    render() {
        return (
            <>
                <h2>Problem List</h2>
                <ul>
                    {problems.map(({id, name }) => (
                        <li key={id}>
                            <ProblemListItem 
                                url={`${this.props.match.url}/${id}`} 
                                name={name} 
                                description="description"
                            />
                        </li>
                    ))}
                </ul>
            </>
        );
    }

}


export default ProblemList;