'use client';

import DataOwnershipKey from '@/components/common/data-ownership-key';

const DataPage = () => {
  return (
    <section className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-medium'>Empower Your Data Ownership</h2>
        <p className='max-w-4xl'>
          At Symbion, we are committed to ensuring you have full control and
          ownership of your data. With our latest advancement, you can
          seamlessly transfer your data from Symbion to any website of your
          choice, enhancing your autonomy. Rather than relying on the
          traditional RESTful API, we provide you with your very own GraphAPI,
          enabling you to query all your content—blogs, articles, posts,
          organizations, and more—directly from Symbion.
        </p>
      </div>

      <div>
        <p>
          In order to start, it is important that you keep your GraphQL endpoint
          and it key a secret.
        </p>
      </div>

      <DataOwnershipKey />
    </section>
  );
};

export default DataPage;
