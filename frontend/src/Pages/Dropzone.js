import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import axios from "axios";
import ImageUploader from 'react-images-upload';
import SimpleAccordion from '../Components/Acordion'
import { useToasts } from 'react-toast-notifications'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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

  const onDrop = (event) => {
    console.log(event[0])
    setPictures(event)
    setImage(true)
    if (pictures.length > 0) {
      console.log(pictures[0].name)
    }
  }

  const uploadFile = () => {
    setLoading(true)
    axios(
      "https://8qohygpr1k.execute-api.ap-southeast-2.amazonaws.com/dev/upload?fileName=" +
            pictures[0].name
    ).then(response => {
        // Getting the url from response
        console.log(response)
        const url = response.data;

        // Initiating the PUT request to upload file  
        console.log(pictures[0])
        axios({
            method: "PUT",
            url: url,
            data: pictures[0],
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(res => {
              axios({
                method: "POST",
                url: 'https://8qohygpr1k.execute-api.ap-southeast-2.amazonaws.com/dev/detect',
                data: pictures[0].name,
              })
              .then(res => {
                console.log(res.data.FaceDetails)
                setImage(false)
                setScan(res.data.FaceDetails)
                addToast('Saved To Gallery', { appearance: 'success', autoDismiss: true })
                setLoading(false)
              })
              .catch(err => {
                addToast(err, { appearance: 'error', autoDismiss: true })
                console.log(err)
              });
            })
            .catch(err => {
                // this.setState({
                //     error: "Error Occured while uploading the file",
                //     uploadSuccess: undefined
                // });
                console.log(err)
            });
    });
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