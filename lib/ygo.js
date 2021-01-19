const fetch = require('node-fetch')

var endpoint = 'https://db.ygoprodeck.com/api/v7/'

var archetype = endpoint + 'archetypes.php'
var csInfo = endpoint + 'cardsetsinfo.php'
var normal = endpoint + 'cardinfo.php'
var rand = endpoint + 'randomcard.php'
var cs = endpoint + 'cardsets.php'

       async function fetchJSON(url){
          let response = await fetch(url)
          return json = await response.json()
        }
       
        
function dataFilter(data, withDesc){
  switch(data.type){
     case 'Normal Monster':
     case 'Effect Monster':
     case 'Synchro Monster':
     case 'Fusion Monster':
     case 'Tuner Monster':
     case 'XYZ Monster':
     case 'Ritual Monster':
     case 'Toon Monster':
     case 'Spirit Monster':
     case 'Union Effect Monster':
     case 'Union Normal Monster':
     case 'Ritual Effect Monster':
     case 'Flip Effect Monster':
     case 'Gemini Monster':
     case 'Synchro Tuner Monster':
     case 'Token':
     case 'Normal Tuner Monster':
        cardInfo = data.name + ' | Type : ' + data.type +' | Level : ' + data.level
        if(withDesc === true) cardInfo += '\n' + data.race + '\/' + data.attribute + '\n' + data.atk + '\/' + data.def + '\nDesc : ' + data.desc
        return cardInfo
     break
     case 'Link Monster':
        cardInfo = data.name + ' | Type : ' + data.type +' | Link : ' + data.linkval
        if(withDesc === true) cardInfo += '\n' + data.race + '\/' + data.attribute + '\n' + data.atk + '\nDesc : ' + data.desc
        return cardInfo 
     break
     case 'Synchro Pendulum Effect Monster':
     case 'Pendulum Tuner Effect Monster':
     case 'XYZ Pendulum Effect Monster':
     case 'Pendulum Effect Monster':
     case 'Pendulum Effect Fusion Monster':
     case 'Pendulum Normal Monster':
     case 'Pendulum Flip Effect Monster':
       cardInfo = data.name + ' | Type : ' + data.type +' | Level : ' + data.level + ' | pendulm scale : ' + data.scale
       if(withDesc === true) cardInfo += '\n' + data.race + '\/' + data.attribute + '\n' + data.atk + '\/' + data.def + '\nDesc : ' + data.desc
       return cardInfo
     break
     case 'Skill Card':
     case 'Spell Card':
     case 'Trap Card':
       cardInfo = data.name + ' | Type : ' + data.type + '(' + data.race + ')'
       if(withDesc === true) cardInfo +=  '\nDesc : ' + data.desc
       return cardInfo
      break
      default:
        return cardInfo = data.type
  }
}

async function getList(data, length){
  var cardList = '?'
  for(i = 0 ; i < length ; i++ ){
    if(i === length - 1){
      cardInfo = await dataFilter(data[i])
      cardList += '\n\n- ' + cardInfo
      return cardList.replace('?\n','')
    }else{
      cardInfo = await dataFilter(data[i])
      cardList += '\n\n- ' + cardInfo
    }
  }
}

async function getPic(data){
  return data.card_images[0].image_url
}//sedikit boros, tapi karena aku malas mengetik snake case jadi ku buat function 

async function search(name,  withPic){
  url = normal + '?fname=' + name.replace(/ /gi,'%20').replace(/@/gi,'%40').replace(/:/gi,'%3a')
  const cardData = await fetchJSON(url)
  if(cardData.error !== undefined) return errorAlert = 'maaf tidak dapat menemukan kartu'
  const length = await cardData.data.length 
  if(length === 1 && withPic)return [await dataFilter(cardData.data[0], false),await getPic(cardData.data[0])]
  if(length === 1 && !withPic)return await dataFilter(cardData.data[0], false)
  const list = await getList(cardData.data, length)
  return list
}
async function random(desc, withPic){
  const cardData = await fetchJSON(rand)
  const cardInfo = await dataFilter(cardData, desc)
  if(withPic)return [cardInfo, await getPic(cardData)]
  return cardInfo
}
async function getWName(name, withPic, withDesc){
  url = normal + '?name=' + name.trim().replace(/ /gi,'%20').replace(/@/gi,'%40').replace(/:/gi,'%3a')
  const cardData = await fetchJSON(url)
  if(cardData.error !== undefined) return await search(name, withPic)
  const cardInfo = await dataFilter(cardData.data[0], withDesc)
  if(withPic)return [cardInfo, await getPic(cardData.data[0])]
  return cardInfo
}


module.exports = {
  random,
  getWName
}
