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
   
   After the app has compiled successfully, click 'Tools' in the toolbar up top, click 'Preview' and finally click 'Preview Running Application'. 
   Open the preview in another tab by clicking the arrow / box button on the right of the search bar. 
   
**You should see a basic web app in your browser! However, there is currently no functionality. Let's use AWS to fix this!**

---

## Create an S3 + CORS

1. From the aws console, search up 'S3' in the search bar, and click on the first option.

2. Click 'Create Bucket'

3. Name your bucket facial-detection-**'Replace with your full name'**

4. Click 'Create'

![Create S3](img/S3Create.png)

5. Goto te bucket you just created, and click on the **Permission** tab. Then to **CORS configuration** and paste the following code:

```code
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

Image of CORS

## Create the lambda (backend)

1. From the aws console, search up 'Lambda' in the search bar, and click on the first option.

2. Click 'Create function'

3. On the create function page:
- Name your function **upload**
- Runtime **Python 3.8**

4. Click function

Image

5. Once created click into the Permissions tab. Under **Execution role** will be a role name, Click it.

6. In the newly opened window click on the blue button 'Attach policies'. In the search bar search for the following policies, checking the box once you've found them.
- AmazonS3FullAccess
- AmazonRekognitionFullAccess

7. Click 'Attach policy'

8. After attaching the policy go back to your lambda and under the configuration tab in the function code paste:

```python
import boto3
import json

client = boto3.client('rekognition')
s3 = boto3.client('s3')
bucket_name = "facial-detection-REPLACEME"
expiration = 120


