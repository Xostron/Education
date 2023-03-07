const fortunes = [
    "Охотник на лис",
    "Морской бой",
    "Warhammer 30k",
    "Dragon Age",
    "God of war"
]

exports.getFortune = ()=>{
    const idx = Math.floor(Math.random()*fortunes.length)
    return fortunes[idx]
}