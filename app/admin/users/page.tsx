'use client';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_PROFILE, User, UserProfile } from '../../graphql/queries';

export default function UsersPage() {
  const { data: usersData, loading: usersLoading } = useQuery<{ users: User[] }>(GET_USERS);
  const { data: profileData, loading: profileLoading } = useQuery<{ profile: UserProfile }>(GET_PROFILE);

  if (usersLoading || profileLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Current User Profile</h2>
      <pre>{JSON.stringify(profileData?.profile, null, 2)}</pre>
      <h2>Users List</h2>
      <ul>
        {usersData?.users.map(user => (
          <li key={user._id}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}