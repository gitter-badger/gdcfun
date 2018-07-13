console.log('ray.js loaded')

ray = function() {
    this.url = 'https://api.gdc.cancer.gov'
    this.hello = ()=>{
        return 'ray.js loaded at ' + Date()
    }
    //debugger
}

ray.url = 'https://api.gdc.cancer.gov'

// main function to fetch data
ray.get = async(cmd,callback)=>{
    // callback is abandoned
    callback = callback || 'recordStatus'
    // default cmd is status
    cmd = cmd || 'status'
    var r = (await fetch(ray.url+'/'+cmd)).json().then().catch(function(err) {
        console.log('error :-S', err);
    })
    res = await r
    if (Object.keys(res)[0] !== 'message' && Object.keys(res) !== 1) {
        console.log('success: getting ' + cmd)
        return r
    } else {
        console.log('failure: getting ' + cmd + ' (' + res['message'] + ')')
        return {}
    }
    //callback(cmd)
}

// recording status when function is initiatized
ray.recordStatus = (cmd)=>{
    var that = this
    this.get().then(x=>{
        that.status = x
        console.log('initialization API status at ' + Date() + ':', x)
    }
    )
    if (cmd) {
        return this.get(cmd)
    } else {
        return this
    }
}

// get status
ray.getStatus = (cmd)=>{
    return ray.get('status')
}

// get projects 
ray.getProjects = (cmd,from,size,sort,pretty)=>{
    from = from || '0'
    size = size || '10'
    sort = sort || 'project.project_id:asc'
    console.log(typeof (pretty))
    if (typeof (pretty) !== 'Boolean') {
        pretty = pretty || 'true'
    }

    let fullurl = 'projects' + '?from=' + from
    if (size != undefined) {
        fullurl += '&size=' + size
    }

    fullurl += '&sort=' + sort + '&pretty=' + pretty
    return ray.get(fullurl)
}

// get a project with project_id
ray.getProject = (cmd,project_id,expand,pretty)=>{
    if (project_id == undefined) {
        console.log('failure: missing project_id')
        return {}
    }
    pretty = pretty || 'true'
    expand = expand || 'summary,summary.experimental_strategies,summary.data_categories'
    return ray.get('projects/' + project_id + '?expand=' + expand + '&pretty=' + pretty)
}

// get cases
ray.getCases = (cmd,query,pretty)=>{
    if (query == undefined) {
        console.log('failure: missing query')
        return {}
    }
    pretty = pretty || 'true'
    let fullurl = 'cases' + '?filter='
    if (typeof (query) == 'string') {
        if (query[0] === '{') {
            fullurl += encodeURIComponent(query)
        } else {
            fullurl += query
        }
    } else if (typeof (query) == 'object') {
        fullurl += ray.convertQuery(query)
    }
    return ray.get(fullurl)
}

//get a case with uuid
ray.getCase = (cmd,uuid,pretty,expand)=>{
    if (uuid == undefined) {
        console.log('failure: missing uuid')
        return {}
    }
    pretty = pretty || 'true'
    expand = expand || 'diagnoses'
    return ray.get('cases/' + uuid + '?pretty=' + pretty + '&expand=' + expand)
}

// get files
ray.getFiles = (cmd,from,size,sort,pretty)=>{
    from = from || '0'
    sort = sort || 'project.project_id:asc'
    pretty = pretty || 'true'

    let fullurl = 'files' + '?from=' + from
    if (size != undefined) {
        fullurl += '&size=' + size
    }
    fullurl += '&sort=' + sort + '&pretty=' + pretty

    return ray.get(fullurl)
}

// get a file with uuid
ray.getFile = (cmd,uuid,pretty)=>{
    if (uuid == undefined) {
        console.log('failure: missing uuid')
        return {}
    }
    pretty = pretty || 'true'
    return ray.get('files/' + project_id + '?pretty=' + pretty)
}

// get annotations
ray.getAnnotations = (cmd,query,pretty)=>{
    pretty = pretty || 'true'
    let fullurl = 'annotations' + '?filter='
    if (typeof (query) == 'string') {
        if (query[0] === '{') {
            fullurl += encodeURIComponent(query)
        } else {
            fullurl += query
        }
    } else if (typeof (query) == 'object') {
        fullurl += ray.convertQuery(query)
    }
    return ray.get(fullurl)
}

ray.get_mapping = (cmd)=>{
    return ray.get('/projects/_mapping')
}

// parse query from json filter
ray.parseQuery = (query)=>{
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
ray.convertQuery = (parms)=>{
    if (parms == null)
        return parms
    return encodeURIComponent(JSON.stringify(parms))
}

// try to parse JSON and return the object
ray.tryParseJSON = (jsonString)=>{
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    } catch (e) {}
    return false;
}
;

// escape the newline symbol in string
ray.escape = (str)=>{
    return str.replace(/[\\]/g, '\\\\').replace(/[\"]/g, '\\\"').replace(/[\/]/g, '\\/').replace(/[\b]/g, '\\b').replace(/[\f]/g, '\\f').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r').replace(/[\t]/g, '\\t');
}

// getObj function: read in object and automatically catagorize the query
ray.getObj = async(cmd)=>{
    //ray.escape(cmd)
    var obj = {
        "method": undefined
    }
    if (json = ray.tryParseJSON(cmd)) {
        obj = json
    }
    console.log(obj)
    //obj = JSON.parse(json);
    if (obj['method'] == undefined) {
        console.log('missing method, return status instead')
        obj["method"] = 'status'
    }
    switch (obj['method']) {
    case 'projects':
        console.log('method found: projects')
        return ray.getProjects(obj, obj['from'], obj['size'], obj['sort'], obj['pretty'])
        break
    case 'project':
        console.log('method found: project')
        return await ray.getProject(obj,obj['project_id'],obj['expand'],obj['pretty'])
        break
    case 'status':
        console.log('method found: status')
        return await ray.getStatus(obj)
        break
    case 'cases':
        console.log('method found: cases')
        return await ray.getCases(obj,obj['query'],obj['pretty'])
        break
    case 'case':
        console.log('method found: case')
        return await ray.getCase(obj,obj['uuid'],obj['pretty'],obj['expand'])
        break
    case 'files':
        console.log('method found: files')
        return await ray.getFiles(obj,obj['from'],obj['size'],obj['sort'],obj['pretty'])
        break
    case 'file':
        console.log('method found: file')
        return await ray.getFile(obj,obj['uuid'],obj['pretty'])
        break
    case 'file':
        console.log('method found: annotations')
        return await ray.getAnnotations(obj,obj['query'],obj['pretty'])
        break
    case '_mapping':
        console.log('method found: _mapping')
        return await ray.get_mapping(obj)
        break
    default:
        console.log('invalid method, return status instead')
        return await ray.getStatus(obj)
    }

}

// define(ray) export module.exports
// if (typeof (define) !== "undefined") {
//     define(ray)
//     console.log('ray.js defined')
// } else {
//     define(function() {
//         var exports = {};
//         exports.method = ray;
//         return exports;
//     })
// }

define (function(){
    var exports = {};
    exports.method = ray;
    return exports;
})