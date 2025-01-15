import { useGetUsersQuery } from "./usersApiSlice";

function UsersList() {
  const { data, isLoading, isSuccess, error } = useGetUsersQuery();
  let content;
  if (isLoading) {
    content = (
      <div>
        <span>Loading users...</span>
      </div>
    );
  }
  if (error) {
    content = (
      <div>
        <h2>Error</h2>
        <p>{error?.data?.message || "Failed to load users"}</p>
      </div>
    );
  }
  if (isSuccess) {
    const { ids, entities } = data;
    const users = ids.map((id) => entities[id]);
    content = users.length ? (
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id}>
            <div>
              {user.name} - {user.email}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No users available.</p>
    );
  }
  return (
    <section>
      <h1>Users</h1>
      {content}
    </section>
  );
}

export default UsersList;
