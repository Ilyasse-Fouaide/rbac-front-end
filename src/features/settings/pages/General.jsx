import Default from '../layout/Default';

const page = 'General';
const pageTitle = 'General';
const pageDescription = `Manage General Settings.`;

function General() {
  return (
    <Default
      page={page}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    >
      General
    </Default>
  );
}

export default General;
