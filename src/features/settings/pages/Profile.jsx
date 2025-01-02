import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Avatar from '@features-avatar/components/Avatar';
import { useAuth } from '@features-auth/components/AuthProvider';

import Default from '../layout/Default';
import UploadDialog from '../components/UploadDialog';
import DeleteAccount from '../components/DeleteAccount';
import UpdateEmail from '../components/UpdateEmail';

const page = 'Profile';
const pageTitle = 'Profile';
const pageDescription = `Manage Settings for your ${import.meta.env.VITE_APP_NAME} Profile`;

function Profile() {
  const { user } = useAuth();

  return (
    <Default
      page={page}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    >
      <Card>
        <div className="flex items-start gap-6 p-6">
          <div className="shrink-0">
            <Avatar user={user} size="64" className="rounded-md" />
          </div>
          <div className="grid gap-2">
            <div className="flex flex-col space-y-1.5">
              <h2 className="text-2xl font-bold leading-none tracking-tight">
                Profile picture
              </h2>
              <p className="text-sm text-muted-foreground">
                We support PNGs, JPG and GIFs
              </p>
            </div>
            <UploadDialog />
          </div>
        </div>
      </Card>
      <UpdateEmail user={user} />
      <Separator />
      <DeleteAccount />
    </Default>
  );
}

export default Profile;
