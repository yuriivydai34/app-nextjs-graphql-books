'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthNav() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <div className="text-center mt-4">
      {isLoginPage ? (
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-indigo-600 hover:text-indigo-500">
            Register here
          </Link>
        </p>
      ) : (
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
} 