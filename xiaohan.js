console.log('xiaohan.js')





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
    this.getProject = async function(id) {
        cmd = 'projects';
        urlFetch = this.url + '/' + cmd + '/' + id;
        try {
            var response = (await fetch(urlFetch)).json();
            console.log('getProject() success');
            return await response;
        }
        catch(err) {
            console.log(err);
        }
    }

    // endpoint: cases

    // get case by  uuid
    this.getCase = function() {
        // default property
        // property could add [filter, fromat, fields, expand, ...]
        var defaultParams = {
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

        query = 'cases/' + defaultParams['uuid'];
        for (var prop in defaultParams) {
            if (prop === 'uuid') continue;
            query += '?&' + prop + '='+ defaultParams[prop]
        }
        return this.get(query);
    }

    // endpoint: Files



    if (cmd) {
        return this.cmd;
    } else {
        return this;
    }
}


define (function(){
    var exports = {};
    exports.method = xiaohan;
    return exports;
})
