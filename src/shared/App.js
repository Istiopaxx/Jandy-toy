import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, About, Problems} from '../pages';
import Layout from '../components/Layout';



class App extends Component {
    render() {
        return (
            <Layout>
                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/Problems" component={Problems} />
                    </Switch>
                </main>
            </Layout>

      

        );
    }
}

export default App;