# urenlog

Update the google hours form.

Works by using puppeteer to drive the browser. The first

Usage (shows the default values)
```bash
yarn
yarn run start -h
```

First time run cannot use headless mode because we need to collect credentials.
```bash
yarn run start -k "Passing the butter"
```
Chrome will store the credentials in the directory `${HOME}/.config/urenlog`

Example
```bash
yarn run start -t "Device Prototyping" -u 9 "Making Sense of Quantum Neural Blockchain AI"
```

Will add
