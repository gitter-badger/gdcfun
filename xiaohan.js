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
    // input: sample_id
    this.getCase = async function(id) {
        cmd = 'cases';
        urlFetch = this.url + '/' + cmd + '/' + id;
        try {
            var response = (await fetch(urlFetch)).json();
            console.log('getCaset() success');
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




