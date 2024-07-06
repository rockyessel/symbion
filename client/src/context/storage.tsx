'use client';

import { uploadFile, web3storage } from '@/lib/configs/web3-storage';
import { domainURL, fileUpload } from '@/lib/utils/helpers';
import { useAlert } from '@gear-js/react-hooks';
import axios from 'axios';
import {
  ChangeEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Props {
  children: ReactNode;
}

interface Web3StorageProps {
  handleUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmission: (event: SyntheticEvent) => Promise<void>;
  handleRemoveSelectedFiles: (name: string[]) => void;
  handleSelection: (file: File, type: 'select' | 'deselect') => void;
  handleStorageFileSelection: (
    fileUrl: string,
    type: 'select' | 'deselect'
  ) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
  handleInsetFilesUrls: () => string[];
  uploadByFileURL: (file: File) => Promise<void>;
  isInCheckState: boolean;
  selectedStorageFiles: string[];
  selectedFiles: File[];
  files: File[];
  CIDs: string[];
  isUploadSuccess: boolean;
}

const Web3StorageContext = createContext<Web3StorageProps>({
  handleUpload: (_event) => {},
  handleSubmission: (_event) => Promise.resolve(),
  handleRemoveSelectedFiles: (_name) => {},
  handleSelection: (_file, _type) => {},
  handleStorageFileSelection: (_fileUrl, _type) => {},
  setFiles: () => {},
  uploadByFileURL: (_file) => Promise.resolve(),
  handleInsetFilesUrls: () => [],
  isInCheckState: false,
  selectedStorageFiles: [],
  selectedFiles: [],
  files: [],
  CIDs: [],
  isUploadSuccess: false,
});

export const StorageContextProvider = ({ children }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [CIDs, setCIDs] = useState<string[]>([]);
  const [selectedStorageFiles, setSelectedStorageFiles] = useState<string[]>(
    []
  );
  const [isInCheckState, setIsInCheckState] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const alert = useAlert();

  // const getAllUserFiles

  console.log('CIDs: ', CIDs);

  const handleInsetFilesUrls = () => {
    if (CIDs.length > 0) {
      console.log('CIDs: ', CIDs);
      return CIDs;
    }
    return [];
  };

  const handleStorageFileSelection = (
    fileUrl: string,
    type: 'select' | 'deselect'
  ) => {
    setIsInCheckState(true);
    if (type === 'select') {
      if (selectedStorageFiles.includes(fileUrl)) {
        setSelectedStorageFiles((prevSelectedFilesUrl) =>
          prevSelectedFilesUrl.filter((url) => url !== fileUrl)
        );
      }
      setSelectedStorageFiles((prevSelectedFilesUrl) => [
        ...prevSelectedFilesUrl,
        fileUrl,
      ]);
    } else if (type === 'deselect') {
      setSelectedStorageFiles((prevSelectedFilesUrl) =>
        prevSelectedFilesUrl.filter((url) => url !== fileUrl)
      );
    }
  };

  console.log({ files });

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.files) {
      const selectedFiles = Array.from(target.files);
      const arr = [...files, ...selectedFiles];
      const filesArr: File[] = Array.prototype.slice.call(arr);
      if (filesArr.length > 10) {
        alert.error('Upload limit is 4.');
        return;
      }
      setFiles(filesArr);
    }
  };

  const uploadByFileURL = async (file: File) => {
    if (!file) {
      alert.error('No File');
      return;
    }

    // const storageId: Id<'_storage'> = await fileUpload(
    //   fileMimeTypeSetter(file)
    // );

    // console.log('storageId: ', storageId);

    // const fileId = await addFile({
    //   storageId,
    //   userId: user?._id!,
    //   name: file.name,
    //   extension: file.name ? String(file.name.split('.').pop()) : '',
    //   mimeType: file.type,
    // });

    // if (fileId) {
    //   alert.success('Files uploaded successfully.');
    // }
  };


  const handleSubmission = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      setIsUploadSuccess(true);
      console.log('files length: ', files.length);
      if (files) {
        const f = alert.loading('Uploading file(s)...');

        try {
          const response = await fileUpload(files);
          const { success, payload, msg } = response;
          if (success) {
            setCIDs([...payload]);
            alert.success(msg);
          }
        } catch (error) {
          console.log(error);
        } finally {
          alert.remove(f);
          setFiles([])
        }
      }
    } catch (error) {
      const err = error as any;
      console.error(`Failed to upload. Error: ${err.message}`);
    }
  };

  const handleSelection = (file: File, type: 'select' | 'deselect') => {
    setIsInCheckState(true);
    if (type === 'select') {
      setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
    } else if (type === 'deselect') {
      setSelectedFiles((prevSelectedFiles) =>
        prevSelectedFiles.filter((selectedFile) => selectedFile !== file)
      );
    }
  };

  const handleRemoveSelectedFiles = (names: string[]) => {
    const updatedFiles = files.filter((file) => !names.includes(file.name));
    setFiles(updatedFiles);

    const updatedSelectedFiles = selectedFiles.filter(
      (file) => !names.includes(file.name)
    );
    setSelectedFiles(updatedSelectedFiles);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedFiles.length === 0) {
        setIsInCheckState(false);
      }
    }
  }, [selectedFiles]);

  const values: Web3StorageProps = {
    handleUpload,
    handleSubmission,
    handleRemoveSelectedFiles,
    handleStorageFileSelection,
    handleSelection,
    setFiles,
    handleInsetFilesUrls,
    uploadByFileURL,
    isInCheckState,
    isUploadSuccess,
    selectedStorageFiles,
    selectedFiles,
    CIDs,
    files,
  };

  return (
    <Web3StorageContext.Provider value={values}>
      {children}
    </Web3StorageContext.Provider>
  );
};

export const useWeb3Storage = () => useContext(Web3StorageContext);
