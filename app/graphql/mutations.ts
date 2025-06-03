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

export interface CreateUserInput {
  username: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
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
    user: {
      _id: string;
      username: string;
    };
  };
} 