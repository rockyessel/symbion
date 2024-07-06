'use client';

import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

const HeliaFileUploader = ({ children }: Props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [cid, setCid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }
    setIsLoading(true);
    try {
      //   setCid(cid);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload to IPFS'}
      </button>
      {cid && <p>File uploaded! CID: {cid}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default HeliaFileUploader;
