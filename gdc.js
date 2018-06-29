// if(typeof(define)!=="undefined"){
//     define({
//         loadTsv:ray.loadTsv,
//         tsv2tab:ray.tsv2tab
//     })
// }
if(typeof(ray)=='undefined'){
    console.log("loading ray.js")
    let s = document.createElement('script')
    s.src='ray.js'
    document.head.appendChild(s)
}