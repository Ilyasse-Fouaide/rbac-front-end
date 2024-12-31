import { useAuth } from '@/features/auth/components/AuthProvider';

function Avatar() {
  const { user } = useAuth();

  return <img src={`http://127.0.0.1:8000/images/${user.userId}`} />;
}

export default Avatar;
