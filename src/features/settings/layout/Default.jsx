import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function Default({ page, pageTitle, pageDescription, children }) {
  return (
    <section className="grid gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={'/settings/general'}>Account settings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full max-w-6xl">
        <h1 className="leading-0 text-3xl font-semibold">{pageTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{pageDescription}</p>
      </div>
      {children}
    </section>
  );
}

export default Default;
