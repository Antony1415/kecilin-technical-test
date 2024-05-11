'use client'
import React from 'react';
import { useState } from 'react';
import { LoginForm, RegisterForm } from '@/components';

export default function Login() {
  const [formType, setFormType] = useState('login')

  return (
    <div className='w-full h-full bg-zinc-200/90 flex justify-center items-center'>
      <div className='w-[450px] h-fit bg-white rounded-[5px] py-8 px-[50px]'>
        {formType === 'login' ? <LoginForm setFormType={setFormType} /> : <RegisterForm setFormType={setFormType} />}
      </div>
    </div>
  );
}
