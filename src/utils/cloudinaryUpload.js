import axios from 'axios';
import imageCompression from 'browser-image-compression';

const uploadToCloudinary = async (file, setUploadProgress, maxSizeKB = 800) => {
  try {
    const maxSizeMB = maxSizeKB / 1024;

    const options = {
      maxSizeMB: maxSizeMB,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const data = new FormData();
    data.append("file", compressedFile);
    data.append("upload_preset", "pfendx01");
    data.append("folder", "Saburi");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dwxtuqnty/upload`,
      data,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (setUploadProgress) {
            setUploadProgress(percentCompleted);
          }
        }
      }
    );

    if (response.status === 200) {
      return response.data.url;
    } else {
      throw new Error('Failed to upload image');
    }
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};

export default uploadToCloudinary;
