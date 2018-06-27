console.log('gdcfun.js loaded')

if(typeof(gdc)=='undefined'){
    console.log("couldn't find gdc so loaded it")
    let s = document.createElement('script')
    s.src='https://mathbiol.github.io/gdc/gdc.js'
    document.head.appendChild(s)
}
if(typeof(jonas)=='undefined'){
    console.log("loading jonas.js")
    let s = document.createElement('script')
    s.src='jonas.js'
    document.head.appendChild(s)
}
if(typeof(ray)=='undefined'){
    console.log("loading ray.js")
    let s = document.createElement('script')
    s.src='ray.js'
    document.head.appendChild(s)
}
if(typeof(xiaohan)=='undefined'){
    console.log("loading xiaohan.js")
    let s = document.createElement('script')
    s.src='xiaohan.js'
    document.head.appendChild(s)
}


// Xiaohan asks
// when I try to import ray's module using` 
// gdc = require('https://mathbiol.github.io/gdcfun/gdcfun.js')` ,
// it comes up with Error message 'Invalid module'. 
// Ray and me are trying to fix it, do you have any suggestion?
//
// Sure,here's an example

gdcfun={}
gdcfun.hello=()=>{
    return 'hello from gdcfun at '+Date()
}

if(typeof(define)!='undefined'){
    define(gdcfun)
}
