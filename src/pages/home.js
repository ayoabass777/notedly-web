import React from "react";
import ReactMarkdown from 'react-markdown';
import NoteFeed from '../components/NoteFeed';
import Button from '../components/Button'
import { GET_NOTES } from "../gql/query";
//import the required libraries
import { useQuery, gql } from "@apollo/client";



const Home = () =>{
    //query hook
    const {data, loading, error, fetchMore} = useQuery(GET_NOTES);

    //  if the data is loading, display a loading message
    if(loading) return <p>Loading...</p>;

    //if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;
    //if data is successful, display the data in UI
    return(
    <React.Fragment>     
     <NoteFeed notes ={data.noteFeed.notes}/>
    {/* Only display the Load More button if hasNextPage is true*/}
    {data.noteFeed.hasNextPage && (
        //onClick perform a query, passing the current cursor as a variable
        <Button
            onClick={() => 
                fetchMore({
                    variables: {
                        cursor: data.noteFeed.cursor
                    },
                    updateQuery:(previousResult, {fetchMoreResult}) =>{
                     return{
                        noteFeed:{
                            cursor: fetchMoreResult.noteFeed.cursor,
                            hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                            //combine old and new results
                            notes: [
                                ...previousResult.noteFeed.notes,
                                ...fetchMoreResult.noteFeed.notes
                            ],
                            _typename: 'notefeed'
                        }
                     }   
                    }
                })
            }
        >Load more</Button>
    )}

    </React.Fragment>
   
    )
};

export default Home;