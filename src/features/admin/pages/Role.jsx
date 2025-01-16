import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Users, Shield, Info, Calendar } from 'lucide-react';

import UseFetchRole from '../hooks/useFetchRole';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Administrator from '../components/Administrator';

function Role() {
  const { roleId } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ['role', roleId],
    queryFn: () => UseFetchRole(roleId),
  });

  if (isPending) {
    return 'Loading...';
  }

  return (
    <Administrator>
      <div className="w-full max-w-4xl space-y-6 p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold capitalize tracking-tight">
                {data.name}
              </h1>
              <Badge className="h-6" variant="secondary">
                {data.members} Members
              </Badge>
            </div>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Info className="h-4 w-4" />
              {data.description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Created {new Date(data.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Members
                  </p>
                  <p className="text-2xl font-bold">{data.members}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Permissions
                  </p>
                  <p className="text-2xl font-bold">
                    {data.permissions.length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Grid */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Members</h2>
                <Badge variant="outline" className="font-normal">
                  {data.users.length} Active
                </Badge>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {data.users.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-4 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
                  >
                    <Avatar className="h-12 w-12 rounded-lg border-2 border-background">
                      <AvatarImage
                        src={user.avatar.mediumImage.url}
                        alt={user.email}
                      />
                      <AvatarFallback className="bg-primary/10">
                        {user.email.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{user.email}</p>
                      <p className="text-sm text-muted-foreground">Member</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Permissions</h2>
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              {data.permissions.length === 0 ? (
                <div className="rounded-lg bg-muted/50 py-8 text-center">
                  <Shield className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                  <p className="font-medium text-muted-foreground">
                    No permissions assigned
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This role has limited access to the system
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.permissions.map((permission) => (
                    <Badge key={permission._id} variant="secondary">
                      {permission.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Administrator>
  );
}

export default Role;
