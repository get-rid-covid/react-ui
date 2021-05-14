import React,{Component} from 'react'
import './App.css';
import Layout from './hoc/Layout/Layout';
import {Route,Switch} from 'react-router-dom'
import HomeBuilder from './container/HomeContainer/HomeBuilder'
import PlanBuilder from './container/PlanContainer/PlanBuilder'
import * as linkLabel from './utils/Constants/routeLinks'


class App extends Component {
  render(){
    let routes = (
      <Switch>
        
        <Route path={linkLabel.FEEDBACK} component={PlanBuilder}/>
        <Route path={linkLabel.HOME_LINK} exact component={HomeBuilder}/>
      </Switch>
    )
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
  
}

export default App;
