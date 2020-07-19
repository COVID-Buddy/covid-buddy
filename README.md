# [COVID Buddy](https://covidbuddysg.com)

## LICENSE

MIT License

Copyright (c) 2020 COVID Buddy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Setup

### Requirements

- node.js
- `npm install -g @angular/cli`

### Installation steps / development

- `npm install`
- `ng serve`
- now open `http://localhost:4200`

## Deployment

1. `ng build --prod` - builds the project into the `dist/` folder.
2. `docker build -t asia.gcr.io/matej-kramny/covid-sg .` - The docker image is just nginx embedded with cloudflare ssl certificates, you can put them into `ngx/` folder (files `cert.crt`, `cert.key` and nginx conf `conf.conf`).