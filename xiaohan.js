console.log('xiaohan.js loaded')

let s = document.createElement('script')
s.src='xiaohan_es6.js'
document.head.appendChild(s)



function xiaohan(cmd) {
    this.version = "0.1";
    this.url = 'https://api.gdc.cancer.gov';

    // endpoint: status
    this.get = async function(cmd){
        if (typeof cmd === undefined) {
            console.log('cmd undefined');
            return;
        }
        cmd = cmd+'' || 'status';
        try {
            //const response = await (fetch(this.url + '/' + cmd).json());
            var response = (await fetch(this.url + '/' + cmd)).json();
            console.log('command ' + cmd +' success');
            return await response;
        }
        catch(err) {
            console.log(err);
        }
    }

    // endpoint: project

    // endpoint: project, get all projects
    this.getProjects = async function() {
        endpoint = 'projects';
        urlFetch = this.url + '/' + endpoint;
        try {
            var response = (await fetch(urlFetch)).json();
            console.log('getProjects() success');
            return await response;
        } 
        catch(err) {
            console.log(err);
        }
    }

    // input: project id
    this.getProject = function() {
        // no default parameters for getFile()
        var defaultParams = {
            project_id:''
        }
        if (typeof arguments === 'undefined') {
            return this.get('projects')
        }

        params = arguments[0];
        for (var prop in params) {
            defaultParams[prop] = params[prop];
        }       
        query = 'projects';
        for (var prop in defaultParams) {
            if (prop === 'project_id') {
                if (defaultParams['project_id'] !== '') {query = query + '/' + defaultParams['project_id'];}
                query += '?';
                continue;
            }
            query += '&' + prop + '=' + defaultParams[prop];
        }
        return this.get(query);
    }

    // endpoint: cases
    // get case by  uuid
    this.getCase = function() {
        // default property
        // property could add [filter, fromat, fields, expand, ...]
        var defaultParams = {
            uuid: '',
            pretty:'true',
        };

        if (arguments.length === 0) {
            return this.get('cases');
        }
        // update default property
        params = arguments[0];
        for (var prop in params) {
            defaultParams[prop] = params[prop];
        }

        query = 'cases';
        for (var prop in defaultParams) {
            if (prop === 'uuid') {
                if (defaultParams['uuid'] !== '') {query = query + '/' + defaultParams['uuid'];}
                query += '?';
                continue;
            }
            query += '&' + prop + '='+ defaultParams[prop];
        }
        return this.get(query);
    }

    // endpoint: Files
    this.getFile = function() {
        // no default parameters for getFile()
        var defaultParams = {
            uuid:''
        }
        if (typeof arguments === 'undefined') {
            return this.get('files')
        }

        params = arguments[0];
                
        for (var prop in params) {
            defaultParams[prop] = params[prop];
        }
        query = 'files';
        for (var prop in defaultParams) {
            if (prop === 'uuid') {
                if (defaultParams['uuid'] != '') {query = query + '/' + defaultParams['uuid'];}
                query += '?';
                continue;
            }
            query += '&' + prop + '=' + defaultParams[prop];
        }
        return this.get(query);
    }

//     this.getAnnnotation = function() {
//         var defaultParams = {}

//         if (typeof arguments === 'undefined') {
//             return this.get('annotations')
//         }
//         params = arguments[0];
        
//     } 

    this.get_mapping = function() {
        if (typeof arguments === 'undefined') {
            return {error: "Need endpoint"};
        }
        var endpoint = arguments[0];
        var endpoints = ['projects', 'files', 'cases', 'annotations'];
        if (endpoints.indexOf(endpoint) == -1) {
            return {error: "Wrong endpoint"};
        } else {
            return this.get(endpoint+'/_mapping')
        }

    }

    this.calSum = function(arr) {
        var map = new Map();

        // calculate sum of the appearance time of key
        for (var e in arr) {
            if (map.get(arr[e]) !== undefined) {
              map.set(arr[e], map.get(arr[e])+1);
            } else {
              map.set(arr[e], 1);
            }
        }
        // output = [{name1, value1}, {name2, value2}, ...]
        let output = [], item;

        for (var key of map.keys()) {
        item = {};
        item['name'] = key;
        item['value'] = map.get(key);
        output.push(item);
        }

        return output;
    }

    if (cmd) {
        return this.cmd;
    } else {
        return this;
    }
}


// method 1: ES5 commonJS
define (function(){
    xiaohan = new xiaohan;
    var exports = {};
    exports.version = xiaohan.version;
    exports.url = xiaohan.url;
    exports.get = xiaohan.get;
    exports.getProject = xiaohan.getProject;
    exports.getCase = xiaohan.getCase;
    exports.getFile = xiaohan.getFile;
    exports.get_mapping = xiaohan.get_mapping;
    exports.calSum = xiaohan.calSum;
    return exports;
})

// method2 : ES6 export
//module.exports = 'xiaohan';

