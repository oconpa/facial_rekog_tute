import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Button from '@material-ui/core/Button';

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div>
      <div style={{width: 500, height: 500, boxShadow: '0 0 8px 0 rgba(0,0,0,0.2)', margin: 'auto'}}
        {...getRootProps()}>
        <input {...getInputProps()} />
        <p style={{padding: '10px', color: 'grey'}}>Drag 'n' drop an image here, or click to select</p>
      </div>
      <div style={{margin: 'auto', width: 100, paddingTop: 10}}>
        <Button variant="contained" color="primary">
          Scan
        </Button>
      </div>
    </div>
  )
}

export default MyDropzone