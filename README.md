# gdcfun
[Google Summer of Code](https://summerofcode.withgoogle.com/projects/#6284727233806336) Open Health GDC exploration (NCI's Genomic Data Commons)

Live at https://mathbiol.github.io/gdcfun !

Current version: v0.1.0

___

## Introduction

gdcfun is designed to make the query of GDC simple. It enables users to quickly search data or files with a little effort through the [GDC REST API](https://gdc.cancer.gov/developers/gdc-application-programming-interface-api). 

___

## Getting Started

gdcfun library supports three methods to use:

### Node.js localhost server

* Install the gdcfun library with `npm i gdcfun`  or `npm install gdcfun`.
* Run `http-server -i <port number> ` in command line and edit the contents in `localhost:<port number>`

### Browser (Chrome) development tool

* Include the gdcfun library script in the html contents.

```html
<script src="https://mathbiol.github.io/gdcfun/ray.js"></script>
```

### Observable Notebook 

* Open a new notebook in [Observable Notebook](https://beta.observablehq.com)
* Specify the `require` statement in the code block.

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

#### .getObj(*cmd*)

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

#### .getProjects(*cmd, from, size, sort, pretty*)

``ray.getProjects()`` returns the list of project records and pagination data. The function is called by ``ray.getProjects(cmd, from, size, sort, pretty)``, or directly by ``ray.getObj({"method": "projects", ...})``. By default, the object of query and settings is 

```json
projectsJson = {
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

#### .getProject(*cmd, project_id, expand, pretty*)

``ray.getProject()`` returns the metadata of a single project by ``project_id``. The function is called by ``ray.getProject(cmd, project_id, expand, pretty)``, or directly by ``ray.getObj({"method": "project", ...})``.  By default, the object of query and settings is  (If a valid ``project_id `` is fed, for example ``TARGET-NBL ``)

```json
projectJson = {
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

#### .getCases(cmd, query, pretty)

`ray.getCases()` returns the list of hits of cases by the specific `query`. The function is called by `ray.getCases(cmd, query, pretty)`, or directly by `ray.getObj({"method": "cases", ...})`. By default, the object of query and settings is

```javascript
casesJson = {
    "method": "cases",
    "query": {"op":"and","content":[{"op":"in","content":{"field":"submitter_id","value":["TCGA-BH-A0EA"]}}]},
    "pretty": true
  }
```

The status message and the result returned are:

```javascript
method found: cases
success: getting cases?filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22submitter_id%22%2C%22value%22%3A%5B%22TCGA-BH-A0EA%22%5D%7D%7D%5D%7D%0A%0A&pretty=true

{
    "data": {
        "hits": [
            {
                "updated_datetime": "2018-05-21T16:07:40.645885-05:00",
                "submitter_analyte_ids": [
                    "TCGA-BH-A0EA-01A-11R",
                    "TCGA-BH-A0EA-10A-01W",
                    "TCGA-BH-A0EA-01A-11W",
                    "TCGA-BH-A0EA-01A-11D",
                    "TCGA-BH-A0EA-10A-01D"
                ],
                "analyte_ids": [
                    "f19f408a-815f-43d9-8032-e9482b796371",
                    "fe678556-acf4-4bde-a95e-860bb0150a95",
                    "66ed0f86-5ca5-4dec-ba76-7ee4dcf31831",
                    "69ddc092-88a0-4839-a2bb-9f1c9e760409",
                    "30cb470f-66d4-4085-8c30-83a42e8453d4"
                ],
                "submitter_id": "TCGA-BH-A0EA",
                "case_id": "1f601832-eee3-48fb-acf5-80c4a454f26e",
                "id": "1f601832-eee3-48fb-acf5-80c4a454f26e",
                "disease_type": "Breast Invasive Carcinoma",
                "sample_ids": [
                    "9a6c71a6-82cd-42b1-a93f-f569370848d6",
                    "7f791228-dd77-4ab0-8227-d784a4c7fea1",
                    "55864d86-dab8-47bb-a3e3-8cfb198b06c1"
                ],
                "portion_ids": [
                    "cb6086d1-3416-4310-b109-e8fa6e8b72d4",
                    "8629bf5a-cdaf-4f6a-90bb-27dd4a7565c5",
                    "ae4f5816-f97a-4605-9b05-9ab820467dee"
                ],
                "submitter_portion_ids": [
                    "TCGA-BH-A0EA-01A-21-A13C-20",
                    "TCGA-BH-A0EA-01A-11",
                    "TCGA-BH-A0EA-10A-01"
                ],
                "created_datetime": null,
                "slide_ids": [
                    "90154ea1-6b76-4445-870e-d531d6fa1239",
                    "a0826f0d-986a-491b-8c6f-b34f8929f3ee",
                    "1dd1cab5-5a81-428a-8153-91e8c4cf9905"
                ],
                "state": "live",
                "aliquot_ids": [
                    "eef9dce1-6ba6-432b-bbe2-53c7dbe64fe7",
                    "cde982b7-3b0a-49eb-8710-a599cb0e44c1",
 				   ...
                ],
                "primary_site": "Breast",
                "submitter_aliquot_ids": [
                    "TCGA-BH-A0EA-10A-01D-A113-01",
                    "TCGA-BH-A0EA-01A-11R-A115-07",
 				   ...
                ],
                "submitter_sample_ids": [
                    "TCGA-BH-A0EA-10A",
                    "TCGA-BH-A0EA-01Z",
                    "TCGA-BH-A0EA-01A"
                ],
                "submitter_slide_ids": [
                    "TCGA-BH-A0EA-01Z-00-DX1",
                    "TCGA-BH-A0EA-01A-01-MSA",
                    "TCGA-BH-A0EA-01A-01-TSA"
                ]
            }
        ],
        "pagination": {
            "count": 1,
            "sort": "",
            "from": 0,
            "page": 1,
            "total": 1,
            "pages": 1,
            "size": 10
        }
    },
    "warnings": {}
}
```

If `query` is missing, `.getCases()` would return an empty object and the status message would be 

```javascript
failure: missing query
```

#### .getCase(*cmd, uuid, pretty, expand*)

``ray.getCase()`` returns the metadata of a single project by ``UUID``.  The function is called by ``getCase= (cmd, uuid, pretty, expand)``, or directly by ``ray.getObj({"method": "case", ...})``.  By default, the object of query and settings is  (If a valid ``uuid`` is fed, for example ``1f601832-eee3-48fb-acf5-80c4a454f26e ``)

```JSON
method found: case
success: getting cases/1f601832-eee3-48fb-acf5-80c4a454f26e?pretty=true&expand=diagnoses

{
  "data": {
    "diagnoses": [
      {
        "classification_of_tumor": "not reported",
        "last_known_disease_status": "not reported",
        "updated_datetime": "2016-05-16T10:59:16.740358-05:00",
        "primary_diagnosis": "c50.9",
        "submitter_id": "TCGA-BH-A0EA_diagnosis",
        "tumor_stage": "stage iia",
        "age_at_diagnosis": 26548.0,
        "vital_status": "dead",
        "morphology": "8500/3",
        "days_to_death": 991.0,
        "days_to_last_known_disease_status": null,
        "days_to_last_follow_up": null,
        "state": null,
        "days_to_recurrence": null,
        "diagnosis_id": "84654ad5-2a2c-5c3b-8340-ecac6a5550fe",
        "tumor_grade": "not reported",
        "tissue_or_organ_of_origin": "c50.9",
        "days_to_birth": -26548.0,
        "progression_or_recurrence": "not reported",
        "prior_malignancy": "not reported",
        "site_of_resection_or_biopsy": "c50.9",
        "created_datetime": null
      }
    ],
    "sample_ids": [
      "7f791228-dd77-4ab0-8227-d784a4c7fea1",
      "9a6c71a6-82cd-42b1-a93f-f569370848d6"
    ],
    "portion_ids": [
      "cb6086d1-3416-4310-b109-e8fa6e8b72d4",
      "8629bf5a-cdaf-4f6a-90bb-27dd4a7565c5",
      "ae4f5816-f97a-4605-9b05-9ab820467dee"
    ],
    "submitter_portion_ids": [
      "TCGA-BH-A0EA-01A-11",
      "TCGA-BH-A0EA-01A-21-A13C-20",
      "TCGA-BH-A0EA-10A-01"
    ],
    "created_datetime": null,
    "submitter_aliquot_ids": [
      "TCGA-BH-A0EA-01A-11R-A114-13",
      "TCGA-BH-A0EA-01A-11D-A111-01",
      ...
    ],
    "updated_datetime": "2016-05-02T14:37:43.619198-05:00",
    "submitter_analyte_ids": [
      "TCGA-BH-A0EA-01A-11R",
      "TCGA-BH-A0EA-01A-11D",
      "TCGA-BH-A0EA-01A-11W",
      "TCGA-BH-A0EA-10A-01W",
      "TCGA-BH-A0EA-10A-01D"
    ],
    "analyte_ids": [
      "30cb470f-66d4-4085-8c30-83a42e8453d4",
      "66ed0f86-5ca5-4dec-ba76-7ee4dcf31831",
      "f19f408a-815f-43d9-8032-e9482b796371",
      "69ddc092-88a0-4839-a2bb-9f1c9e760409",
      "fe678556-acf4-4bde-a95e-860bb0150a95"
    ],
    "submitter_id": "TCGA-BH-A0EA",
    "case_id": "1f601832-eee3-48fb-acf5-80c4a454f26e",
    "state": null,
    "aliquot_ids": [
      "bcb7fc6d-60a0-48b7-aa81-14c0dda72d76",
      "97c64d6a-7dce-4d0f-9cb3-b3e4eb4719c5",
	  ...
    ],
    "slide_ids": [
      "90154ea1-6b76-4445-870e-d531d6fa1239",
      "a0826f0d-986a-491b-8c6f-b34f8929f3ee"
    ],
    "submitter_sample_ids": [
      "TCGA-BH-A0EA-01A",
      "TCGA-BH-A0EA-10A"
    ]
  },
  "warnings": {}
}
```

If ``uuid`` is missing, ``.getProject()`` would return an empty object and the status message would be 

```
failure: missing uuid
```

#### .getFiles(*cmd, from, size, sort, pretty*)

`ray.getFiles()` returns the metadata of a single project by `project_id`. The function is called by `ray.getProjects(cmd, from, size, sort, pretty)`, or directly by `ray.getObj({"method": "project", ...})`. By default, the object of query and settings is

```javascript
filesJson = {
    "method": "files",
    "from": 0,
    "size": 3,
    "sort": "file_size:asc",
    "pretty": true
}
```

The status message and the result returned are: 

```javascript
method found: files
success: getting files?from=0&size=3&sort=file_size:asc&pretty=true

{
  "data": {
    "hits": [
      {
        "data_type": "Raw Simple Somatic Mutation",
        "updated_datetime": "2017-03-04T16:45:40.925270-06:00",
        "file_name": "9f78a291-2d50-472c-8f56-5f8fbd09ab2a.snp.Somatic.hc.vcf.gz",
        "submitter_id": "TCGA-13-0757-01A-01W-0371-08_TCGA-13-0757-10A-01W-0371-08_varscan",
        "file_id": "9f78a291-2d50-472c-8f56-5f8fbd09ab2a",
        "file_size": 1120,
        "id": "9f78a291-2d50-472c-8f56-5f8fbd09ab2a",
        "created_datetime": "2016-05-04T14:50:54.560567-05:00",
        "md5sum": "13c1ceb3519615e2c67128b350365fbf",
        "data_format": "VCF",
        "acl": [
          "phs000178"
        ],
        "access": "controlled",
        "state": "live",
        "data_category": "Simple Nucleotide Variation",
        "type": "simple_somatic_mutation",
        "file_state": "submitted",
        "experimental_strategy": "WXS"
      },
      {
        "data_type": "Raw Simple Somatic Mutation",
        "updated_datetime": "2017-03-04T16:45:40.925270-06:00",
        "file_name": "7780009b-abb6-460b-903d-accdac626c2e.snp.Somatic.hc.vcf.gz",
        "submitter_id": "TCGA-HC-8261-01A-11D-2260-08_TCGA-HC-8261-10A-01D-2260-08_varscan",
        "file_id": "7780009b-abb6-460b-903d-accdac626c2e",
        "file_size": 1237,
        "id": "7780009b-abb6-460b-903d-accdac626c2e",
        "created_datetime": "2016-05-08T13:54:38.369393-05:00",
        "md5sum": "fd9bb46c8022b96af730c48dc00e2c41",
        "data_format": "VCF",
        "acl": [
          "phs000178"
        ],
        "access": "controlled",
        "state": "live",
        "data_category": "Simple Nucleotide Variation",
        "type": "simple_somatic_mutation",
        "file_state": "submitted",
        "experimental_strategy": "WXS"
      }
    ],
    "pagination": {
      "count": 2,
      "sort": "file_size:asc",
      "from": 0,
      "page": 1,
      "total": 274724,
      "pages": 137362,
      "size": 2
    }
  },
  "warnings": {}
}
```

#### .getFile(*cmd, uuid, pretty*)

`ray.getFile()` returns the metadata of a single case using its `uuid`. The function is called by `ray.getFile(cmd, uuid, pretty)`, or directly by `ray.getObj({"method": "file", ...})`. By default, the object of query and settings is (If a valid `uuid` is fed (for example `6680627c-f70b-45fd-854b-208be561a9e8`))

```javascript
fileJson = {
    "method": "file",
    "uuid": "6680627c-f70b-45fd-854b-208be561a9e8",
    "pretty": true
}
```

The status message and the result returned are:

```javascript
method found: file
success: getting files/6680627c-f70b-45fd-854b-208be561a9e8?pretty=true

{
  "data": {
    "data_type": "Annotated Somatic Mutation", 
    "updated_datetime": "2017-10-24T10:21:24.570405-05:00", 
    "created_datetime": "2017-09-10T13:52:40.396812-05:00", 
    "file_name": "6680627c-f70b-45fd-854b-208be561a9e8.vep.vcf.gz", 
    "md5sum": "9af5e6d636771e245605243eb9f36505", 
    "data_format": "VCF", 
    "acl": [
      "phs001179"
    ], 
    "access": "controlled", 
    "state": "submitted", 
    "file_id": "6680627c-f70b-45fd-854b-208be561a9e8", 
    "data_category": "Simple Nucleotide Variation", 
    "file_size": 7982, 
    "submitter_id": "AD8753_AnnotatedSomaticMutation", 
    "type": "annotated_somatic_mutation", 
    "file_state": "submitted", 
    "experimental_strategy": "Targeted Sequencing"
  }, 
  "warnings": {}
}
```

If ``uuid`` is missing, ``.getFile()`` would return an empty object and the status message would be 

```
failure: missing uuid
```

#### .getAnnotations(*cmd, query, pretty*)

`ray.getAnnotations()` returns the query result in search and retrieval of annotations stored. The function is called by `ray.getAnnotations(cmd, query, pretty)`, or directly by `ray.getObj({"method": "annotations", ...})`. By default, the object of query and settings is

```javascript
annotationsJson = {
    "method": "annotations",
    "query": {
       "op":"in",
       "content":{
           "field":"entity_id",
           "value":[
                "e0d36cc0-652c-4224-bb10-09d15c7bd8f1",
                "25ebc29a-7598-4ae4-ba7f-618d448882cc",
                "fe660d7c-2746-4b50-ab93-b2ed99960553"
            ]
       }
    },
    "pretty": true
}
```

The status message and the result returned are:

```javascript
method found: annotations
success: getting annotations?filter=%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22entity_id%22%2C%22value%22%3A%5B%22e0d36cc0-652c-4224-bb10-09d15c7bd8f1%22%2C%2225ebc29a-7598-4ae4-ba7f-618d448882cc%22%2C%22fe660d7c-2746-4b50-ab93-b2ed99960553%22%5D%7D%7D

{
  "data": {
    "hits": [
      {
        "category": "Item flagged DNU",
        "status": "Approved",
        "entity_id": "fe660d7c-2746-4b50-ab93-b2ed99960553",
        "classification": "CenterNotification",
        "entity_type": "aliquot",
        "created_datetime": "2015-09-28T00:00:00",
        "annotation_id": "5ddadefe-8b57-5ce2-b8b2-918d63d99a59",
        "notes": "The aliquot failed Broad pipeline QC and not all files are suitable for use. Consult the SDRF file to determine which files are usable.",
        "updated_datetime": "2017-03-09T13:20:38.962182-06:00",
        "submitter_id": "29087",
        "state": "submitted",
        "case_id": "41b59716-116f-4942-8b63-409870a87e26",
        "case_submitter_id": "TCGA-DK-A3IM",
        "entity_submitter_id": "TCGA-DK-A3IM-10A-01D-A20B-01",
        "id": "5ddadefe-8b57-5ce2-b8b2-918d63d99a59"
      },
      {
        "category": "Item is noncanonical",
        "status": "Approved",
        "entity_id": "25ebc29a-7598-4ae4-ba7f-618d448882cc",
        "classification": "Notification",
        "entity_type": "sample",
        "created_datetime": "2012-07-12T00:00:00",
        "annotation_id": "d6500f94-618f-5334-a810-ade76b887ec9",
        "notes": "No Matching Normal",
        "updated_datetime": "2017-03-09T13:47:18.182075-06:00",
        "submitter_id": "8009",
        "state": "submitted",
        "case_id": "bd114e05-5a97-41e2-a0d5-5d39a1e9d461",
        "case_submitter_id": "TCGA-08-0514",
        "entity_submitter_id": "TCGA-08-0514-01A",
        "id": "d6500f94-618f-5334-a810-ade76b887ec9"
      },
      {
        "category": "Prior malignancy",
        "status": "Approved",
        "entity_id": "e0d36cc0-652c-4224-bb10-09d15c7bd8f1",
        "classification": "Notification",
        "entity_type": "case",
        "created_datetime": "2013-03-12T00:00:00",
        "annotation_id": "33336cdf-2cf0-5af2-bb52-fecd3427f180",
        "notes": "Patient had a prior lymphoma. Unknown radiation or systemic chemotherapy.",
        "updated_datetime": "2017-03-09T12:11:31.786013-06:00",
        "submitter_id": "15630",
        "state": "submitted",
        "case_id": "e0d36cc0-652c-4224-bb10-09d15c7bd8f1",
        "case_submitter_id": "TCGA-FS-A1ZF",
        "entity_submitter_id": "TCGA-FS-A1ZF",
        "id": "33336cdf-2cf0-5af2-bb52-fecd3427f180"
      }
    ],
    "pagination": {
      "count": 3,
      "sort": "",
      "from": 0,
      "page": 1,
      "total": 3,
      "pages": 1,
      "size": 10
    }
  },
  "warnings": {}
}
```

If `query` is missing, `.getAnnotations()` would return default results and the status message would be

```javascript
success: getting annotations?filter=&pretty=true
```

### Helper Functions

#### .convertQuery(*parms*)

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

```javascript
resultConvertQuery = "%7B%22method%22%3A%22case%22%2C%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22cases.submitter_id%22%2C%22value%22%3A%5B%22TCGA-CK-4948%22%2C%22TCGA-D1-A17N%22%2C%22TCGA-4V-A9QX%22%2C%22TCGA-4V-A9QM%22%5D%7D%7D%2C%7B%22op%22%3A%22%3D%22%2C%22content%22%3A%7B%22field%22%3A%22files.data_type%22%2C%22value%22%3A%22Gene%20Expression%20Quantification%22%7D%7D%5D%7D"
```

#### .parseQuery(*query*)

``ray.parseQuery()`` returns the decoded object of the encoded query string by ``query`` input. The function is called by `ray.parseQuery(query)` . The input object ``query`` would be first split by `&` and then be separated into key-value pairs. A sample input is

```javascript
sampleStr = "filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22cases.submitter_id%22%2C%22value%22%3A%5B%22TCGA-CK-4948%22%2C%22TCGA-D1-A17N%22%2C%22TCGA-4V-A9QX%22%2C%22TCGA-4V-A9QM%22%5D%7D%7D%2C%7B%22op%22%3A%22%3D%22%2C%22content%22%3A%7B%22field%22%3A%22files.data_type%22%2C%22value%22%3A%22Gene%20Expression%20Quantification%22%7D%7D%5D%7D&format=tsv&fields=file_id,file_name,cases.submitter_id,cases.case_id,data_category,data_type,cases.samples.tumor_descriptor,cases.samples.tissue_type,cases.samples.sample_type,cases.samples.submitter_id,cases.samples.sample_id,analysis.workflow_type,cases.project.project_id,cases.samples.portions.analytes.aliquots.aliquot_id,cases.samples.portions.analytes.aliquots.submitter_id&size=1000"
```

The result of calling ``ray.parseQuery(sampleObj)`` is

```javascript
resultParseQuery = {
    "fields": "file_id,file_name,cases.submitter_id,cases.case_id,data_category,data_type,cases.samples.tumor_descriptor,cases.samples.tissue_type,cases.samples.sample_type,cases.samples.submitter_id,cases.samples.sample_id,analysis.workflow_type,cases.project.project_id,cases.samples.portions.analytes.aliquots.aliquot_id,cases.samples.portions.analytes.aliquots.submitter_id",
    "filters": "%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22cases.submitter_id%22%2C%22value%22%3A%5B%22TCGA-CK-4948%22%2C%22TCGA-D1-A17N%22%2C%22TCGA-4V-A9QX%22%2C%22TCGA-4V-A9QM%22%5D%7D%7D%2C%7B%22op%22%3A%22%3D%22%2C%22content%22%3A%7B%22field%22%3A%22files.data_type%22%2C%22value%22%3A%22Gene%20Expression%20Quantification%22%7D%7D%5D%7D",
    "format": "tsv",
    "size": "1000"
}
```

### .tryParseJSON(*jsonString*)

``ray.tryParseJSON()`` returns the parsed object of the object-format string or the stringfied object by ``jsonString`` input. The function is called by `ray.tryParseJSON(query)` . The input string ``jsonString`` would directly return itself if ``jsonString`` is already an object. A sample input is

```javascript
sampleJsonStr = "{"method":"cases","query":{"op":"and","content":[{"op":"in","content":{"field":"submitter_id","value":["TCGA-BH-A0EA"]}}]},"pretty":true}"
```

The result of calling ``ray.parseJSON(sampleJsonStr)`` is

```javascript
resultParseJSON = {
    "method": "cases",
    "query": {
        "op": "and",
        "content": [
            {
                "op": "in",
                "content": {
                    "field": "submitter_id",
                    "value": [
                        "TCGA-BH-A0EA"
                    ]
                }
            }
        ]
    },
    "pretty": true
}
```

