'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { registerWithEmail } from '@/services/authService';
import RegisterComponent from '@/components/auth/RegisterComponent';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();

  if (currentUser) {
    router.push('/dashboard');
    return null;
  }

  const handleRegister = async (email, password) => {
    setLoading(true);
    try {
      await registerWithEmail(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterComponent
      onRegister={handleRegister}
      loading={loading}
    />
  );
}