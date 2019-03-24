Urenlog
=======

Works by using puppeteer to drive the browser.


## Authentication

The automated script cannot login automatically, so you have to run it every 30 days?

```
yarn run login
```

> This will open a browser and requests you to login to Google. Then Chrome will store the cookie in the directory `${HOME}/.config/urenlog`, so it can be re-used.


## Filling in hours

Usage with default values: Worked 8 hours on device prototype with message "Stuff"

```bash
yarn
yarn run start "Stuff"
```

A more detailed example: Worked 9 hours on "Testing" with message "Making Sense of Quantum Neural Blockchain AI". The `-s -k` option will do a 'dry run' and show the browser, so you verify and press the submit button yourself.

```bash
yarn run start -s -k -t "Testing" -u 9 "Making Sense of Quantum Neural Blockchain AI"
```
