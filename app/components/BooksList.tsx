'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS, type BooksResponse } from '../graphql/queries';
import { REMOVE_BOOK, type Book } from '../graphql/mutations';
import Header from './Header';
import BookModal from './BookModal';

export default function BooksList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

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

  const [removeBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleAddBook = () => {
    setSelectedBook(undefined);
    setIsModalOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await removeBook({
          variables: { id },
        });
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Books List</h2>
          <button
            onClick={handleAddBook}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Book
          </button>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error: {error.message}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {data?.books.data.map((book) => (
                <div
                  key={book._id}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Author: {book.author}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Added: {new Date(book.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditBook(book)}
                        className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {data?.books.meta && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
                <div className="flex-1 flex justify-between sm:hidden">
                  <span className="text-sm text-gray-700">
                    Page {data.books.meta.currentPage} of {data.books.meta.totalPages}
                  </span>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing page <span className="font-medium">{data.books.meta.currentPage}</span> of{' '}
                      <span className="font-medium">{data.books.meta.totalPages}</span> pages
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      Total items: <span className="font-medium">{data.books.meta.totalItems}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={selectedBook}
      />
    </div>
  );
} 