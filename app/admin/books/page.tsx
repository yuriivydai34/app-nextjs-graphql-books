'use client';
import { useQuery } from '@apollo/client';
import { GET_BOOKS, Book } from '../../graphql/queries';

export default function AdminBooksPage() {
  const { data, loading } = useQuery(GET_BOOKS);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Books</h2>
      <ul>
        {data?.books.data.map((book: Book) => (
          <li key={book._id}>
            {book.title} by {book.author}
            {/* Add edit/delete buttons here as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}