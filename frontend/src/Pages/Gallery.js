import React from 'react';
import Typography from '@material-ui/core/Typography';
import ImageGridList from './ImageGridList'

function Gallery() {
    return (
      <div style={{padding: 24}}>
        <Typography variant="h4" gutterBottom>
          Gallery
        </Typography>
        <ImageGridList />
      </div>
    )
}

export default Gallery;
