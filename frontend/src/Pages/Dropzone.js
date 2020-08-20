import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import axios from "axios";
import ImageUploader from 'react-images-upload';

function MyDropzone() {
  const [pictures, setPictures] = useState([])
  const [image, setImage] = useState(false)

  const onDrop = (event) => {
    console.log(event[0])
    setPictures(event)
    setImage(true)
    if (pictures.length > 0) {
      console.log(pictures[0].name)
    }
  }

  const uploadFile = () => {
    axios(
      "https://8qohygpr1k.execute-api.ap-southeast-2.amazonaws.com/dev/test?fileName=" +
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
                // this.setState({
                //     uploadSuccess: "File upload successfull",
                //     error: undefined
                // });
                console.log(res)
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
  )
}

export default MyDropzone