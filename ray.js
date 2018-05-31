console.log('ray.js loaded')

ray=function(){
    this.url='https://api.gdc.cancer.gov'
    this.hello=()=>{
        return 'hello from ray at ' + Date()
    }
//     this.get= async (cmd)=>{
//         cmd=cmd||'status' // default cmd is status
//         var r = (await fetch(this.url+'/'+cmd)).json()
//         return await r
//     }
//     // recording status when function is initiatized
//     var that=this
//     this.get().then(x=>{
//         that.status=x
//         console.log('initialization API status at '+Date()+':',x)
//     })
//     if(cmd){
//         return this.get(cmd)
//     }else{
//         return this
//     }
}

ray.times=(a, b)=>{
    return a * b
}

ray.getLength=(a)=>{
    return a.length
}