console.log('xiaohan.js')

xiaohan = function(cmd) {
    this.url = 'https://api.gdc.cancer.gov';

    // endpoint: status
    this.get = async function(cmd){
        cmd = cmd || 'status';
        //debugger
        try {
            const response = await (fetch(this.url + '/' + cmd).json());
            console.log('fetch worked');
        }
        catch(err) {
            console.log('fetch failed', err);
        }
        return await response
    }

    
    if (cmd) {
        return this.cmd;
    } else {
        return this;
    }
}


// endpoint: xx

