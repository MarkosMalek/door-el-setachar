import { useGetUsersQuery } from "./usersApiSlice";

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
