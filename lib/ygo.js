var endpoint = 'https://db.ygoprodeck.com/api/v7/'

var normal = endpoint + 'cardinfo.php'
var random = endpoint + 'randomcard.php'
var cs = endpoint + 'cardsets.php'
var csInfo = endpoint + 'cardsetsinfo.php'
var archetype = endpoint + 'archetypes.php'



       async function fetchJSON(url){
       	let response = await fetch(url);
           return json = await response.json()
           }
       async function fetchText(url){
           let response = await fetch(url);
           return text = await response.text()
           }
       
       
           
       function dataFilter(data, cardInfo, withStat){
       	switch(data.type) {
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
                       if(withStat === true) cardInfo += '\n' + data.atk + '\/' + data.def + '\nDesc : ' + data.desc
                       return cardInfo
                    break
                    case 'Link Monster':
                       cardInfo = data.name + ' | Type : ' + data.type +' | Link : ' + data.linkval
                       if(withStat === true) cardInfo += '\n' + data.atk + '\/' + data.def + '\nDesc : ' + data.desc
                       return cardInfo 
                    break
                    case 'Synchro Pendulum Effect Monster':
                    case 'Pendulum Tuner Effect Monster':
                    case 'XYZ Pendulum Effect Monster':
                    case 'Pendulum Effect Monster':
                    case 'Pendulum Effect Fusion Monster':
                    case 'Pendulum Normal Monster':
                    case 'Pendulum Flip Effect Monste':
                       cardInfo = data.name + ' | Type : ' + data.type +' | Level : ' + data.level + ' | pendulm scale : ' + data.scale
                       if(withStat === true) cardInfo += '\n' + data.atk + '\/' + data.def + '\nDesc : ' + data.desc
                       return cardInfo
                    break
                    case 'Skill Card':
                    case 'Spell Card':
                    case 'Trap Card':
                       cardInfo = data.name + ' | Type : ' + data.type + ' | ' + data.type.replace('Card','Type : ') + data.race
                       if(withStat === true) cardInfo +=  '\nDesc : ' + data.desc
                       return cardInfo
                    break
                    default:
                        console.log(data)
           }
      }
        
        
        
       async function batchGetList(data, dataLength){
       	var cardList = '?'
           var cardData = data
           for (i = 0; i < dataLength; i++) {
              if(i === dataLength -1){
                 let cardInfo = await dataFilter(data.data[i], cardList)
                 cardList += '- ' + cardInfo + '\n'
                 return cardList.replace('?','')
              }else{
              let cardInfo = await dataFilter(data.data[i], cardList)
              cardList += '- ' + cardInfo + '\n'
              }
          }
      }
      /*
Function segment
      */
     async function searchWithName(name){
        url = normal + '?fname=' + name.replace(/ /gi,'%20')
        const cardData = await fetchJSON(url)
        const length = await cardData.data.length
        return cardList = await batchGetList(cardData, length, true)
        return cardList
	}
	
	
	
	async function getRandom(){
		const cardData = await fetchJSON(random)
		cardInfo = await dataFilter(cardData, '-')
		return cardInfo
		}
	
	
	
	async function getWithName(name){
	    url = normal + '?name=' + name.replace(/ /gi,'%20')
        const cardData = await fetchJSON(url)
        if(cardData.error !== undefined) {
          backUp = await searchWithName(name)
          cardInfo = "Maaf,tidak dapat menemukan kartu,mungkin maksud anda : \n" + backUp
        }else{
        cardInfo = await dataFilter(cardData.data[0],'?' ,true)
        }
        return cardInfo.replace('/undefined','')
    }
    module.exports {
       getWithName,
       getRandom
    }

