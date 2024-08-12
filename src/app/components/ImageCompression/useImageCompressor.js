"use client"
import { useState } from 'react';
import imageCompression from 'browser-image-compression';

const useImageCompressor = () => {
  const [compressedFile, setCompressedFile] = useState(null);
  const [error, setError] = useState(null);

  const compressImage = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      setCompressedFile(compressedFile);
      console.log('Original file size:', file.size / 1024, 'KB');
      console.log('Compressed file size:', compressedFile.size / 1024, 'KB');
      return compressedFile;
    } catch (err) {
      setError(err);
      console.error('Error during compression:', err);
    }
  };

  return { compressedFile, compressImage, error };
};

export default useImageCompressor;