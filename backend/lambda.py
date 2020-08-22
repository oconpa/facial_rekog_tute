import boto3
import json
from botocore.exceptions import ClientError


client = boto3.client('rekognition')
s3 = boto3.client('s3')
bucket_name = "facial-detection-pat"
expiration = 120
object_name = "test.jpg"


def handler(event, context):
    print(event)
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

        
        print(response)
        return {
            'statusCode': 200,
            'headers': {
                "access-control-allow-origin": "*"
            },
            'body': json.dumps(response)
        }