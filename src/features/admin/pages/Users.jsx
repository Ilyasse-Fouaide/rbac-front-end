import Administrator from '../components/Administrator';

function Users() {
  return (
    <Administrator>
      <div>Users management</div>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          Tanstack react table https://www.youtube.com/watch?v=CjqG277Hmgg
        </li>
      </ul>
    </Administrator>
  );
}

export default Users;
