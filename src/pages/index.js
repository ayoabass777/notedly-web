//import React and routing dependencies
import React from "react";
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../gql/query";
// import routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from "./favorites";
import Layout from "../components/Layout";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./signin";
import NewNote from "./new";
import EditNote from "./edit";




//define routes
const Pages = () => {
    return(
        <Router>
            {/*Wrap routes within the layout component*/}
            <Layout>
                <Route exact path="/" component={Home}/>
                <PrivateRoute path="/mynotes" component={MyNotes}/>
                <PrivateRoute path="/favorites" component={Favorites} />
                <PrivateRoute path="/note/:id" component={NotePage}/>
                <PrivateRoute path="edit/:id" component={EditNote} />
                <PrivateRoute path="/new" component={NewNote} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn}/>
            </Layout>

        </Router>
       
    );
   
};

// add the PrivateRoute component below `Pages` component
const PrivateRoute = ({ component: Component, ...rest})=>{
    const {loading, error, data} = useQuery(IS_LOGGED_IN);
    // if the data is loading, display a loading message
if (loading) return <p>Loading...</p>;
// if there is an error fetching the data, display an error message
if (error) return <p>Error!</p>;
// if the user is logged in, route them to the requested component
//else redirect them to the sign-in page
return(
    <Route 
    {...rest}
    render={props =>
        data.isLoggedIn === true?(
            <Component {...props}/>
        ) : (
            <Redirect 
            to={{
                pathname: '/signin',
                state:{from: props.location}
            }}
            />
        )
    }
    />
)
}
export default Pages;