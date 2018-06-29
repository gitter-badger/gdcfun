# gdcfun
Google Summer of Code Open Health GDC exploration (NCI's Genomic Data Commons)

Live at https://mathbiol.github.io/gdcfun !

Current version: v0.0.1

___

## Introduction

gdcfun is designed to make the query of GDC simple. It enables users to quickly search data or files with a little effort through the GDC REST API (https://gdc.cancer.gov/developers/gdc-application-programming-interface-api). 

## Getting Started

gdcfun library supports three methods to use:



### Node.js localhost server

First, you need to install the gdcfun library with `npm -i gdcfun`  or `npm install gdcfun`.

Then, you need to run `http-server -i <port number> ` and edit the contents in `localhost:8080`

### Browser (Chrome) development tool

* You need to include the gdcfun library script in the html contents.

```html
<script src="https://mathbiol.github.io/gdcfun/gdcfun.js"></script>
```

### Observable Notebook 

* Observable Notebook (https://beta.observablehq.com)

* You need to specify the `require` statement in the code block.

```javascript
gf = require('https://mathbiol.github.io/gdcfun/gdcfun.js')
```

## Usage

### general

The main function in the gdcfun library

This will return  and a status message: 

```

```

