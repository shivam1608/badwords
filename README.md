# 🤬 Badwords

A community based multilanugal badwords database and detection api

### What do you mean by Community Based?

This repo is mostly dependent upon `pull requests` from the contributers to improve the accuracy of the api.

- you can use it as database of badwords and implement your own filter functions
- you can use it as api for your app in development enviroment (Host it on your own for production apps) but still can handle good ammount of traffic

## API

badwords has some cool api endpoint to intreact with the documentation (not compeleted yet) can be find [here](https://badwords.vercel.app/docs/)

### Base urls

hosted on [vercel](https://vercel.com) and [deta](https://deta.sh) for now

> `https://badwords.deta.dev/api` > `https://badwords.vercel.app/api`

- `/` the information about api
- `/langs` information about languages in database
- `/check` checks if a words is present in database
- `/listall` returns a list of all positives & negatives in the payload specified
- `/clean` advanced cleans and returns the payload
- `/simpleclean` simple cleans and returns the payload

### Options

- `languages` array of numbers binded to languages (only specified languages will be check for presence of badword)
- `layers` the protection layer of advanced search more the layer more time it takes for response but decreased the chance of missing badwords (currently only 2 supported `[1,2]`)
- `placeholder` the replacer to the badword (forced length = 1)
- `exclude` the array of words not to check or ignore
- `splitter` the splitter for simple clean
- `joiner` the joiner of simple clean

### Note

- Advanced `clean` don't work on Unicode (non-aplhabetical to be specify) instead use `simpleClean` endpoint

### Example

```
https://badwords.vercel.app/api/clean
```

```json
{
  "payload": "This is a payload",
  "options": {
    "languages": [0, 1, 2],
    "layers": [1, 2],
    "placeholder": "#"
  }
}
```

## Contributing

Make a `pull request` after adding few more word cases in the `/data/{respectiveFile}` more words and languages means more accuracy.

- the `positive` array of the datalist has all positive cases
- the `negative` array of the datalist has all negative cases for example **ass**assin's

## Something to say

Yea ik its a stupid idea for badwords cuz no one really cares but i wanted to make it so i did 😉
