import React from 'react';
import Typography from '@material-ui/core/Typography';
import ImageGridList from './ImageGridList'

function Gallery() {
    return (
      <div style={{padding: 24}}>
        <Typography variant="h4" gutterBottom>
          Gallery
        </Typography>
        <p>Select an image by select the top left tick to analyse it's facial detection response</p>
        <ImageGridList />
      </div>
    )
}

export default Gallery;
