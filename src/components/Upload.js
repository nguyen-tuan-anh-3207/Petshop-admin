import { Button } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none'
});

const UploadImage = (props) => {
  const [fileImage, setFileImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const { setImage } = props;

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFileImage(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setImage(reader.result);
    };
  };

  return (
    <>
      <label>
        <Input
          accept="image/*"
          multiple
          type="file"
          onChange={handleFileInputChange}
          value={fileImage}
        />
        <Button variant="contained" component="span">
          Tải ảnh
        </Button>
      </label>
      {previewImage && (
        <img
          src={previewImage}
          alt="chosen"
          style={{ marginTop: '32px', height: '300px', width: '300px' }}
        />
      )}
    </>
  );
};

export default UploadImage;
