import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import axios from "axios";
import ImageUploader from 'react-images-upload';

function MyDropzone() {
  const [pictures, setPictures] = useState([])
  const [image, setImage] = useState(false)
  const [scan, setScan] = useState([])

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
              })
              .catch(err => {
                // this.setState({
                //     error: "Error Occured while uploading the file",
                //     uploadSuccess: undefined
                // });
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
      : <div>{scan.map(x => {
          console.log(x)
          return(
          <div>
            <h2>Box Detection</h2>
            {x.Emotions.map(y => {
              console.log(y)
              return(
                <li>{y.Type.toString() + ', ' + y.Confidence.toString()}</li>
                )    
            })}
          </div>
          )
      })}</div>
      }

    </div>
  )
}

export default MyDropzone