import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import ImageUploader from 'react-images-upload';
import SimpleAccordion from '../Components/Acordion'
import { useToasts } from 'react-toast-notifications'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import short from 'short-uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function MyDropzone() {
  const classes = useStyles();
  const [pictures, setPictures] = useState([])
  const [image, setImage] = useState(false)
  const [scan, setScan] = useState([])
  const { addToast } = useToasts()
  const [loading, setLoading] = useState(false)
  const [uuid, setUuid] = useState(false)

  const onDrop = (event) => {
    setUuid(short.generate())
    setPictures(event)
    setImage(true)
  }

  const uploadFile = async() => {
    setLoading(true)

    const apiURL = 'REPLACE ME'

    // Request a presigned URL that will enable us to securly PUT to S3
    const uploadURL = `${apiURL}/upload/?fileName=${uuid}`
    const res = await fetch(uploadURL)
    const url = await res.json()
    
    // PUT the file directly to S3
    await fetch(url, {
                        method: 'put',
                        body: pictures[0],
                        headers: new Headers({
                          'Content-Type': 'multipart/form-data'
                        })
                      })
    
    const detectURL = `${apiURL}/detect`
    
    // Invoke Detection on the new file
    const detectionResult = await fetch(detectURL, { method: 'POST', body: uuid })
    const detectionData = await detectionResult.json()
    
    // Populate Data from response into accordian.
    setScan(detectionData.FaceDetails)
    addToast('Saved To Gallery', { appearance: 'success', autoDismiss: true })
    setImage(false)
    setLoading(false)
  }
  
  return (
    <div>
      { loading ? 
        <div className={classes.root}>
          <CircularProgress style={{margin: 'auto'}} />
        </div>
        :
        <SimpleAccordion data={scan}/>
      }
      <div style={{width: 400, margin: 'auto'}}>
        <ImageUploader
          withPreview={true}
          withIcon={true}
          buttonText='Choose images'
          onChange={onDrop}
          imgExtension={['.jpg', '.gif', '.png']}
          maxFileSize={5242880}
          singleImage={true}
        />
        { image ?
        <div style={{margin: 'auto', width: 100}}>
          <Button variant="contained" color="primary" onClick={uploadFile}>
            Scan
          </Button>
        </div>
        : null
        }
      </div>
    </div>
  )
}

export default MyDropzone