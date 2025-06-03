import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      username
    }
  }
`;

export interface CreateUserInput {
  username: string;
  password: string;
}

export interface CreateUserResponse {
  createUser: {
    _id: string;
    username: string;
  };
} 