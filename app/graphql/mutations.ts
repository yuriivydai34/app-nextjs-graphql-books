import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      access_token
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      _id
      title
      author
      authorId
      createdAt
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($updateBookInput: UpdateBookInput!) {
    updateBook(updateBookInput: $updateBookInput) {
      _id
      title
      author
      createdAt
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($id: ID!) {
    removeBook(id: $id) {
      _id
      title
    }
  }
`;

export interface CreateUserInput {
  username: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  authorId: string;
}

export interface UpdateBookInput {
  id: string;
  title?: string;
  author?: string;
}

export interface CreateUserResponse {
  createUser: {
    _id: string;
    username: string;
  };
}

export interface LoginResponse {
  login: {
    access_token: string;
  };
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  authorId: string;
  createdAt: string;
} 