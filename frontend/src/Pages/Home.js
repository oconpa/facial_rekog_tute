import React, { useEffect } from 'react';
import AWS from 'aws-sdk';
const albumBucketName = "facial-detection-pat";
// const bucketRegion = "ap-southeast-2";
// const IdentityPoolId = "IDENTITY_POOL_ID";
const s3 = new AWS.S3();


function App() {
  
  function listAlbums() {
    s3.listObjects({ Bucket: albumBucketName }, function(err, data) {
      if (err) {
        return alert("There was an error listing your albums: " + err.message);
      } else {
        return alert(data);
      }
    });
  }
  
  const test = event => {
    const params = {
      Bucket: 'facial-detection-pat',
      Key: 'test',
      Body: event.target.files[0]
    }
    s3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }
  
  useEffect(() => {
    listAlbums()
  })
  
  return (
    <div className="App">
      <p>Upload an image here to be processed</p>
      <input type="file" onChange={test}/>
    </div>
  );
}

export default App;
