<img src='/img/Amazon_event.png' width="800" height="400" />

# Facial Rekognition Workshop

> If you’ve built an application using AWS in the past or understand key cloud concepts, this workshop is suited for you. You will use AWS Rekognition to build an online gallery of ML detections, and use AWS services to scan, detect and draw data science inferences from the scans.

> Machine Learning/Facial Detection

***ML APP DEMO***

![Farmers Market Finder Demo](img/hHv0y1ayU9.gif)

---

## Table of Contents

- [Setting up your Development Environment](#setting-up-your-development-environment)
  - [Provisioning your Cloud 9 IDE](#provisioning-your-cloud-9-ide)
  - [Setting up your Cloud 9 w/ React application](#Setting-up-your-Cloud9-React-application)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)


---

## Setting up your Development Environment

All the `code` required to get started

### Provisioning your Cloud 9 IDE

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

1. Clone the current repository to your Cloud9 IDE.8
   
   ```bash
   git clone -b frontendOnly https://github.com/josephtey/AWSAmplifyWorkshop.git
   ```
   
2. Move into the cloned directory, and install all required packages. 

   ```bash
   cd AWSAmplifyWorkshop
   npm install
   ```
   
3. Install the Amplify CLI and initialise the project (as an Amplify app)
   ```bash
   npm install -g @aws-amplify/cli
   ```

4. Initialise the project as an Amplify application

   ```bash
   amplify init
   
   ? Enter a name for the project: AWSAmplifyWorkshop
   ? Enter a name for the environment: dev
   ? Choose your default editor: None
   ? Choose the type of app that youre building: javascript
   
   Please tell us about your project
   ? What javascript framework are you using: react
   ? Source Directory Path: src
   ? Distribution Directory Path: build
   ? Build Command:  npm run-script build
   ? Start Command: npm run-script start
   
   AWS access credentials can not be found.
   ? Setup new user (Y/n) Yes
   
   Press Enter (you dont need to click the link for this one)
   
   Specify the AWS Region
   ? region:  ap-southeast-2
   Specify the username of the new IAM user:
   ? user name:  amplify-workshop
   Complete the user creation using the AWS console
   
   Click on the link that is provided
   ```
   
   You will get a link to configure your Identity Access Management user.\
   Click on it, keep clicking 'Next' and leave everything default until you reach 'Create User'.\
   Click 'Download .csv' to save your User Credentials.
   
   Go back to your Cloud9.\
   Your `accessKeyId` and `secretAccessKey` will be in the CSV file that you just downloaded.
   
   ```bash
   ? accessKeyId: ********************
   ? secretAccessKey:  ****************************************
   ? region:  ap-southeast-2
   ```
   

5. Connect your React web app to Amplify

   Open the file `src/index.js`, and add the following code **after the import statements**:
   
   ```javascript
   import config from './aws-exports'
   import Amplify from 'aws-amplify'
   Amplify.configure(config)
   ```

6. Run the React application
   ```bash
   npm start
   ```
   
7. Preview your Web Application
   
   After the app has compiled successfully, click 'Tools' in the toolbar up top, click 'Preview' and finally click 'Preview Running Application'. 
   Open the preview in another tab by clicking the arrow / box button on the right of the search bar. 

**You should see a basic Shopping List app in your browser! However, there is currently no functionality. Let's use AWS to fix this!**




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

**ttystudio**

![ttystudio GIF](https://raw.githubusercontent.com/chjj/ttystudio/master/img/example.gif)

## Example (Optional)

```javascript
// code away!

let generateProject = project => {
  let code = [];
  for (let js = 0; js < project.length; js++) {
    code.push(js);
  }
};
```

---

### Clone

- Clone this repo to your local machine using `https://github.com/fvcproductions/SOMEREPO`

### Setup

- If you want more syntax highlighting, format your code like this:

> update and install this package first

```shell
$ brew update
$ brew install fvcproductions
```

> now install npm and bower packages

```shell
$ npm install
$ bower install
```

- For all the possible languages that support syntax highlithing on GitHub (which is basically all of them), refer <a href="https://github.com/github/linguist/blob/master/lib/linguist/languages.yml" target="_blank">here</a>.

---

## Features
## Usage (Optional)
## Documentation (Optional)
## Tests (Optional)

- Going into more detail on code and technologies used
- I utilized this nifty <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Markdown Cheatsheet</a> for this sample `README`.

---

## Contributing

> To get started...

### Step 1

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/joanaz/HireDot2.git`

### Step 2

- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/joanaz/HireDot2/compare/" target="_blank">`https://github.com/joanaz/HireDot2/compare/`</a>.

---

## Team

> Or Contributors/People

| <a href="http://fvcproductions.com" target="_blank">**FVCproductions**</a> | <a href="http://fvcproductions.com" target="_blank">**FVCproductions**</a> | <a href="http://fvcproductions.com" target="_blank">**FVCproductions**</a> |
| :---: |:---:| :---:|
| [![FVCproductions](https://avatars1.githubusercontent.com/u/4284691?v=3&s=200)](http://fvcproductions.com)    | [![FVCproductions](https://avatars1.githubusercontent.com/u/4284691?v=3&s=200)](http://fvcproductions.com) | [![FVCproductions](https://avatars1.githubusercontent.com/u/4284691?v=3&s=200)](http://fvcproductions.com)  |
| <a href="http://github.com/fvcproductions" target="_blank">`github.com/fvcproductions`</a> | <a href="http://github.com/fvcproductions" target="_blank">`github.com/fvcproductions`</a> | <a href="http://github.com/fvcproductions" target="_blank">`github.com/fvcproductions`</a> |

- You can just grab their GitHub profile image URL
- You should probably resize their picture using `?s=200` at the end of the image URL.

---

## FAQ

- **How do I do *specifically* so and so?**
    - No problem! Just do this.

---

## Support

Reach out to me at one of the following places!

- Website at <a href="http://fvcproductions.com" target="_blank">`fvcproductions.com`</a>
- Twitter at <a href="http://twitter.com/fvcproductions" target="_blank">`@fvcproductions`</a>
- Insert more social links here.

---

## Donations (Optional)

- You could include a <a href="https://cdn.rawgit.com/gratipay/gratipay-badge/2.3.0/dist/gratipay.png" target="_blank">Gratipay</a> link as well.

[![Support via Gratipay](https://cdn.rawgit.com/gratipay/gratipay-badge/2.3.0/dist/gratipay.png)](https://gratipay.com/fvcproductions/)


---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2015 © <a href="http://fvcproductions.com" target="_blank">FVCproductions</a>.
