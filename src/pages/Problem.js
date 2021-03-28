import React, { Component } from 'react';

import { problems } from './problemDate.json';


function Problem({ match }) {
    
    
    const problem = problems.find((problem) => problem.id === match.params.id)
    

    return (
        <>
            <h2>Problem Detail</h2>
            <h3>name</h3>
            <p>{problem.name}</p>
            <h3>explanation</h3>
            <p>{problem.explanation}</p>
        </>
    )
        
    
}


export default Problem;