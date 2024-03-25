import { Role } from '@prisma/client';

interface UserProps {
  user: {
    id: string;
    email: string;
    role: Role;
    username: string;
  }
}

const AdminDashListItem = ({
  user
}: UserProps) => {
  const { id, email, role, username } = user;

  return (
    <div className="list-item">
      <div>
        {username}
      </div>
      <div>
        {role}
      </div>
    </div>
  )
}

export default AdminDashListItem