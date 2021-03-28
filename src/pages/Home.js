import React, { Component } from 'react';

import './Home.css';



class Home extends Component {

    render() {
        return (
            <div>
                <div className="home_header">
                    <h1>
                        Improve your brain
                    </h1>
                    <div>
                        Solve interactive, communicative problems.
                    </div>
                </div>

                <div className="home_middle">    
                    <h2>
                        How to Start
                    </h2>
                    <div>
                        <p>1. Read a problem, write some codes!</p>
                        <p>2. Send a request to given url.</p>
                        <p>3. Then watch the problem solving!</p>
                    </div>  
                </div>
            </div>



        );
    }

}


export default Home;