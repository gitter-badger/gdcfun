console.log('xiaohan.js')

xiaohan = function(cmd) {
    this.url = 'https://api.gdc.cancer.gov';

    // endpoint: status
    this.get = async function(cmd){
        cmd = cmd || 'status';
        try {
            const response = await fetch(this.url + '/' + cmd);
            console.log('fetch success');
            return await response.json();
        }
        catch(err) {
            console.log('fetch failed', err);
        }
    }


    if (cmd) {
        return this.cmd;
    } else {
        return this;
    }
}


// endpoint: xx