import Link from 'next/link';

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link href="/admin/users">Users</Link></li>
        <li><Link href="/admin/books">Books</Link></li>
      </ul>
    </div>
  );
}