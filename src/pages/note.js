import React from "react";
import { GET_NOTE } from "../gql/query";
import Note from "../components/Note";


const NotePage = props => {
    //store the id found in the url as a variable
    const id  = props.match.params.id;

    //query hook, passing the id value as a variable
    const {data, loading, error} = useQuery(GET_NOTE, { variables : {id}});

    //if data is loading display a loading message
    if(loading) return<p>loading...</p>;

    //if there is an error fetching data, display an error message
    if(error) return <p>Error! Note not found</p>;

    //if data is successful, display the data in the UI
    return <Note note={data.note} />

};
export default NotePage;