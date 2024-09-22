import React, { useState } from 'react';
import axios from 'axios';
import api from '../../../config/api';
import { Button, CircularProgress, Typography, Stack, Box } from '@mui/material';

function ImageUpload({onUpload}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);


  const fetchUploadParams = async () => {
    try {
      const response = await api.get('/api/admin/cloudinary/upload-params');
      return response.data;
    } catch (error) {
      console.error('Error fetching upload params:', error);
      throw error;
    }
  };

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      try {
        const { signature, timestamp, upload_preset,api_key } = await fetchUploadParams();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('upload_preset', upload_preset);
        formData.append('api_key', api_key);
        setUploading(true);

        const response = await axios.post('https://api.cloudinary.com/v1_1/dvo5yvrbt/image/upload', formData);
        setImageUrl(response.data.secure_url);
        onUpload(response.data.secure_url)
        setUploading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploading(false);
      }
    }
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Upload Image
      </Typography>
      <input
        type="file"
        onChange={handleImageChange}
        style={{ marginBottom: 16 }}
      />

      {uploading && <CircularProgress />}
      
    </Box>
  );
}

export default ImageUpload;
