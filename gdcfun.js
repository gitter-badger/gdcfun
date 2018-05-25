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
if(typeof(jonas)=='undefined'){
    console.log("loading ray.js")
    let s = document.createElement('script')
    s.src='ray.js'
    document.head.appendChild(s)
}
if(typeof(jonas)=='undefined'){
    console.log("loading xiaohan.js.js")
    let s = document.createElement('script')
    s.src='xiaohan.js'
    document.head.appendChild(s)
}
