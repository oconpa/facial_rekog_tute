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

<a href="http://fvcproductions.com"><img src="https://avatars1.githubusercontent.com/u/4284691?v=3&s=200" title="FVCproductions" alt="FVCproductions"></a>

<!-- [![FVCproductions](https://avatars1.githubusercontent.com/u/4284691?v=3&s=200)](http://fvcproductions.com) -->

<img src="data:image/jpeg;base64,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" />
***INSERT GRAPHIC HERE (include hyperlink in image)***

# Facial Rekognition Tutorial

> Subtitle or Short Description Goes Here

> ideally one sentence

> include terms/tags that can be searched

**Badges will go here**

- build status
- issues (waffle.io maybe)
- devDependencies
- npm package
- coverage
- slack
- downloads
- gitter chat
- license
- etc.

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) [![Dependency Status](http://img.shields.io/gemnasium/badges/badgerbadgerbadger.svg?style=flat-square)](https://gemnasium.com/badges/badgerbadgerbadger) [![Coverage Status](http://img.shields.io/coveralls/badges/badgerbadgerbadger.svg?style=flat-square)](https://coveralls.io/r/badges/badgerbadgerbadger) [![Code Climate](http://img.shields.io/codeclimate/github/badges/badgerbadgerbadger.svg?style=flat-square)](https://codeclimate.com/github/badges/badgerbadgerbadger) [![Github Issues](http://githubbadges.herokuapp.com/badges/badgerbadgerbadger/issues.svg?style=flat-square)](https://github.com/badges/badgerbadgerbadger/issues) [![Pending Pull-Requests](http://githubbadges.herokuapp.com/badges/badgerbadgerbadger/pulls.svg?style=flat-square)](https://github.com/badges/badgerbadgerbadger/pulls) [![Gem Version](http://img.shields.io/gem/v/badgerbadgerbadger.svg?style=flat-square)](https://rubygems.org/gems/badgerbadgerbadger) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org) [![Badges](http://img.shields.io/:badges-9/9-ff6799.svg?style=flat-square)](https://github.com/badges/badgerbadgerbadger)

- For more on these wonderful ~~badgers~~ badges, refer to <a href="http://badges.github.io/badgerbadgerbadger/" target="_blank">`badgerbadgerbadger`</a>.

***INSERT ANOTHER GRAPHIC HERE***

[![INSERT YOUR GRAPHIC HERE](http://i.imgur.com/dt8AUb6.png)]()

- Most people will glance at your `README`, *maybe* star it, and leave
- Ergo, people should understand instantly what your project is about based on your repo

> Tips

- HAVE WHITE SPACE
- MAKE IT PRETTY
- GIFS ARE REALLY COOL

> GIF Tools

- Use <a href="http://recordit.co/" target="_blank">**Recordit**</a> to create quicks screencasts of your desktop and export them as `GIF`s.
- For terminal sessions, there's <a href="https://github.com/chjj/ttystudio" target="_blank">**ttystudio**</a> which also supports exporting `GIF`s.

**Recordit**

![Recordit GIF](http://g.recordit.co/iLN6A0vSD8.gif)

**ttystudio**

![ttystudio GIF](https://raw.githubusercontent.com/chjj/ttystudio/master/img/example.gif)

---

## Table of Contents (Optional)

> If your `README` has a lot of info, section headers might be nice.

- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)


---

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

## Installation

- All the `code` required to get started
- Images of what it should look like

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
