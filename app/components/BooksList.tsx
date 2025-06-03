'use client';

import { useQuery } from '@apollo/client';
import { GET_BOOKS, type BooksResponse } from '../graphql/queries';

export default function BooksList() {
  const { loading, error, data } = useQuery<BooksResponse>(GET_BOOKS, {
    variables: {
      page: 1,
      limit: 10,
      sortBy: "title",
      sortOrder: "ASC",
      search: "fantasy",
      filter: JSON.stringify({ author: "Tolkien" })
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books List</h1>
      <div className="grid gap-4">
        {data?.books.data.map((book) => (
          <div key={book._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-500 text-sm">
              Created: {new Date(book.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      
      {data?.books.meta && (
        <div className="mt-4 text-sm text-gray-600">
          Page {data.books.meta.currentPage} of {data.books.meta.totalPages} |
          Total items: {data.books.meta.totalItems}
        </div>
      )}
    </div>
  );
} 