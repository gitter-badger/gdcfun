# gdcfun
Google Summer of Code Open Health GDC exploration (NCI's Genomic Data Commons)

Live at https://mathbiol.github.io/gdcfun !

Current version: v0.0.2

___

## Introduction

gdcfun is designed to make the query of GDC simple. It enables users to quickly search data or files with a little effort through the GDC REST API (https://gdc.cancer.gov/developers/gdc-application-programming-interface-api). 

## Getting Started

gdcfun library supports three methods to use:

### Node.js localhost server

* First, you need to install the gdcfun library with `npm i gdcfun`  or `npm install gdcfun`.
* Then, you need to run `http-server -i <port number> ` and edit the contents in `localhost:<port number>`

### Browser (Chrome) development tool

* You need to include the gdcfun library script in the html contents.

```html
<script src="https://mathbiol.github.io/gdcfun/ray.js"></script>
```

### Observable Notebook 

* Observable Notebook (https://beta.observablehq.com)
* You need to specify the `require` statement in the code block.

```javascript
gf = require('https://mathbiol.github.io/gdcfun/ray.js')
```

## Usage

The correct method to require `ray.js` is use `await` to resolve the promise and `.method()` to retrieve the functions. A common wrong method to require `ray.js` only with `require()` would not be resolved with complete functions. 

```javascript
ray = new(await require('https://mathbiol.github.io/gdcfun/ray.js')).method() // correct method
r = require('https://mathbiol.github.io/gdcfun/ray.js') // wrong method
```


### General

#### .getObj()

`ray.getObj()` is an asynchronous function that reads in an object that specifies the requirement of search/retrieval and returns the corresponding results of API fetch. It is a new feature in v0.0.2, and it enables users to fetch API easily without the knowledge of the functions in the Examples section.

The basic format of the object is 

```json
{
    "method": "projects",
    "from": 0,
    "size": 8,
    "sort": "project.project_id:asc",
    "pretty": true
}
```

Supported methods are `["status", "projects", "project", "files", "file", "cases", "case", "annotations", "_mapping"]`.

With the `method` specified, `ray.getObj()` calls the function `ray.getProjects()`. The whole process returns the following message if succeeded.

```
method found: projects
success: getting projects?from=0&size=8&sort=project.project_id:asc&pretty=true
```

And the response is

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
```

If `method` is not specified in the object, `ray.getObj()` would return the following message and calls `ray.getStatus()` instead.

```
missing method, return status instead
```

If `method` is not supported (listed above) or invalid, `ray.getObj()` would return the following message and calls `ray.getStatus()` as well.

```
invalid method, return status instead
```

#### .get()

The main fetch function in the gdcfun library to conduct the ``ray.get()`` function. 

```javascript
ray.get=async(cmd, callback)
```

This will return an object promise and a status message. By default the ``ray.get()`` would return the promise result of  ``ray.get('status')`` if no parameters are specified. The detailed promise description from chrome is:

```
Promise {<pending>}
	__proto__:Promise
	[[PromiseStatus]]:"resolved"
	[[PromiseValue]]:Object
success: getting status
```

All the methods mentioned in the __Examples__ section would call `ray.get()` eventually with different parameters specified.

### Examples

#### .getProjects(cmd, from, size, sort, pretty)

``ray.getProjects()`` returns the list of project records and pagination data. The function is called by ``ray.getProjects(cmd, from, size, sort, pretty)``, or directly by ``ray.getObj({"method": "projects", ...})``. By default, the object of query and settings is 

```json
{
    "method": "projects",
    "from": 0,
    "size": 2,
    "sort": "project.project_id:asc",
    "pretty": true
}
```
The status message and the result returned are:

```json
success: getting projects?from=0&size=2&sort=project.project_id:asc&pretty=true
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
```

#### .getProject(cmd, project_id, expand, pretty)

``ray.getProject()`` returns the metadata of a single project by ``project_id``. The function is called by ``ray.getProject(cmd, project_id, expand, pretty)``, or directly by ``ray.getObj({"method": "project", ...})``.  By default, the object of query and settings is  (If a valid ``project_id `` is fed, for example ``TARGET-NBL ``)

```json
{
    "method" : "project",
    "project_id": "TARGET-NBL",
    "expand": "summary,summary.experimental_strategies,summary.data_categories",
    "pretty": true
}
```

The status message and the result returned are: 

```json
success: getting projects/TARGET-NBL?expand=summary,summary.experimental_strategies,summary.data_categories&pretty=true

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
```

If project_id is missing, ``.getProject()`` would return an empty object and the status message would be

```
failure: missing project_id
```

#### .getCases(cmd,query,pretty)

``ray.getCases()`` returns the metadata of a single project by ``project_id``.  The function is called by ``getCases= (cmd, query,pretty)``, or directly by ``ray.getObj({"method": "cases", ...})``.  By default, the object of query and settings is  (If a valid ``query`` is fed, for example ``TARGET-NBL ``)

#### .convertQuery(parms)

``ray.convertQuery()`` returns the encoded string of the query object by ``obj`` input. The function is called by `ray.convertQuery(parms)` . The input object ``obj`` would be first stringfied and then be encoded with *Percent-(URL)-encoding* method. A sample input is

```javascript
queryObj = {
    "method": "case",
    "op": "and",
    "content": [
        {
            "op": "in",
            "content": {
                "field": "cases.submitter_id",
                "value": [
                    "TCGA-CK-4948",
                    "TCGA-D1-A17N",
                    "TCGA-4V-A9QX",
                    "TCGA-4V-A9QM"
                ]
            }
        },
        {
            "op": "=",
            "content": {
                "field": "files.data_type",
                "value": "Gene Expression Quantification"
            }
        }
    ]
}
```

The result of calling ``ray.converQuery(queryObj)`` is

```
%7B%22method%22%3A%22case%22%2C%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22cases.submitter_id%22%2C%22value%22%3A%5B%22TCGA-CK-4948%22%2C%22TCGA-D1-A17N%22%2C%22TCGA-4V-A9QX%22%2C%22TCGA-4V-A9QM%22%5D%7D%7D%2C%7B%22op%22%3A%22%3D%22%2C%22content%22%3A%7B%22field%22%3A%22files.data_type%22%2C%22value%22%3A%22Gene%20Expression%20Quantification%22%7D%7D%5D%7D
```

#### .parseQuery(query)

``ray.parseQuery()`` returns the decoded object of the encoded query string by ``query`` input. The function is called by `ray.parseQuery(query)` . The input object ``query`` would be first split by `&` and then be separated into key-value pairs. A sample input is

```javascript
sampleStr = "filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22cases.submitter_id%22%2C%22value%22%3A%5B%22TCGA-CK-4948%22%2C%22TCGA-D1-A17N%22%2C%22TCGA-4V-A9QX%22%2C%22TCGA-4V-A9QM%22%5D%7D%7D%2C%7B%22op%22%3A%22%3D%22%2C%22content%22%3A%7B%22field%22%3A%22files.data_type%22%2C%22value%22%3A%22Gene%20Expression%20Quantification%22%7D%7D%5D%7D&format=tsv&fields=file_id,file_name,cases.submitter_id,cases.case_id,data_category,data_type,cases.samples.tumor_descriptor,cases.samples.tissue_type,cases.samples.sample_type,cases.samples.submitter_id,cases.samples.sample_id,analysis.workflow_type,cases.project.project_id,cases.samples.portions.analytes.aliquots.aliquot_id,cases.samples.portions.analytes.aliquots.submitter_id&size=1000"
```

The result of calling ``ray.parseQuery(sampleObj)`` is

```javascript
{
    "fields": "file_id,file_name,cases.submitter_id,cases.case_id,data_category,data_type,cases.samples.tumor_descriptor,cases.samples.tissue_type,cases.samples.sample_type,cases.samples.submitter_id,cases.samples.sample_id,analysis.workflow_type,cases.project.project_id,cases.samples.portions.analytes.aliquots.aliquot_id,cases.samples.portions.analytes.aliquots.submitter_id",
    "filters": "%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22cases.submitter_id%22%2C%22value%22%3A%5B%22TCGA-CK-4948%22%2C%22TCGA-D1-A17N%22%2C%22TCGA-4V-A9QX%22%2C%22TCGA-4V-A9QM%22%5D%7D%7D%2C%7B%22op%22%3A%22%3D%22%2C%22content%22%3A%7B%22field%22%3A%22files.data_type%22%2C%22value%22%3A%22Gene%20Expression%20Quantification%22%7D%7D%5D%7D",
    "format": "tsv",
    "size": "1000"
}
```

