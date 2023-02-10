import React from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { DELETE_NOTE } from "../gql/mutation";
//import queries to refetch after note deletion
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";

import ButtonAsLink from "./ButtonAsLink";

const DeleteNote = props =>{
    const [deleteNote]= useMutation(DELETE_NOTE, {
        variables:{
            id:props.noteid
        },
        //refetch the note list queries to update the cache
        refetchQueries: [{query: GET_MY_NOTES, GET_NOTES}],
        onCompleted: data =>{
            //rediect the user to the "my notes" page
            props.history.push('/mynotes');
        }
    });
    return <ButtonAsLink
        onClick={deleteNote}
    >Delete Note</ButtonAsLink>;

};

export default withRouter(DeleteNote);