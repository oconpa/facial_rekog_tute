import boto3

client = boto3.client('rekognition')

# def handler(event, context):
#     message = 'Hello {} {}!'.format(event['first_name'], event['last_name'])  
    
#     return { 
#         'message' : message
#     }

response = client.detect_faces(
    Image={
        'S3Object': {
            'Bucket': 'facial-detection-pat',
            'Name': 'download.jpg',
        }
    },
    Attributes=[
        'ALL',
    ]
)
print(response)
