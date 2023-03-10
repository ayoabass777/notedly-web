import { gql } from "@apollo/client";

// GraphQL query stored as a variable
const GET_NOTES = gql`
    query NoteFeed($cursor: String){
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes{
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

// the note query, which accepts an ID variable
const GET_NOTE = gql`
    query note($id: ID!) {
        note(id: $id) {
            id
            createdAt
            content
            favoriteCount
            author {
                username
                id
                avatar
            }
        }
    }
    `;

    //add the GET_MY_NOTES query
const GET_MY_NOTES = gql`
    query me {
        me {
            id
            username
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

//add the GET_MY_FAVORITES query
const GET_MY_FAVORITES = gql`
    query me {
        me {
            id
            username
            favorites {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

// add GET_ME to our queries
const GET_ME = gql`
    query me {
        me {
            id
            favorites { 
                id
            }
        }
    }
`;

    const IS_LOGGED_IN = gql`
{
    isLoggedIn @client
}
`;

export {GET_NOTES, 
    GET_NOTE,
    GET_MY_NOTES, 
    GET_MY_FAVORITES,
    GET_ME,
    IS_LOGGED_IN
};