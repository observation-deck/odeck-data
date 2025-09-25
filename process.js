import ships from './src/data/ships.json' with {type: 'json'}
import {writeFileSync} from 'fs'

const outList = []

for(var ship of ships){
    if(!Object.keys(ships).includes('minCrew')){
        ship.minCrew = ship.maxCrew
    }
    outList.push(ship)
}

writeFileSync('ships.json', JSON.stringify(outList, null, 2))