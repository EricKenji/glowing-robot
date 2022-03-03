import { gql } from "apollo-server-express";

export const LOGIN_USER = gql`
    mutation login($email: String!, password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!) {
        addUser(username: $username, password: $password, email: $email) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: InputBook) {
        saveBook(input: $input) {
            username
            _id
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            bookCount
            username
            saveBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;