'use client';

import { useQuery } from '@apollo/client';
import { GET_BOOKS, type BooksResponse } from '../graphql/queries';
import Header from './Header';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
    </div>
  );
} 