import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../context/AuthModalContext';

export default function Login() {
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  useEffect(() => {
    openAuthModal('login');
    navigate('/', { replace: true });
  }, [openAuthModal, navigate]);

  return null;
}