def lambda_handler(event, context):
    print(event)
    if (event['path'] == '/upload'):
        response = s3.generate_presigned_url(
                    'put_object',
                    Params={
                        'Bucket': bucket_name,
                        'Key': event['queryStringParameters']['fileName'],
                        'ContentType': 'multipart/form-data'
                    },
                    ExpiresIn=expiration)
        return {
            'statusCode': 200,
            'headers': {
                "access-control-allow-origin": "*"
            },
            'body': json.dumps(response)
        }
    elif (event['path'] == '/detect'):
        response = client.detect_faces(
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

        return {
            'statusCode': 200,
            'headers': {
                "access-control-allow-origin": "*"
            },
            'body': json.dumps(response)
        }
    elif (event['path'] == '/delete'):
        data = json.loads(event['body'])
        key = data['file'].split('/')[3].split('?')[0]
        s3.delete_object(
                Bucket=bucket_name,
                Key=key
            )
        s3.delete_object(
                Bucket=bucket_name,
                Key=key[:-4] + '.json'
            )
        return {
            'statusCode': 200,
            'headers': {
                "access-control-allow-origin": "*"
            },
            'body': json.dumps({'Message': 'Success'})
        }
    elif (event['path'] == '/listgallery'):
        response = s3.list_objects_v2(
            Bucket=bucket_name
            )

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

        return {
            'statusCode': 200,
            'headers': {
                "access-control-allow-origin": "*"
            },
            'body': json.dumps(alist)
        }
    elif (event['path'] == '/charts'):
        if (event['body'] == 'age'):
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

            return {
                'statusCode': 200,
                'headers': {
                    "access-control-allow-origin": "*"
                },
                'body': json.dumps(chart)
            }
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

            return {
                'statusCode': 200,
                'headers': {
                    "access-control-allow-origin": "*"
                },
                'body': json.dumps(chart)
            }
```

9. On line 6 you will need to replace 'REPLACEME' with the bucket you created earlier on. E.g. if you named your bucket facial-detection-johnsmith, then line 6 would look like

```python
bucket_name = "facial-detection-johnsmith"
```

6. Click 'Save'

## Create and Expose API Gateway

1. Scroll to the top of the lambda to the designer. Click **Add Trigger**.

2. In the trigger configuration select:
- API Gateway
- API: Create an API
- API type: REST API
- Security: Open

3. Click **Add**

4. Scroll down to the API Gateway table and click on the upload-API link to open a new window up.

## Connecting the React Frontend to the Upload Route Backend

1. From the API Gateway opened up in the last step there should be a **Stages**, option on the left, click into it.

2. Expand all the menus under default until you see the GET method under /upload. Click into it and copy the **Invoke URL**

3. Navigate back to your cloud 9. On line 42 of frontend/src/Pages/Dropzone.js you will subsitute **REPLACE ME** with the API link you copied from API Gateway concatenating with the following "?fileName=" string. The link should look similar to this, but with your unique API link:

```javascript
"https://qvvnlsnd4l.execute-api.ap-southeast-2.amazonaws.com/default/upload?fileName=" +
```

4. Test the app

## Detection Time

Congradulations on getting this far in the workshop. As promised this section is your opportunity to reap on some AWS credits. In this workshop we have 4 challenges for you to try out. Each challenge realtes to one functionality in the ML React App, and should ahev an attach gif explaining on how this functionality works. Your job is to add the code for each challenege to the lambda you provisioned above, open the route just like you did for the upload route on the API you created, and find where that route is added in the react app. 

For reference as you complete the challeneges your app should run similar to http://facial-hosting.s3-website-ap-southeast-2.amazonaws.com/

Good luck, remember the faster you complete the challeneges and show to your trainer, the more points you accumulate to win some AWS credits. Feel free to message you're designated breakout room AWS reps for hints and help.

#### Expose Detect on API Gateway

1. In the API Gateway tab you had opened earlier open Resources on the left vertical menu.

**If you closed it before, goto API gateway by seraching API Gateway in the search bar, choosing the first option and clicking into upload-API from your API list***

1. In the API Gateway tab you had opened earlier open Resources on the left vertical menu.

2. Click on the /, then select Actions and select Create Resources.

3. On the New Child Resource window:
- Set **Resource Name** to detect
- And Tick **Enable API Gateway CORS**

4. Click **Create Resource**

5. Select the newly created /detect Resource, Click **Actions** and select **Create Method**

6. From dropdown select **POST** and confirm.

7. On the **/detect - POST - Setup** leave everything as default changing only:
- Tick **Use Lambda Proxy integration**
- Put **upload** in lambda function

8. Click **Save**

#### Connect /detect to React Frontend

1. In your API gateway under Resources, click **Actions** and select **Deploy API**. Select **default** for Deployment Stage and Click **Deploy**.

2. Once redirected to the stages tab, expand all your options, selecting the POST method under /detect.

3. Copy the **Invoke URL**, the goto your cloud 9.

4. In frontend/src/Pages/Dropzone.js, on line 60 substitute 'REPLACE ME' with the invoke URL you copied in the previous step.

5. Test APP.

#### Challenge 2 delete

Rinse and repeat the previous step except this time with a delete method and /delete resource.

1. In your upload-API in API Gateway open Resources on the left vertical menu.

2. Click on the /, then select Actions and select Create Resources.

3. On the New Child Resource window:
- Set **Resource Name** to delete
- And Tick **Enable API Gateway CORS**

4. Click **Create Resource**

5. Select the newly created /delete Resource, Click **Actions** and select **Create Method**

6. From dropdown select **DELETE** and confirm.

7. On the **/delete - DELETE - Setup** leave everything as default changing only:
- Tick **Use Lambda Proxy integration**
- Put **upload** in lambda function

8. Click **Save**

#### Connect /delete to React Frontend

1. In your API gateway under Resources, click **Actions** and select **Deploy API**. Select **default** for Deployment Stage and Click **Deploy**.

2. Once redirected to the stages tab, expand all your options, selecting the DELETE method under /delete.

3. Copy the **Invoke URL**, and goto your cloud 9.

4. In frontend/src/Pages/ImageGridList.js, on line 42 substitute 'REPLACE ME' with the invoke URL you copied in the previous step.

5. Test APP.

#### Challenge 3 listgallery

Rinse and repeat the previous step except this time with a delete method and /delete resource.

1. In your upload-API in API Gateway open Resources on the left vertical menu.

2. Click on the /, then select Actions and select Create Resources.

3. On the New Child Resource window:
- Set **Resource Name** to listgallery
- And Tick **Enable API Gateway CORS**

4. Click **Create Resource**

5. Select the newly created /listgallery Resource, Click **Actions** and select **Create Method**

6. From dropdown select **GET** and confirm.

7. On the **/listgallery - GET - Setup** leave everything as default changing only:
- Tick **Use Lambda Proxy integration**
- Put **upload** in lambda function

8. Click **Save**

#### Connect /listgallery to React Frontend

1. In your API gateway under Resources, click **Actions** and select **Deploy API**. Select **default** for Deployment Stage and Click **Deploy**.

2. Once redirected to the stages tab, expand all your options, selecting the GET method under /listgallery.

3. Copy the **Invoke URL**, and goto your cloud 9.

4. In frontend/src/Pages/ImageGridList.js, on line 33 substitute 'REPLACE ME' with the invoke URL you copied in the previous step.

5. Test APP.

#### Challenge 4 charts

Rinse and repeat the previous step except this time with a delete method and /charts resource.

1. In your upload-API in API Gateway open Resources on the left vertical menu.

2. Click on the /, then select Actions and select Create Resources.

3. On the New Child Resource window:
- Set **Resource Name** to charts
- And Tick **Enable API Gateway CORS**

4. Click **Create Resource**

5. Select the newly created /charts Resource, Click **Actions** and select **Create Method**

6. From dropdown select **POST** and confirm.

7. On the **/charts - POST - Setup** leave everything as default changing only:
- Tick **Use Lambda Proxy integration**
- Put **upload** in lambda function

8. Click **Save**

#### Connect /charts to React Frontend

1. In your API gateway under Resources, click **Actions** and select **Deploy API**. Select **default** for Deployment Stage and Click **Deploy**.

2. Once redirected to the stages tab, expand all your options, selecting the PSOT method under /charts.

3. Copy the **Invoke URL**, and goto your cloud 9.

4. In frontend/src/Pages/Charts.js, on line 12 substitute 'REPLACE ME' with the invoke URL you copied in the previous step.

5. Test APP.

And that's it you've made it to the end. Let your trainer know so your in the running to get some AWS credits. Don't forget to complete the survey and join the AWS facebook to keep up with all things AWS.
