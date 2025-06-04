import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks(
    $page: Int = 1
    $limit: Int = 10
    $sortBy: String = "title"
    $sortOrder: String = "ASC"
    $search: String
    $filter: String
  ) {
    books(
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
      search: $search
      filter: $filter
    ) {
      data {
        _id
        title
        author
        authorId
        createdAt
      }
      meta {
        currentPage
        totalPages
        itemsPerPage
        totalItems
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      sub
      username
    }
  }
`;

export interface User {
  _id: string;
  username: string;
}

export interface UserProfile {
  sub: string;
  username: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  authorId: string;
  createdAt: string;
}

export interface BooksMeta {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface BooksResponse {
  books: {
    data: Book[];
    meta: {
      currentPage: number;
      totalPages: number;
      itemsPerPage: number;
      totalItems: number;
    };
  };
} 