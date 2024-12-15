import React from 'react'
import { NavUserClient } from './nav-user-client';
import { createClient } from '@/utils/supabase/server';

export default async function NavUserServer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = {
    user: {
      name: user?.email ?? "Guest",
      email: user?.email ?? "Guest",
      avatar: "/avatars/shadcn.jpg",
    },
  };
  return <NavUserClient user={data.user} />;
}
