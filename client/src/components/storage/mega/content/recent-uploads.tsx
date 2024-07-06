'use client';

import { useState } from 'react';

import StorageFileCard from '../file/storage-card';

const RecentUploads = () => {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<any[]>([]);

  return (
    <div className='flex items-center flex-wrap gap-2'>
      {loading && <p>Loading...</p>}

      {!loading && files.length === 0 && <p>No files uploaded yet.</p>}

      {files.map((file, index) => (
        <StorageFileCard file={file} key={index} />
      ))}
    </div>
  );
};

export default RecentUploads;
