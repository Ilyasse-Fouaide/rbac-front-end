import React, { Suspense, lazy } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import {
  Users,
  Shield,
  Info,
  Calendar,
  Trash2,
  UserRound,
  AlertCircle,
  ChevronLeft,
  Plus,
  ArrowUpRight,
} from 'lucide-react';

import UseFetchRole from '../hooks/useFetchRole';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Administrator from '../components/Administrator';
import useDeleteRole from '../hooks/useDeleteRole';
import { useToast } from '@/hooks/use-toast';
const AssingUserToRole = lazy(() => import('../components/AssingUserToRole'));

const visibleUsers = 4;

// Skeleton Loading Component
function RoleSkeleton() {
  return (
    <div className="mx-auto w-full max-w-4xl animate-pulse space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-8 w-28 rounded-lg bg-muted/50 md:w-48" />
          <div className="h-4 w-44 rounded-lg bg-muted/50 md:w-64" />
        </div>
        <div className="h-10 w-10 rounded-lg bg-muted/50" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-32 rounded-lg bg-muted/50" />
                <div className="mt-2 h-6 w-16 rounded-lg bg-muted/50" />
              </div>
              <div className="h-8 w-8 rounded-lg bg-muted/50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-32 rounded-lg bg-muted/50" />
                <div className="mt-2 h-6 w-16 rounded-lg bg-muted/50" />
              </div>
              <div className="h-8 w-8 rounded-lg bg-muted/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Permissions Section Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-6 w-48 rounded-lg bg-muted/50" />
            <div className="h-24 rounded-lg bg-muted/50" />
          </div>
        </CardContent>
      </Card>

      {/* Users Grid Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-6 w-48 rounded-lg bg-muted/50" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted/50" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded-lg bg-muted/50" />
                    <div className="h-3 w-1/2 rounded-lg bg-muted/50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RoleNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-none bg-background shadow-none">
        <CardContent className="p-6 text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>

          {/* Title */}
          <h1 className="mb-3 text-2xl font-bold text-primary">
            Role Not Found
          </h1>

          {/* Description */}
          <p className="mb-6 text-muted-foreground">
            The role you are looking for does not exist or may have been
            deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate('/admin/roles', { replace: true })}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Go Back to Roles
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/', { replace: true })}
              className="w-full"
            >
              Go to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TabLayout({ children, className }) {
  return (
    <div className={cn(`mx-auto w-full max-w-full space-y-6`, className)}>
      {children}
    </div>
  );
}

function Role() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'display' });
  const queryClient = useQueryClient();
  const [assignUserDialogOpen, setIsAssignUserDialogOpen] =
    React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const { data, isPending, isError } = useQuery({
    queryKey: ['roles', roleId],
    queryFn: () => UseFetchRole(roleId),
  });

  const deleteRoleMutation = useMutation({
    mutationFn: useDeleteRole,
    onSuccess: () => {
      toast({
        description: 'Role deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      navigate('/admin/roles'); // Redirect to roles list after deletion
    },
    onError: () => {
      toast({
        description: 'Failed to delete role',
      });
    },
  });

  if (isError) {
    return <RoleNotFound />;
  }

  const handleDeleteRole = () => {
    deleteRoleMutation.mutate(roleId);
  };

  if (isPending) {
    return <RoleSkeleton />;
  }

  return (
    <Administrator>
      <div className="mb-5">
        <Button
          variant="link"
          className="p-0"
          onClick={() => navigate('/admin/roles')}
        >
          <ChevronLeft
            className="me-1 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Go back
        </Button>
      </div>
      {/* Tabs */}
      <Tabs defaultValue={tab} value={tab}>
        <TabLayout className="mb-10">
          <ScrollArea className="max-w-[270px] sm:max-w-full">
            <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0">
              <TabsTrigger
                value="display"
                onClick={() => setTab('display')}
                className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
              >
                Display
              </TabsTrigger>
              <TabsTrigger
                value="permissions"
                onClick={() => setTab('permissions')}
                className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
              >
                Permissions
              </TabsTrigger>
              <TabsTrigger
                value="manage-members"
                onClick={() => setTab('manage-members')}
                className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
              >
                Manage Members
                <Badge
                  className="ms-1.5 h-5 w-5 justify-center"
                  variant="secondary"
                >
                  {data.users.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" className="h-0" />
          </ScrollArea>
        </TabLayout>
        <TabsContent value="display">
          <TabLayout>
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
                  <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
                    <Calendar className="h-4 w-4" />
                    {data.created_at
                      ? `Created ${new Date(data.created_at).toLocaleDateString()}`
                      : 'Unknown'}
                  </div>
                </div>
                <p className="flex w-full items-center gap-2 text-sm text-muted-foreground md:text-base">
                  <Info className="h-4 w-4 shrink-0" />
                  {data.description ?? 'No description'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 />
                </Button>
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

            {/* Permissions Section */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Permissions</h2>
                    <Shield className="h-5 w-5 text-muted-foreground" />
                  </div>
                  {data.permissions.length === 0 ? (
                    <div className="rounded-lg bg-muted/50 p-2 py-8 text-center">
                      <Shield className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                      <p className="md:text-bas text-sm font-medium text-muted-foreground">
                        No permissions assigned
                      </p>
                      <p className="text-xs text-muted-foreground md:text-sm">
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
                      <Badge variant="outline">
                        <button className="-mx-1.5 -my-px inline-flex size-5 shrink-0 items-center justify-center rounded-[inherit] p-0 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70">
                          <Plus size={14} strokeWidth={3} aria-hidden="true" />
                        </button>
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Users Grid */}
            <Card>
              <CardContent className="relative p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold">Members</h2>
                      <Badge variant="outline" className="font-normal">
                        {data.users.length} Active
                      </Badge>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Add new item"
                        onClick={() => setIsAssignUserDialogOpen(true)}
                      >
                        <Plus strokeWidth={2} aria-hidden="true" />
                      </Button>
                      <Suspense>
                        {assignUserDialogOpen && (
                          <AssingUserToRole
                            roleId={roleId}
                            roleName={data.name}
                            setIsAssignUserDialogOpen={
                              setIsAssignUserDialogOpen
                            }
                            assignUserDialogOpen={assignUserDialogOpen}
                          />
                        )}
                      </Suspense>
                    </div>
                  </div>
                  {data.users.length === 0 ? (
                    <div className="rounded-lg bg-muted/50 p-2 py-8 text-center">
                      <UserRound className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                      <p className="md:text-bas text-sm font-medium text-muted-foreground">
                        No members assigned
                      </p>
                      <p className="text-xs text-muted-foreground md:text-sm">
                        This role has no user assigned to
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {data.users.slice(0, visibleUsers).map((user) => (
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
                            <p className="text-sm text-muted-foreground">
                              Member
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {data.users.length > 4 && (
                  <>
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
                      <Button
                        variant="link"
                        onClick={() => setTab('manage-members')}
                      >
                        Show more
                        <ArrowUpRight />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabLayout>
        </TabsContent>
        <TabsContent value="permissions">
          <p className="p-4 text-center text-xs text-muted-foreground">
            Content for Tab 2
          </p>
        </TabsContent>
        <TabsContent value="manage-members">
          <p className="p-4 text-center text-xs text-muted-foreground">
            Content for Tab 3
          </p>
        </TabsContent>
      </Tabs>

      {/* Delete Role Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              role and remove all associated permissions and members.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRole}
              disabled={deleteRoleMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteRoleMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Administrator>
  );
}

export default Role;
