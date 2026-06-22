import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../context/AuthModalContext';

export default function Register() {
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();

  useEffect(() => {
    openAuthModal('register');
    navigate('/', { replace: true });
  }, [openAuthModal, navigate]);

  return null;
}
