import React, {useContext} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {AuthContext} from "./context/AuthContext";

const App = () => {
    const {data} = useContext(AuthContext);
    const {user, isLoading} = data;


    const RutaProtegida = ({component, path, ...rest}) => {
        if (user) {
            return <Route component={component} path={path} {...rest} />
        } else {
            return <Redirect to="/login" {...rest} />
        }

    }

    return !isLoading ? (
        <Router>
            <div className="container-fluid p-0">
                <Navbar user={user}/>
                <Switch>
                    <Route component={Login} path="/login" exact/>
                    <RutaProtegida component={Home} path="/" exact/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    ) : (<div>Cargando...</div>)
}

export default App
