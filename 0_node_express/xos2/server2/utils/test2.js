const unset = {};
let obj = {
    name:'',
    img:'',
    'logo.mobile':'',
    'logo':''
}
const keyImg = [
    "img",
    "logo.mobile",
    "logo.site",
    "logo.bonus",
    "logo.promo",
    "logo.home.on",
    "logo.home.off",
    "logo",
    "ico",
    "descImg",
    "pattern",
    "bmp",
    "img1",
    "img2",
    "img3",
    "img4",
    "img5",
    "ico",
    "screen1",
    "screen2",
    "screen3",
    "screen4",
    "screen5",
    "screen6",
    "screen7",
    "screen8",
    "screen9",
    "screen10",
];
console.log('Before = ', obj)
for (let key in obj){
    if (keyImg.includes(key)) {
        unset[key] = obj[key]
        delete obj[key]
    }
}
delete obj['img1']
console.log('After = ', obj)