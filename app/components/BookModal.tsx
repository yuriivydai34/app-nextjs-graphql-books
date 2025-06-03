'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, UPDATE_BOOK, type CreateBookInput, type UpdateBookInput, type Book } from '../graphql/mutations';
import { GET_BOOKS } from '../graphql/queries';
import { auth } from '../lib/auth';
import { useRouter } from 'next/navigation';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book;
}

export default function BookModal({ isOpen, onClose, book }: BookModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
    } else {
      setTitle('');
    }
  }, [book]);

  useEffect(() => {
    // Check if user is authenticated when modal opens
    if (isOpen && !auth.isAuthenticated()) {
      router.push('/login');
    }
  }, [isOpen, router]);

  const [createBook, { loading: createLoading }] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      onClose();
      setTitle('');
    },
    onError: (error) => setError(error.message),
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [updateBook, { loading: updateLoading }] = useMutation(UPDATE_BOOK, {
    onCompleted: () => {
      onClose();
    },
    onError: (error) => setError(error.message),
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title) {
      setError('Please fill in the title');
      return;
    }

    try {
      if (book) {
        // Update existing book
        const updateInput: UpdateBookInput = {
          _id: book._id,
          title: title !== book.title ? title : undefined,
        };
        await updateBook({
          variables: { updateBookInput: updateInput },
        });
      } else {
        // Create new book
        const user = auth.getUser();
        if (!user?.username) {
          setError('User not found. Please log in again.');
          return;
        }

        const createInput: CreateBookInput = {
          title,
          author: user.username,
          authorId: user._id,
        };
        await createBook({
          variables: { createBookInput: createInput },
        });
      }
    } catch (err) {
      // Error is handled by onError callbacks
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">
          {book ? 'Edit Book' : 'Add New Book'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter book title"
            />
          </div>

          {book && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <p className="mt-1 text-sm text-gray-500">{book.author}</p>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createLoading || updateLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {createLoading || updateLoading
                ? 'Saving...'
                : book
                ? 'Update'
                : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 