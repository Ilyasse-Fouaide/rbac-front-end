import React from 'react';

import { cn } from '@/lib/utils';

const Avatar = React.forwardRef(
  ({ className, user, size = 32, dir = 'avatars', ...props }, ref) => {
    return (
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/images/${user.userId}?size=${size}&dir=${dir}`}
        alt={user.email}
        width={size}
        height={size}
        className={cn(className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Avatar.displayName = 'Avatar';

export default Avatar;
