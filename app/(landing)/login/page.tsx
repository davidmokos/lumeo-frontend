import React from 'react'
import { LoginForm } from './login-form';

export default function Login() {
  return (
    <div className="flex min-h-[calc(100vh-52px)] flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
