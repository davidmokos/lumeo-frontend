import React from 'react'
import { NavUserClient } from './nav-user-client';

export default function NavUserServer() {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  };
  return <NavUserClient user={data.user} />;
}
