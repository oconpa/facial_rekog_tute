<img src='/img/Amazon_event.png' width="800" height="400" />

# Facial Rekognition Workshop

> If you’ve built an application using AWS in the past or understand key cloud concepts, this workshop is suited for you. You will use AWS Rekognition to build an online gallery of ML detections, and use AWS services to scan, detect and draw data science inferences from the scans.

> Machine Learning/Facial Detection


***ML APP DEMO***


![Farmers Market Finder Demo](img/hHv0y1ayU9.gif)

---
<br />

## Table of Contents

- [Setting up your Development Environment](#setting-up-your-development-environment)
  - [Provisioning your Cloud 9 IDE](#provisioning-your-cloud-9-ide)
  - [Setting up your Cloud 9 w/ React application](#setting-up-your-cloud-9-w/-react-application)
<br />

---
<br />

## Setting up your Development Environment
<br />

### Provisioning your Cloud 9 IDE
<br />

1. Goto your AWS console via this link: https://aws.amazon.com/

2. Search up 'Cloud 9' in the search bar, and click on the first option.

3. Click 'Create Environment'

4. Set the **name** of your environment to be 'MLWorkshop'.\
   Click 'Next Step'.\
   Under 'Instance Type' select 'Other instance type', and search for 't3.medium' in the dropdown search.

5. Leave everything else as default.\
   Click 'Next Step'.\
   Click 'Create Environment'.

### Setting up your Cloud 9 w/ React application
<br />

1. Clone the current repository to your Cloud9 IDE.
   
   ```shell
   git clone https://github.com/oconpa/facial_rekog_tute.git
   ```

2. Install yarn
   ```shell
   npm install -g yarn
   ```

3. Move into the cloned directory, and install all required packages. 

   ```shell
   cd frontend
   yarn
   ```

5. Run the React application
   ```shell
   yarn start
   ```
   
6. Preview your Web Application
   
   After the app has compiled successfully, click 'Tools' in the toolbar up top, click 'Preview' and finally click 'Preview Running Application'. 
   Open the preview in another tab by clicking the arrow / box button on the right of the search bar. 
   
![ttystudio GIF](https://raw.githubusercontent.com/chjj/ttystudio/master/img/example.gif)

**You should see a basic web app in your browser! However, there is currently no functionality. Let's use AWS to fix this!**

---

## Step 1: Setup and Expose the Backend

1. Provision an s3 to store our images and ml results.

Create a new bucket with whatever name you desire. We will assume throughout this tutorial that you name your bucket -> facial-detection-<Your Full Name>

2. Create a lambda named facial-rekog.

Next we will setup our lambda with the correct imports and variables to be used later. Copy the following code and edit the bucket name to match the bucket you created above.

'''python
import boto3
import json
from botocore.exceptions import ClientError

client = boto3.client('rekognition')
s3 = boto3.client('s3')
bucket_name = "facial-detection-<Your Full Name>"
expiration = 120
'''

3. Exposing upload.

Uploading involves creating a route and exposing it on lambda to serve the purpose of saving along with it's Machine Learning detection results to the s3. To do this we must first provide the relevant code on the lambda. Copy the following code and add it to your handler.

'''python
def handler(event, context):
    if (event['path'] == '/upload'):
        try:
            response = s3.generate_presigned_url(
                        'put_object',
                        Params={
                            'Bucket': bucket_name,
                            'Key': event['queryStringParameters']['fileName'],
                            'ContentType': 'multipart/form-data'
                        },
                        ExpiresIn=expiration)
        except ClientError as e:
            logging.error(e)
            return None

        return {
            'statusCode': 200,
            'headers': {
                "access-control-allow-origin": "*"
            },
            'body': json.dumps(response)
        }
'''

3a. Exposng the route via API Gateway.

With relevant upload route now added to your lambda it's time to expose this the route on API Gateway. To do this we need to:
- Create a new public REST API from the API service.

- Once create let's add our first method to our first resource. Create a resource named upload, and attach a GET method to it.

- Once attached we now need to point our API to the lambda and finally deploy it.

- After deploying the API it's can be used in our app. Navigate to the deployed section of API Gateway copying the link to be used in your app.


1. Edit react frontend
2. Make s3 bucket and push react build to it
3. Create a lambda from cli and attach it to API Gateway to expose

aws iam create-role --role-name facial-rekognise --cli-input-json skeleton.json
aws lambda create-function --function-name facial-rekog --runtime python3.8 --role arn:aws:iam::080284742429:role/facial_rekog --handler lambda.handler --zip-file fileb://lambda.zip

4. Add code to lambda with rekognition
5. App complete
7. Create a gallery which loads an s3 library of previously uploaded image with rekognition data

---
