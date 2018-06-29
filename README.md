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

* First, you need to install the gdcfun library with `npm -i gdcfun`  or `npm install gdcfun`.
* Then, you need to run `http-server -i <port number> ` and edit the contents in `localhost:8080`

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

The main function in the gdcfun library to conduct the ``ray.get()`` function. 

```javascript
ray.get=async(cmd, callback)
```

This will return an object promise and a status message. By default the ``ray.get()`` would return the result of  ``ray.get('status')`` if no parameters are specified.

```
Promise {<pending>}
	__proto__:Promise
	[[PromiseStatus]]:"resolved"
	[[PromiseValue]]:Object
success: getting status
```

All the methods mentioned in the *Examples* part would call the `ray.get()` with different parameters specified.

### Examples

#### .getProjects()

``ray.getProjects()`` returns the list of project records and pagination data. By default, the settings are

```json
{
    "from": 0,
    "size": 2,
    "sort": "project.project_id:asc",
    "pretty": true
}
```

And the function is called by

```
ray.getProjects(cmd, from, size, sort, pretty)
```

The result and the status message returned is

```json
{
  "data": {
    "hits": [
      {
        "dbgap_accession_number": null,
        "disease_type": [
          "Brain Lower Grade Glioma"
        ],
        "released": true,
        "state": "legacy",
        "primary_site": [
          "Brain"
        ],
        "project_id": "TCGA-LGG",
        "id": "TCGA-LGG",
        "name": "Brain Lower Grade Glioma"
      },
      ...
    ],
    "pagination": {
      "count": 2,
      "sort": "project.project_id:asc",
      "from": 0,
      "page": 1,
      "total": 39,
      "pages": 20,
      "size": 2
    }
  },
  "warnings": {}
}
        
success: getting projects?from=0&sort=project.project_id:asc&pretty=true
```

#### .getProject()

``ray.getProject()`` returns the metadata of a single project by ``project_id``. By default, the settings are

```json
{
    "project_id": "string",
    "expand": "summary,summary.experimental_strategies,summary.data_categories",
    "pretty": true
}
```

If a valid ``project_id `` is fed (for example ``TARGET-NBL ``), the function is called by

```
getProject(cmd, project_id, expand, )
```

The result and the status message returned is

```json
{
   "data": {
      "dbgap_accession_number": "phs000467",
      "disease_type": [
         "Neuroblastoma"
      ],
      "summary": {
         "data_categories": [
            {
               "case_count": 7,
               "file_count": 1,
               "data_category": "Clinical"
            },
            ...
         ],
         "case_count": 1127,
         "file_count": 2806,
         "experimental_strategies": [
            {
               "case_count": 221,
               "file_count": 2174,
               "experimental_strategy": "WXS"
            },
            ...
         ],
         "file_size": 8157614402888
      },
      "released": true,
      "state": "legacy",
      "primary_site": [
         "Nervous System"
      ],
      "project_id": "TARGET-NBL",
      "name": "Neuroblastoma"
   },
   "warnings": {}
}

success: getting projects/TARGET-NBL?expand=summary,summary.experimental_strategies,summary.data_categories&pretty=true
```

If project_id is missing, ``.getProject()`` would return an empty object and the status message would be

```
failure: missing project_id
```

