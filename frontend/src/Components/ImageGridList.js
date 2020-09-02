import React, { useState, useEffect } from 'react';
import Gallery from 'react-grid-gallery';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Drawer from '@material-ui/core/Drawer';
import SimpleAccordion from '../Components/Acordion'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    padding: 20
  },
}));

function ImageGridList() {
    const classes = useStyles();
    const [currentImage, setCurrentImage] = useState()
    const [IMAGES, setIMAGES] = useState([])
    const [drawer, setDrawer] = useState(false)
    const [scan, setScan] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        getGallery()
    }, [])
    
    async function getGallery(){
        const apiURL = 'REPLACE ME'
        const galleryURL = `${apiURL}/listgallery`
        const res = await fetch(galleryURL)
        const data = await res.json()
        setIMAGES(data)
    }
    
    const deleteImage = async() => {
        //Extract the image ID for deletion
        const imageId = IMAGES[currentImage].src.split("=")[0].split("/")[3].split("?")[0]
        const apiURL = 'REPLACE ME'
        const deleteURL = `${REPLACE ME}/delete/${imageId}`
        
        await fetch(deleteURL, { method: 'DELETE'})
        
        window.location.reload(false);
    }
    
    const toggleDrawer = (open) => (event) => {
        setDrawer(open);
    };

    const showDetection = async(event) => {
        setLoading(true)
        setDrawer(true)
        
        const apiURL = 'REPLACE ME'
        const detectURL = `${REPLACE ME}/detect`
        const imageId = IMAGES[event].src.split('/')[3].split('?')[0]
        
        const res = await fetch(detectURL, { method: 'POST', body: imageId })
        const data = await res.json()
        
        if (data.FaceDetails.length) {
            setScan(data.FaceDetails) 
        }else{
            setScan(null)
        }
        
        setLoading(false)
    }
    
    const onCurrentImageChange = (index) => {
        setCurrentImage(index)
    }
    
    const results = () => (
        loading ?
        <div className={classes.root}>
          <CircularProgress style={{margin: 'auto'}} />
        </div>
        :
        <SimpleAccordion data={scan}/>
    )

    return (
        <div>
            <Gallery images={IMAGES} 
                onSelectImage={showDetection}
                currentImageWillChange={onCurrentImageChange}
                customControls={[
                    <Button variant="contained" color="primary" onClick={deleteImage} startIcon={<DeleteIcon />} >
                        Delete
                    </Button>
                ]}
            />
            <Drawer anchor={'bottom'} open={drawer} onClose={toggleDrawer(false)}>
                <div>
                    {results()}
                </div>
            </Drawer>
        </div>
    )
}

export default ImageGridList;
