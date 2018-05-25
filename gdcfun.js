console.log('gdcfun.js loaded')

if(typeof(gdc)=='undefined'){
    console.log("couldn't find gdc so loaded it")
    let s = document.createElement('script')
    s.src='https://mathbiol.github.io/gdc/gdc.js'
    document.head.appendChild(s)
}