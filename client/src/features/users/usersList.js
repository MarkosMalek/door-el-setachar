import { useGetUsersQuery } from "./usersApiSlice";

/**
 * Renders a list of users fetched from an API using the useGetUsersQuery hook.
 * 
 * @returns {JSX.Element} A React component displaying users or a status message.
 * @description Handles different states of user data fetching:
 * - Shows a loading message while data is being retrieved
 * - Displays an error message if data fetching fails
 * - Renders a list of users with their names and emails on successful data retrieval
 * - Shows a "No users found" message if no users are available
 */
function UsersList() {
  const { data, isLoading, isSuccess, error } = useGetUsersQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess) {
    const { ids, entities } = data;
    const users = ids.map((id) => entities[id]);
    return (
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    );
  } else {
    return <div>No users found.</div>;
  }
}

export default UsersList;
