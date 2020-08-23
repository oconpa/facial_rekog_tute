import React from 'react';
import Typography from '@material-ui/core/Typography';
import ImageGridList from './ImageGridList'
import Charts from './Charts'

function Gallery() {
    return (
      <div style={{padding: 24, display: 'inline-block', width: '95%'}}>
        <div>
        <Typography variant="h4" gutterBottom>
          Gallery
        </Typography>
          <p>Select an image by select the top left tick to analyse it's facial detection response. On the bottom of this page are also some charts performing data anaysis on the images you upload.
          </p>
        <ImageGridList />
        </div>
        <div>
          <Charts />
        </div>
      </div>
    )
}

export default Gallery;
