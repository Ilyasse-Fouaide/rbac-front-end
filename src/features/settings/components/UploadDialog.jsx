import React from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, AlertCircle, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useAuth } from '@features-auth/components/AuthProvider';
import UseUploadPFP from '../hooks/useUploadPFP';

function UploadDialog() {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const [error, setError] = React.useState(null);
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => UseUploadPFP(user.userId, formData),
    onMutate: () => {
      setError(null);
    },
    onSuccess: () => {
      setError(null);
      setOpen(false);
      // toaster to notify the user
      toast({
        description: 'Profile picture updated',
      });
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message || 'An unknown error occurred.';
      setError(message);
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('avatar', file);
      mutate(formData);
    },
    [mutate],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
    multiple: false,
    disabled: isPending,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-fit">
          <CloudUpload className="mr-2 h-4 w-4" />
          Upload image
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload image</DialogTitle>
          <DialogDescription>PNG, JPG, GIF up to 1MB</DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div
          {...getRootProps()}
          className={`${isDragActive ? 'bg-muted/50' : 'bg-background'} ${
            isPending ? 'cursor-not-allowed opacity-50' : ''
          } flex justify-center rounded-sm border-2 border-dashed border-muted-foreground/30 px-6 pb-6 pt-5 transition-all`}
        >
          <div className="space-y-1 text-center">
            <div className="flex justify-center">
              <div className="rounded-full border border-dashed border-primary/40 bg-primary/10 p-2.5">
                <div className="rounded-full border border-dashed border-primary bg-primary/15 p-2.5">
                  {isPending ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  ) : (
                    <svg
                      className="mx-auto h-6 w-6 text-primary"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <label htmlFor="file-upload">
                <span
                  className={`relative font-medium text-primary ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isPending ? 'Uploading...' : 'Upload Here'}
                </span>
                <input
                  {...getInputProps()}
                  id="file-upload"
                  disabled={isPending}
                />
                <span className="flex-grow pl-1 text-center">
                  {isPending ? '' : 'or drag and drop'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UploadDialog;
