console.log('xiaohan.js loaded')

xiaohan = function(cmd) {
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

    if (cmd) {
        return this.cmd;
    } else {
        return this;
    }
}


// define (function(){
//     var exports = {};
//     exports.method = xiaohan;
//     return exports;
// })
// module.exports = {
//     xiaohan: xiaohan
// }

define (function(module, exports){
    module.exports = {
        xiaohan: xiaohan
    }
});
