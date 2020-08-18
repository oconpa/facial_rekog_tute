import React from 'react';
import MyDropzone from './Dropzone'
import Typography from '@material-ui/core/Typography';

function Upload() {
    return (
      <div style={{padding: 24}}>
        <Typography variant="h4" gutterBottom>
          Upload
        </Typography>
        <p style={{paddingBottom: 20}}>Use this page to add images to your machine learning gallery. You can either drag n drop or select the grey box to add images you would like to scan. Once you've selected your image, press scan and your image will be scanned and added to the gallery.</p>
        <MyDropzone />
      </div>
    )
}

export default Upload;
