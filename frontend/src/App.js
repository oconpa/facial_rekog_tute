import React, { useEffect } from 'react';
import './App.css';
import AWS from 'aws-sdk';
// AWS.config.update({
// });
const s3 = new AWS.S3();


function App() {
  // useEffect(() => {
  //   axios.post('https://b5u6iiey0f.execute-api.ap-southeast-2.amazonaws.com/dev', {
  //     header: {
  //       "Access-Control-Allow-Origin": true
  //     },
  //     body: 'test'
  //   }).then(x => console.log(x))
  // }, [])
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
    const test = {
    }
    s3.listBuckets(test, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });

  })
  
  return (
    <div className="App">
      <input type="file" onChange={test}/>
    </div>
  );
}

export default App;
