const fs = require('fs-extra')
const { 
    prefix
} = JSON.parse(fs.readFileSync('./settings/setting.json'))

list = (pushname) =>`
Hi, ${pushname}! 
Berikut ini beberapa category command

➣ ${prefix}creator
➣ ${prefix}isalam
➣ ${prefix}nsfw
➣ ${prefix}search
➣ ${prefix}random
➣ ${prefix}download
➣ ${prefix}lainnya
➣ ${prefix}botinfo
`

creator = () =>`
Menu Creator:
➣ ${prefix}cooltext
➣ ${prefix}logopornhub
➣ ${prefix}sticker
➣ ${prefix}stickergif
➣ ${prefix}stickergiphy
➣ ${prefix}meme
➣ ${prefix}quotemaker
➣ ${prefix}nulis
`

islam = () =>`
Menu Islam
➣ ${prefix}infosurah
➣ ${prefix}surah
➣ ${prefix}tafsir
➣ ${prefix}ALaudio
➣ ${prefix}jsolat
`

nsfw = () =>`
➣ ${prefix}nekopoi
➣ ${prefix}anime
➣ ${prefix}kpop
`

search = () =>`
➣ ${prefix}dewabatch
➣ ${prefix}whatanime
➣ ${prefix}images
➣ ${prefix}sreddit
➣ ${prefix}resep
➣ ${prefix}wiki
➣ ${prefix}stalkig
➣ ${prefix}cuaca
➣ ${prefix}chord
➣ ${prefix}lirik
➣ ${prefix}play
➣ ${prefix}movie
➣ ${prefix}cekzodiak
➣ ${prefix}artinama
➣ ${prefix}jodoh
➣ ${prefix}ygo
`

random = () =>`
➣ ${prefix}motivasi
➣ ${prefix}memes
➣ ${prefix}howgay
➣ ${prefix}fakta
➣ ${prefix}katabijak
➣ ${prefix}quote
➣ ${prefix}pantun
➣ ${prefix}cerpen
➣ ${prefix}cersex
➣ ${prefix}puisi
`

download = () =>`
➣ ${prefix}ytmp3
➣ ${prefix}ytmp4
➣ ${prefix}facebook
`

lainnya = () =>`
➣ ${prefix}tts
➣ ${prefix}translate
➣ ${prefix}resi
➣ ${prefix}covidindo
➣ ${prefix}ceklokasi
➣ ${prefix}shortlink
➣ ${prefix}bapakfont
➣ ${prefix}hilihfont
➣ ${prefix}skimg
`

botinfo = () =>`
➣ ${prefix}botlink
➣ ${prefix}botstat
➣ ${prefix}donasi
➣ ${prefix}join
`

owner = () =>`
➣ ${prefix}ban
➣ ${prefix}bc
➣ ${prefix}leaveall
➣ ${prefix}clearall
`

admin = () =>`
➣ ${prefix}kick
➣ ${prefix}add
➣ ${prefix}promote
➣ ${prefix}demote
➣ ${prefix}mutegrupe
➣ ${prefix}everyone
➣ ${prefix}del
➣ ${prefix}setprofil
➣ ${prefix}welcome
`

grupc = () =>`
➣ ${prefix}kickall
`

donasi = () =>`
trakteer.falent.me
`

exports.menu = () => a = {
"list":list().trim(),
"creator":creator().trim(),
"islam":islam().trim(),
"nsfw":nsfw().trim(),
"search":search().trim(),
"random":random().trim(),
"download":download().trim(),
"lainnya":lainnya().trim(),
"botinfo":botinfo().trim(),
"owner":owner().trim(),
"admin":admin().trim(),
"grupc":grupc().trim()
}
