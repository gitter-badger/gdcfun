console.log('jonas.js loaded')


jonas= function(cmd){
    this.url='https://api.gdc.cancer.gov'
    this.hello=()=>{
        return 'hello from jonas at '+Date()
    }
    this.get= async (cmd)=>{
        cmd=cmd||'status' // default cmd is status
        var r = (await fetch(this.url+'/'+cmd)).json()
        return await r
    }
    // recording status when function is initiatized
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

// this one will automatically record status when the jonas.js is loaded

// j = new jonas
// then check
// j.status

// this one will returns promise to get status

// j = new jonas('status')