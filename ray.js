console.log('ray.js loaded')

ray=function(){
    this.url='https://api.gdc.cancer.gov'
    this.hello=()=>{
        return 'ray.js loaded at ' + Date()
    }
    //debugger
}

ray.url='https://api.gdc.cancer.gov'


// main function to fetch data
ray.get=async (cmd, callback)=>{
//     console.log(cmd)
//     if (typeof(JSON.parse(cmd)) == 'object') {
//         console.log(cmd)
//     } else {
        callback = callback || 'recordStatus'
        cmd = cmd || 'status' // default cmd is status
        try {
          var r = (await fetch(ray.url+'/'+cmd)).json()
//                           .then(function(response) {
//                                         if (!response.ok) {
//                                             throw Error(response.statusText)
//                                         }
//                                         return response
//                                     })
//                                     .then(response => console.log("ok"))
//                                     .catch(error => console.log(error))       
        } 
        catch(err) {
          console.log(err);
        }
        //callback(cmd)
        console.log('success: getting '+ cmd)
        return await r
//     }
}

// recording status when function is initiatized
ray.recordStatus=(cmd)=>{
    var that=this
    this.get().then(x=>{
        that.status=x
        console.log('initialization API status at '+Date()+':',x)
    })
    if(cmd){
        return this.get(cmd)
    }else{
        return this
    }
}

ray.getStatus=(cmd)=>{
    return ray.get('status')
}

// get projects 
ray.getProjects=(cmd, from, size, sort, pretty)=>{
    from = from || '0'
    sort = sort || 'project.project_id:asc'
    pretty = pretty || 'true'
    
    let fullurl = 'projects'+'?from='+from
    if (size != undefined) {
        fullurl += '&size='+ size
    }

    fullurl += '&sort='+sort+'&pretty='+pretty

    return ray.get(fullurl)
}

// get a project with project_id
ray.getProject=(cmd, project_id, expand, pretty)=>{
    if (project_id == undefined) {
      console.log('failure: missing project_id')
      return {}
    }
    pretty = pretty || 'true'
    expand = expand || 'summary,summary.experimental_strategies,summary.data_categories'
    return ray.get('projects/'+project_id+'?expand='+expand+'&pretty='+pretty)
}

// get cases
ray.getCases=(cmd, query, pretty)=>{
    if (query == undefined) {
      console.log('failure: missing query')
      return {}
    }
    pretty = pretty || 'true'
    let fullurl = 'cases'+'?filter='
    fullurl += parseQuery(query)
    return ray.get(fullurl)
}

//get a case with uuid
ray.getCase=(cmd, uuid, pretty, expand)=>{
    pretty = pretty || 'true'
    expand = expand || 'diagonsis'
    return ray.get('projects/'+project_id+'&pretty='+pretty+'&expand'+expand)
}

// get files
ray.getFiles=(cmd, from, size, sort, pretty)=>{
    from = from || '0'
    sort = sort || 'project.project_id:asc'
    pretty = pretty || 'true'
    
    let fullurl = 'files'+'?from='+from
    if (size != undefined) {
        fullurl += '&size='+ size
    }
    fullurl += '&sort='+sort+'&pretty='+pretty

    return ray.get(fullurl)
}

// get a file with uuid
ray.getFile=(cmd, uuid, pretty)=>{
    pretty = pretty || 'true'
    return ray.get('projects/'+project_id+'&pretty='+pretty)
}

// get annotions
ray.getAnnotions=(cmd)=>{
    pretty = pretty || 'true'
    let fullurl = 'annotions'+'?filter='
    fullurl += ray.parseQuery(query)
    return ray.get(fullurl)
}

ray.get_mapping=(cmd)=>{
    return ray.get('_mapping')
}

// parse query from json filter
ray.parseQuery=(query)=>{
  if (query == null)
    return query

  let dict = {}
  let items = query.split('&')
  for (let i = 0; i < items.length; ++i) {
    let parms = items[i].split('=')
    dict[parms[0]] = parms[1]
  }
  return dict
}

// construct url from json object
ray.parseParms=(parms)=>{
  if (parms == null)
    return parms
  
  let output = "?"
  let items = parms.split(',')
  for (let i = 0; i < items.length; ++i) {
    output += "${items[i]}=${parms[items[i]]}&"
  }
  return output
}

// escape the newline symbol in string
ray.escape=(str)=>{
  return str
    .replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t');
}

// test function: read in object and automatically catagorize the query
ray.test=(cmd)=>{
  ray.escape()
  //encodeURIComponent
  //decodeURIComponent
  //var json = '{"result":true, "count":42}';
  //obj = JSON.parse(json);
}

// define(ray) export module.exports

define (function(){
    var exports = {};
    exports.method = ray;
    return exports;
})