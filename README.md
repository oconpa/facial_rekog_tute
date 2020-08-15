# facial_rekog_tute

1. Edit react frontend
2. Make s3 bucket and push react build to it
3. Create a lambda from cli and attach it to API Gateway to expose

aws iam create-role --role-name facial-rekognise --cli-input-json skeleton.json
aws lambda create-function --function-name facial-rekog --runtime python3.8 --role arn:aws:iam::080284742429:role/facial_rekog --handler lambda.handler --zip-file fileb://lambda.zip

4. Add code to lambda with rekognition
5. App complete
6. Attached SNS to message and email when people use your site
7. Create a gallery which loads an s3 library of previously uploaded image with rekognition data
8. Create a dynamo record set that is trigger by saving content to the s3 gallery.
9. Build on dynamo record set to do some data science.
10. Possible athena pull from s3

