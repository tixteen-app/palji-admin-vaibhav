import React, { useState } from 'react';
import axios from 'axios';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [originalVideoUrl, setOriginalVideoUrl] = useState('');
  const [compressedVideoUrl, setCompressedVideoUrl] = useState('');
  const [originalSize, setOriginalSize] = useState('');
  const [compressedSize, setCompressedSize] = useState('');
  const [status, setStatus] = useState('');
  const [videoPlayer, setVideoPlayer] = useState(null);

  // Handle video file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setOriginalVideoUrl(URL.createObjectURL(selectedFile)); // Video preview
      setOriginalSize(`${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`); // Display original size
    }
  };

  // Upload and compress video
  const handleSubmit = async () => {
    if (!file) return;

    setStatus('Uploading and compressing video...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pitamaasDOM'); // Your Cloudinary upload preset
    formData.append('folder', 'DOM'); // Optional folder for organization in Cloudinary
    formData.append('resource_type', 'video'); // Specify the resource type as video
    // Add transformations for compression
    formData.append('transformation', 'c_scale,w_640,fl_lossy,q_70'); // Cloudinary transformation (quality + scaling)
    
    try {
      // Upload video to Cloudinary with transformations
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dauy2kpez/upload', // Your Cloudinary URL
        formData
      );
      
      if (response.status === 200) {
        setStatus('Video uploaded and compressed successfully!');
        setCompressedVideoUrl(response.data.secure_url); // Display the compressed video
        setCompressedSize(`${(response.data.bytes / 1024 / 1024).toFixed(2)} MB`); // Compressed size
      } else {
        setStatus('Error during video upload.');
      }
    } catch (error) {
      setStatus('Error uploading video.');
      console.error(error);
    }
  };

  // Initialize the video.js player when a video is available
  React.useEffect(() => {
    if (originalVideoUrl || compressedVideoUrl) {
      const player = videojs('videoPlayer', {
        controls: true,
        preload: 'auto',
        responsive: true,
        fluid: true,
      });

      setVideoPlayer(player);
    }

    return () => {
      if (videoPlayer) {
        videoPlayer.dispose();
      }
    };
  }, [originalVideoUrl, compressedVideoUrl]);

  return (
    <div>
      <h1>Upload, Compress, and Compare Video</h1>

      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={!file}>
        Upload and Compress Video
      </button>

      <div>{status}</div>

      {/* Original video preview */}
      {originalVideoUrl && (
        <div>
          <h3>Before Compression</h3>
          <video
            id="videoPlayer"
            className="video-js vjs-default-skin"
            src={originalVideoUrl}
            controls
          />
          <div>Original Size: {originalSize}</div>
        </div> 
      )}

      {/* Compressed video preview */}
      {compressedVideoUrl && (
        <div>
          <h3>After Compression</h3>
          <video
            id="videoPlayer"
            className="video-js vjs-default-skin"
            src={compressedVideoUrl}
            controls
          />
          <div>Compressed Size: {compressedSize}</div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
