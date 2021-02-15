### MediumReaderV2 🎧
MEDIUMREADER is an app that helps you listen to articles and blogposts from multiple sources. It leverages Web scraping to extract the text from the article, and Google Text-to-sppeech APIs to convert the text to speech. The node gTTs wrapper further simplifies this process by also writing the response to an audio file. This audio file is the uploaded to AWS S3, and returned back to the reader to listen to.

### Where is Version 1 ?
The version 1 of this app is available [HERE](https://github.com/rexsimiloluwah/mediumreader) and leverages the SpeechSynthesis web APIs, however this was not very flexible a nd usable due to issues with the SpeechSynthesis APIs.

### Running the Web Application 

**Requirements**
- Node.js and npm installed

**Clone the app**
```
$ git clone https://github.com/rexsimiloluwah/mediumreaderv2.git
```

**Run the backend**
```
$ cd backend
$ npm install 
```

```
$ npm run server
```

**Testing using CURL:-**
```
$ curl --location --request POST 'http://localhost:5000/api/v1/audio?lang=en' --header 'Content-Type: application/json' --data-raw '{
    "url" : "https://blog.medium.com/a-less-long-more-connected-medium-c345db2d6a56"
}'
```

**Run the client (frontend):-** 
```
$ npm run client-install
$ npm run client 
```

View the frontend on https://localhost:3000

**Run the full app (frontend + backend):-**
```
$ npm run dev
```

### Deployment 
The app is currently hosted on Heroku at https://mediumreader.herokuapp.com
