console.log('ray.js loaded')

ray=function(){
    this.url='https://api.gdc.cancer.gov'
    //debugger
}

ray.url='https://api.gdc.cancer.gov'

this.hello=()=>{
    return 'ray.js loaded at ' + Date()
}

ray.get=async (cmd, callback)=>{
    callback = callback || 'recordStatus'
    cmd=cmd||'status' // default cmd is status
    try {
      var r = (await fetch(ray.url+'/'+cmd)).json()
      console.log('get'+str(cmd)+'success');
    } 
    catch(err) {
            console.log(err);
    }
    //callback(cmd)
    return await r
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
    if (size != 'undefined') {
        fullurl += '&size='+toString(size)
    }
    fullurl += '&sort='+sort+'&pretty='+pretty

    return ray.get(fullurl)
}

// get a project with project_id
ray.getProject=(cmd, project_id, pretty)=>{
    pretty = pretty || 'true'
    return ray.get('projects/'+project_id+'&pretty='+pretty)
}

// get cases
ray.getCases=(cmd, query, pretty)=>{
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
ray.getFiles=(cmd)=>{
    from = from || '0'
    sort = sort || 'project.project_id:asc'
    pretty = pretty || 'true'
    
    let fullurl = 'files'+'?from='+from
    if (size != 'undefined') {
        fullurl += '&size='+toString(size)
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
  let dict = {}
  let items = query.split('&')
  for (let i = 0; i < items.length; ++i) {
    let parms = items[i].split('=')
    dict[parms[0]] = parms[1]
  }
  return dict
}

ray.parseParms=(parms)=>{
  let output = "?"
  for (let i = 0; i < items.length; ++i) {
    output += "${items[i]}=${parms[items[i]]}&"
  }
  return output
}

// define(ray) export module.exports