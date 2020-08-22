import React, { useState, useEffect } from 'react';
import Gallery from 'react-grid-gallery';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
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
        // const IMAGES = []
        axios({
            method: "GET",
            url: 'https://8qohygpr1k.execute-api.ap-southeast-2.amazonaws.com/dev/listgallery',
        }).then(x => {
            setIMAGES(x.data)
        })
    }, [])
    
    const deleteImage = () => {
        axios({
            method: "DELETE",
            url: 'https://8qohygpr1k.execute-api.ap-southeast-2.amazonaws.com/dev/delete',
            data: { file: IMAGES[currentImage].src }
        }).then(x => {
            window.location.reload(false);
        })
    }
    
    const toggleDrawer = (open) => (event) => {
        console.log(open)
        console.log(event)
        setDrawer(open);
    };

    const showDetection = (event) => {
        setLoading(true)
        axios({
            method: "POST",
            url: 'https://8qohygpr1k.execute-api.ap-southeast-2.amazonaws.com/dev/detect',
            data: IMAGES[event].src.split('/')[3].split('?')[0],
        })
        .then(res => {
            console.log(res)
            // setImage(false)
            if (res.data.FaceDetails.length === 0) {
                setScan(null)
            } else {
                setScan(res.data.FaceDetails)
            }
            setLoading(false)
        })
        setDrawer(true);
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
            <Gallery images={IMAGES} onSelectImage={showDetection}
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