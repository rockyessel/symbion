'use client';

import { useWeb3Storage } from '@/context/storage';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

const UploadByFileURL = () => {
  const [inputValue, setInputValue] = useState('');
  const { uploadByFileURL } = useWeb3Storage();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleUploadFile = async () => {
    try {
      const response = await axios.get(inputValue, { responseType: 'blob' });
      console.log('response: ', response.data);
      const file = new File([response.data], 'filename', {
        type: response.data.type,
      });
      console.log('file: ', file);
      await uploadByFileURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Enter URL'
      />
      <button onClick={handleUploadFile}>Upload</button>
    </div>
  );
};

export default UploadByFileURL;
