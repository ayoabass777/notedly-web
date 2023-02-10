import React, {useEffect} from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_MY_FAVORITES } from "../gql/query";
import NoteFeed from "../components/NoteFeed";

const Favorites = () =>{
    useEffect(()=> {
        //update the document title
        document.title = 'Favorite - Notedly';
    });

const {data, loading, error} = useQuery(GET_MY_FAVORITES);
// if the data is loading, our app will display a loading message
if (loading) return 'Loading...';
// if there is an error fetching the data, display an error message
if (error) return `Error! ${error.message}`;
// if the query is successful and there are notes, return the feed of notes
// else if the query is successful and there aren't notes, display a message
if(data.me.favorites.length !==0){
    return <NoteFeed notes={data.me.favorites}/>
}
else{
    return <p>No favorites yet</p>;
}

};

export default Favorites;