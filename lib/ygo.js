const fetch = require('node-fetch')

var endpoint = 'https://db.ygoprodeck.com/api/v7/'

var archetype = endpoint + 'archetypes.php'
var csInfo = endpoint + 'cardsetsinfo.php'
var normal = endpoint + 'cardinfo.php'
var rand = endpoint + 'randomcard.php'
var cs = endpoint + 'cardsets.php'

       function cooldown(){
         let cd = false
       }        
       async function fetchJSON(url){
          if(cd === true)return
          let cd = true
          let response = await fetch(url)
          setTimeout(cooldown(), 51)
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
        if(withDesc === true) cardInfo += '\n' + data.atk + '\/' + data.def + '\nDesc : ' + data.desc
        return cardInfo
     break
     case 'Link Monster':
        cardInfo = data.name + ' | Type : ' + data.type +' | Link : ' + data.linkval
        if(withDesc === true) cardInfo += '\n' + data.atk + '\/' + data.def + '\nDesc : ' + data.desc
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
       if(withDesc === true) cardInfo += '\n' + data.atk + '\/' + data.def + '\nDesc : ' + data.desc
       return cardInfo
     break
     case 'Skill Card':
     case 'Spell Card':
     case 'Trap Card':
       cardInfo = data.name + ' | Type : ' + data.type + ' | ' + data.type.replace('Card','Type : ') + data.race
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
      cardList += '\n- ' + cardInfo
      return cardList.replace('?\n','')
    }else{
      cardInfo = await dataFilter(data[i])
      cardList += '\n- ' + cardInfo
    }
  }
}

async function search(name){
  url = normal + '?fname=' + name.replace(/ /gi,'%20')
  const cardData = await fetchJSON(url)
  const length = await cardData.data.length
  const list = await getList(cardData.data, length)
  return list
}
async function random(desc){
  const cardData = await fetchJSON(rand)
  const cardInfo = await dataFilter(cardData)
  return cardInfo
}
async function getWName(name){
  url = normal + '?name=' + name.trim().replace(/ /gi,'%20')
  const cardData = await fetchJSON(url)
  if(cardData.error !== undefined) return await search(name)
  const cardInfo = await dataFilter(cardData.data[0], true)
  return cardInfo
}

module.exports = {
  random,
  getWName
}
