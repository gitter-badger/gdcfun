console.log('xiaohan.js')





xiaohan = function(cmd) {
    this.url = 'https://api.gdc.cancer.gov';

    // endpoint: status
    this.get = async function(cmd){
        cmd = cmd || 'status';
        //debugger
        try {
            //const response = await (fetch(this.url + '/' + cmd).json());
            var response = (await fetch(this.url + '/' + cmd)).json();
            console.log('get() success');
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
    this.getCases = async function() {
        endpoint = 'cases';
        urlFetch = this.url + '/' + endpoint;
        try {
            var response = (await fetch(urlFetch)).json();
            console.log('getCases() success');
            return await response;
        } 
        catch(err) {
            console.log(err);
        }
    }

    // get case by case id
    this.getCase = async function(id) {
        cmd = 'cases';
        urlFetch = this.url + '/' + cmd + '/' + id;
        try {
            var response = (await fetch(urlFetch)).json();
            console.log('getCase() success');
            return await response;
        }
        catch(err) {
            console.log(err);
        }
    }


    if (cmd) {
        return this.cmd;
    } else {
        return this;
    }
}


define(function(){
    var exports = {};
    exports.method = xiaohan;
    return exports;
})
