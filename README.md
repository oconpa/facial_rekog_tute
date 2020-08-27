<img src='/img/Amazon_event.png' width="800" height="400" />

# Facial Rekognition Workshop

> If you’ve built an application using AWS in the past or understand key cloud concepts, this workshop is suited for you. You will use AWS Rekognition to build an online gallery of ML detections, and use AWS services to scan, detect and draw data science inferences from the scans.


***ML APP DEMO***


![App Demo](img/hHv0y1ayU9.gif)

***App Link (Demo)***

http://facial-hosting.s3-website-ap-southeast-2.amazonaws.com/

## Table of Contents

- [Setting up your Development Environment](#setting-up-your-development-environment)
  - [Provisioning your Cloud 9 IDE](#provisioning-your-cloud-9-ide)
  - [Setting up your Cloud 9 with React application](#setting-up-your-cloud-9-with-react-application)
- [Step 1 Provision both an s3 and lambda resource](#step-1-provision-both-an-s3-and-lambda-resource)
- [Step 2 Expose Upload Route](#step-2-expose-upload-route)
  - [Exposing the route via API Gateway](#exposing-the-route-via-api-gateway)
- [Step 3 Connecting the React Frontend to the Upload Route Backend](#step-3-connecting-the-react-frontend-to-the-upload-route-backend)
- [Challenge Time](#challenge-time)
  - [Challenge 1 detect](#challenge-1-detect)
  - [Challenge 2 delete](#challenge-2-delete)
  - [Challenge 3 listgallery](#challenge-3-listgallery)
  - [Challenge 4 charts](#challenge-4-charts)

<br />

## Definitions
|Term|Description|
|----|-----------|
|AWS| Amazon Web Services|
|S3| Simple Storage Solution, object storage service, also can be used to host static websites|
|Cloud 9| An IDE that runs in a browser inside your AWS account|
|Lambda| AWS's servlerss option, upload code that runs without users needed to provision servers|
|Rekognition| ML service interface in AWS|
|API Gateway| A proxy to aws services that enables an authentigation check point|
|ML| Machine Learning|

## Overview

With a rising potential on what machine learning has to offer, AWS offers an easy plug-n-play module to integrate machine learning services very easily. AWS Rekognition is AWS's inbuilt ML service.

## Setting up your Development Environment

Cloud 9 is AWS's cloud IDE making developing on the cloud much easier. Forget about access keys and secrets, which a cloud 9 environment you can develop from within the VPC.

### Provisioning your Cloud 9 IDE

1. Goto your AWS console via this link: https://aws.amazon.com/

2. Search up 'Cloud 9' in the search bar, and click on the first option.

3. Click 'Create Environment'

4. Set the **name** of your environment to be 'MLWorkshop'.\
   Click 'Next Step'.\
   Under 'Instance Type' select 'Other instance type', and search for 't3.small' in the dropdown search.

5. Leave everything else as default.\
   Click 'Next Step'.\
   Click 'Create Environment'.

### Setting up your Cloud 9 with React application

1. Clone the current repository to your Cloud9 IDE.
   
   ```shell
   git clone https://github.com/oconpa/facial_rekog_tute.git
   ```

2. Move into the cloned directory, and install all required packages. 

   ```shell
   cd facial_rekog_tute/frontend
   npm install
   ```

3. Run the React application
   ```shell
   npm run start
   ```
   
4. Preview your Web Application
   
   After the app has compiled successfully, click **Tools** in the toolbar up top, click **Preview** and finally click **Preview Running Application**. 
   Open the preview in another tab by clicking the arrow / box button on the right of the search bar.

![Preview App](img/preview.png)
   
**You should see a basic web app in your browser! However, there is currently no functionality. Let's use AWS to fix this!**

---

## Create an S3 + CORS

1. From the aws console, search up 'S3' in the search bar, and click on the first option.  If you can't find it click [here](https://s3.console.aws.amazon.com/s3/home?region=ap-southeast-2#)

2. Click 'Create Bucket'

3. Name your bucket

```code
facial-detection-**'Replace with your full name'**
```

4. Click 'Create'

![Create S3](img/S3Create.png)

5. Goto te bucket you just created, and click on the **Permission** tab. Then to **CORS configuration** and paste the following code:

```html
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

5. Click 'Save'

![CORS Image](img/cors.png)

## Create the lambda (backend)

1. From the aws console, search up 'Lambda' in the search bar, and click on the first option.

2. Click 'Create function'

3. On the create function page:

```
- Name your function **facial-detect**
- Runtime **Python 3.8**
```

4. Click **Create function**

![Lambda Image](img/lambdaCreate.png)

5. Once created click into the **Permissions** tab. Under **Execution role** will be a role name, Click it.

6. In the newly opened window click on the blue button **Attach policies**. In the search bar search for the following policies, checking the boxes once you've found them.

```
- AmazonS3FullAccess
- AmazonRekognitionFullAccess
```

7. Click **Attach policy**

8. After attaching the policy go back to your lambda and under the configuration tab in the function code paste:

```python
import boto3
import json

rekognition = boto3.client('rekognition')
s3 = boto3.client('s3')
bucket_name = "facial-detection-REPLACEME"
expiration = 120

def lambda_handler(event, context):
    #print(event)
    path = event['path']
    body = ''
    if (path == '/upload'):
        body = doUpload(event)
    elif (path == '/detect'):
        body = doFacialDetection(event)
    elif (path == '/delete'):
        body = doDelete(event)
    elif (path == '/listgallery'):
        body = doListGallery(event)
    elif (path == '/charts'):
        body = doChart(event)
    
    return {
            'statusCode': 200,
            'headers': {
                "access-control-allow-origin": "*",
                "access-control-allow-methods": "*"
                
            },
            'body': body
    }
    

# Upload method
def doUpload(event):
    response = s3.generate_presigned_url(
        'put_object',
        Params={
            'Bucket': bucket_name,
            'Key': event['queryStringParameters']['fileName'],
            'ContentType': 'multipart/form-data'
        },
        ExpiresIn=expiration)
        
    body = json.dumps(response)
    return body

# Pass a s3 item refernce to 
def doFacialDetection(event):
    response = rekognition.detect_faces(
        Image={
            'S3Object': {
                'Bucket': bucket_name,
                'Name': event['body'],
            }
        },
        Attributes=['ALL']
    )
    
    s3.put_object(
        Body=(bytes(json.dumps(response).encode('UTF-8'))),
        Bucket=bucket_name,
        Key=str(event['body'][:-4]) + '.json',
    )
    return json.dumps(response)

def doListGallery(event):
    response = s3.list_objects_v2(Bucket=bucket_name)

    for i in range(len(response['Contents'])-1, -1, -1):
        if 'LastModified' in response['Contents'][i]:
            del response['Contents'][i]['LastModified']
        if response['Contents'][i]['Key'][-5:] == '.json':
            response['Contents'].pop(i)

    alist = []
    for j in response['Contents']:
        link = s3.generate_presigned_url(
                    'get_object',
                    Params={
                        'Bucket': bucket_name,
                        'Key': j['Key'],
                    },
                    ExpiresIn=expiration)
        alist.append({'src': link, 'thumbnail': link})

    return json.dumps(alist)

def doChart(event):
    if (event['body'] == 'age'):
        response = s3.list_objects_v2( Bucket=bucket_name)
        
        alist = []
        for item in response['Contents']:
            if (item['Key'][-5:] == '.json'):
                resp = s3.get_object(
                    Bucket=bucket_name,
                    Key=item['Key']
                )
                alist.append(json.loads(resp['Body'].read().decode('utf-8')))
        
        chart = [0, 0, 0, 0, 0, 0]
        for i in alist:
            if len(i['FaceDetails']) != 0:
                for j in i['FaceDetails']:
                    age = (j['AgeRange']['Low'] + j['AgeRange']['High'])/2
                    if age > 89:
                        chart[5] += 1
                    elif age > 69:
                        chart[4] += 1
                    elif age > 49:
                        chart[3] += 1
                    elif age > 39:
                        chart[2] += 1
                    elif age > 19:
                        chart[1] += 1
                    elif age >= 0:
                        chart[0] += 1

    elif (event['body'] == 'smile'):
        response = s3.list_objects_v2(
            Bucket=bucket_name
        )
        
        alist = []
        for item in response['Contents']:
            if (item['Key'][-5:] == '.json'):
                resp = s3.get_object(
                    Bucket=bucket_name,
                    Key=item['Key']
                )
                alist.append(json.loads(resp['Body'].read().decode('utf-8')))
        
        chart = [0, 0]
        for i in alist:
            if len(i['FaceDetails']) != 0:
                for j in i['FaceDetails']:
                    if j['Smile']['Value']:
                        chart[0] += 1
                    else:
                        chart[1] += 1

        return json.dumps(chart)
    
# Delete Method
def doDelete(event):
    data = event['queryStringParameters']['fileName']
    key = data.split('/')[3].split('?')[0]
    s3.delete_object( Bucket=bucket_name, Key=key )
    s3.delete_object( Bucket=bucket_name, Key=key[:-4] + '.json' )
    return json.dumps({'Message': 'Success'})
```

9. On line 6 you will need to replace **REPLACEME** with the bucket you created earlier on. E.g. if you named your bucket facial-detection-johnsmith, then line 6 would look like

```python
bucket_name = "facial-detection-johnsmith"
```

6. Click **Save**

## Create and Expose API Gateway

We now need a way to expose the lambda function to the world, we can acomplish this with API Gateway. In the AWS Console serach for 'api gateway' or click [here](https://ap-southeast-2.console.aws.amazon.com/apigateway/home?region=ap-southeast-2#/apis).

1. In the top right click "Create API". There are number of Gateways we can create we will select "REST API" (**Note**: don't accidentally select the REST API private)  Click "Build".

![Create REST](img/restapi-1.png)

2. We will be creating a new REST API, give your API a name, "rekognition" will work for this example.  Then click "Create API"

![Create REST](img/restapi-2.png)

3. Click **Actions** and select **Create Resource**

![Create resource](img/creatresource-1.png)

4. Select the check box **Configure as proxy resource**. We want every request to be passed directly to the lambda function created, application code will take care of the http method. Click **Create Resource**

![Create resource](img/creatresource-2.png)

5. Type in the name of the lambda function we created **facial-detect** and click save, when requested to confirm permission click "OK" we are allowing this API Gateway to invoke the lambda function.

![Create resource](img/creatresource-3.png)
 
6. We have now configured the API but not yet deployed it. Click **Actions** then **Deploy API**, in the drop down for Deployment Stage select **[New Stage]**, provide **default** as the name then click deploy.

![Deploy](img/stage.png)

7. You will see a **Invoke URL** copy this, you will need it in the front end app. This is the http endpoint, effectly the entry point to our lambda function from the world.

## Connecting the React Frontend to the Upload Route Backend

1. Navigate back to your cloud 9. On line 41 of frontend/src/Components/Dropzone.js you will substitute **REPLACE ME** with the API link you copied from API Gateway. 

2. With invoke url now in the code, it's time to give the approriate extension. Extensions direct what code on the backend should execute and what results should be returned. We will add **/upload?fileName=** to the url which should then make your line look similar to this, but with your unique API link:

```javascript
"https://dhggdsdv6f.execute-api.ap-southeast-2.amazonaws.com/default/upload?fileName=" +
```

3. You've know finished your first feature for your ML website. To test whether the functionality works we will try upload an image on the website. To do, on your cloud 9 execute

```shell
npm run start
```

if your react code is not running in your terminal to kick up a local server version.

4. After the app has compiled successfully, click **Tools** in the toolbar up top, click **Preview** and finally click **Preview Running Application**. 
   Open the preview in another tab by clicking the arrow / box button on the right of the search bar.

5. In the app you will need to navigate to the upload page, by opening up the left drawer menu. On the upload page, try uploading an image using the upload interface; preferably a facial image, to test your /upload route and click **Scan**.

6. The webpage should hang as your missing the final piece, however to test whether the /upload route has worked you can go to your s3 bucket. In the bucket should then be the image you uploaded to from the website. 

## Detection Time

Congradulations on getting this far in the workshop. As promised this section is your opportunity to reap on some AWS credits. In this workshop we have 4 challenges for you to try out. Each challenge relates to one functionality in the ML React App, and should ahev an attach gif explaining on how this functionality works. Your job is to add the code for each challenege to the lambda you provisioned above, open the route just like you did for the upload route on the API you created, and find where that route is added in the react app. 

For reference as you complete the challenges your app should run similar to http://facial-hosting.s3-website-ap-southeast-2.amazonaws.com/

Good luck, remember the faster you complete the challenges and show to your trainer, the more points you accumulate to win some AWS credits. Feel free to message you're designated breakout room AWS reps for hints and help.

#### Connect /detect to React Frontend

For this challenge we would like to connect the machine learning capabilities of Rekognition to your application. To do this we must add it to your frontend.

1. Make sure you have the default **Invoke URL** copied into your clipboard from API Gateway, then goto your cloud 9.

2. In frontend/src/Components/Dropzone.js, on line 53 substitute 'REPLACE ME' with the invoke URL along with the /detect extension. The added url should look similar to this, but with your unique API link:

```javascript
"https://dhggdsdv6f.execute-api.ap-southeast-2.amazonaws.com/default/detect"
```

3. Test the app. To test the detect feature goto the upload page. Upload an image and then click **Scan**. If the route has worked, after scanning an image you should get in return a scan or no scan response on your webpage.

#### Connect /listgallery to React Frontend

The routes grabs content from the s3 bucket and serve it up as a image gallery for the users. 

1. Make sure you have the default **Invoke URL** copied into your clipboard from API Gateway, then goto your cloud 9.

2. In frontend/src/Components/Dropzone.js, on line 53 substitute 'REPLACE ME' with the invoke URL along with the /listgallery extension. The added url should look similar to this, but with your unique API link:

```javascript
"https://dhggdsdv6f.execute-api.ap-southeast-2.amazonaws.com/default/listgallery"
```

3. Test the app. To test the listgallery feature goto the gallery page. If successful the images you upload via the upload page should now be rendering on the gallery page.

#### Connect /delete to React Frontend

The delete feature will allow user from the webpage to delete and remove images from the s3 bucket.

1. Make sure you have the default **Invoke URL** copied into your clipboard from API Gateway, then goto your cloud 9.

2. In frontend/src/Components/ImageGridList.js, on line 41 substitute 'REPLACE ME' with the invoke URL along with the /delete extension. The added url should look similar to this, but with your unique API link:

```javascript
"https://dhggdsdv6f.execute-api.ap-southeast-2.amazonaws.com/default/delete"
```

3. Test the app. To test the delete feature goto the gallery page. If you select one of the images, there should be an option to delete. If successful, when you select the button after the page has refreshed the image should be gone.

#### Connect /charts to React Frontend

1. Make sure you have the default **Invoke URL** copied into your clipboard from API Gateway, then goto your cloud 9.

2. In frontend/src/Components/Charts.js, on line 12 substitute 'REPLACE ME' with the invoke URL along with the /charts extension. The added url should look similar to this, but with your unique API link:

```javascript
"https://dhggdsdv6f.execute-api.ap-southeast-2.amazonaws.com/default/charts"
```

3. Test the app. To test the charts feature goto the gallery page. If you have some images in the gallery the charts at the bottom should be populate with smiles and ages. For example if you upload a 20 year old person smilling then you should be one unit for smilling and one unit for 20-30 year old on the charts.

And that's it you've made it to the end. Let your trainer know so your in the running to get some AWS credits. Don't forget to complete the survey and join the AWS facebook to keep up with all things AWS.