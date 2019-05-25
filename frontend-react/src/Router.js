import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Nav, NavItem, NavLink} from 'reactstrap';
import { Button } from 'reactstrap';
import Header from "./Layouts/Header";

import Home from "./Components/home/home";
import New from "./Components/new/new";
import Settings from "./Components/settings/settings";

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
      React.createElement(component, finalProps)
    );
  }
  
  const PropsRoute = ({ component, ...rest }) => {
    return (
      <Route {...rest} render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}/>
    );
  }

class AppRouter extends React.Component {

    state = {
        user : "alice", // bob, charlie, dave
        privkey : "B3B67F8F57CCB981463F74A48165A5ABB1A72BF0F35E7E0619447C073C5BED99"
    }

    changeUser = (name) => {
        if (name==='alice') {
            this.setState({
            user: name,
            privkey: "B3B67F8F57CCB981463F74A48165A5ABB1A72BF0F35E7E0619447C073C5BED99"
        }) 
        } else {
            this.setState({
                user: name,
                privkey: "6FD396DC79BA21314B5F7C4A0D669BBE4DC8D9D6903060EA942C874A96763B98"
            }) 
        }
        
    }
    
    
    render() {
        return (
            <Router>
                <div>
                    <Header/>    
                    <PropsRoute path="/" exact component={Home} changeUser={this.changeUser} user={this.state.user} privkey={this.state.privkey}/>
                    <PropsRoute path="/new" component={New} changeUser={this.changeUser} user={this.state.user} privkey={this.state.privkey}/>
                    <PropsRoute path="/settings" component={Settings} changeUser={this.changeUser} user={this.state.user} privkey={this.state.privkey} />
                </div>
            </Router>
        );
    }
};

export default AppRouter;