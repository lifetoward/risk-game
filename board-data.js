/**
 * board is a collection of relationships between territories
 * Game play is:
 * Turn top:
 *  0. Exchange cards if willing & able
 *  1. Place armies
 *  2. Campaign
 *      A. Choose Base
 *      B. Choose Target
 *      C. Define attack parameters
 *      D. Repeat as wanted
 *  3. Fortify (from/to/count)
 *  4. Collect card if earned
 * 
 * Special logic for game start options being:
 * 1. Round robin choosing territories
 * 2. Random deal
 * 
 * Shuffle & manage card deck
 * 
 * How to calculate armies earned (based on continents territories cardsets) 
 */


let Continents = {
    'South America':{ 
        'Venezuela':{ center:{x:23,y:87},fill:{x:23,y:60},count:{x:23,y:103} },
        'Peru':{}, 
        'Brazil':{},
        'Argentina':{},
    },
    'North America':{
        'Western U.S.':{}, 
        'Eastern U.S.':{}, 
        'Ontario':{}, 
        'Greenland':{},
        'Quebec':{}, 
        'Northwest Territory':{}, 
        'Alaska':{},
        'Central America':{},
        'Alberta':{}
    ],
    'Africa':['South Africa','Egypt','East Africa','Congo','North Africa','Madagascar'],
    'Asia':['Middle East','Mongolia','Siberia','Ural','Afghanistan','India','Siam','China',
        'Kamchatka','Japan','Irkutsk','Yakutsk'],
    'Australia':['Indonesia','Western Australia','Eastern Australia','New Guinea'],
    'Europe':['Southern Europe','Northern Europe','Scandinavia','Iceland','Western Europe',
        'Ukraine','Great Britain']
}
let Borders = {
    // These have 6 borders
    'North Africa':['Egypt','Brazil','Congo','East Africa','Western Europe','Southern Europe'],
    'Ontario':['Northwest Territory','Eastern U.S.','Quebec','Alberta','Greenland','Western U.S.'],
    'China':['Mongolia','Siberia','Ural','Afghanistan','India','Siam'],
    'Ukraine':['Ural','Afghanistan','Middle East','Northern Europe','Scandinavia'],
    'Southern Europe':['Egypt','Northern Europe','Western Europe','Ukraine','Middle East'],
    'East Africa':['Congo','Middle East','Egypt','Madagascar','South Africa'],
    // 5
    'Kamchatka':['Alaska','Japan','Yakutsk','Irkutsk','Mongolia'],
    'Northern Europe':['Great Britain','Western Europe','Scandinavia'],
    'Siberia':['Yakutsk','Irkutsk','Mongolia','Ural'],
    'Afghanistan':['Ural','Middle East','India'],
    'Mongolia':['Irkutsk','Japan'],
    // 4
    'Northwest Territory':['Alaska','Greenland','Alberta'],
    'Brazil':['Argentina','Venezuela','Peru'],
    'Alberta':['Western U.S.','Alaska'],
    'Greenland':['Iceland','Quebec'],
    'Scandinavia':['Great Britain','Iceland'],
    'Western U.S.':['Eastern U.S.','Central America'],
    'Eastern U.S.':['Central America','Quebec'],
    'India':['Siam','Middle East'],
    'Irkutsk':['Yakutsk'],
    'Western Europe':['Great Britain'],
    'Egypt':['Middle East'],
    'Great Britain':['Iceland'],
    // 3
    'New Guinea':['Western Australia','Indonesia','Eastern Australia'],
    'Peru':['Argentina','Venezuela'],
    'Western Australia':['Eastern Australia','Indonesia'],
    'South Africa':['Congo','Madagascar'],    
    'Indonesia':['Siam'],
    'Venezuela':['Central America'],
}

let Territories = {};

let CardFigures = {
    Infantry:[//],
    Cavalry:[//],
    Artillery:[//],
}
let WildCards = 2;

let CardExchanges = [ 4, 6, 8, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50 ];

/* Below here we derive useful data structures from the fundamentals above. */

let Territories = {};
for (let c in Continents) 
    for (let t in Continents[c])
        Territories[t] = { Name:t, Continent:c, Neighbors:new Set(), Graphic:Continents[c][t] };
for (let b in Borders) {
    for (let t of Borders[b]) {
        if (!Territories[b] || !Territories[t]) 
            console.log(`Either ${b} or ${t} not in Territories:`);
        Territories[b].Neighbors.add(t);
        Territories[t].Neighbors.add(b);
    }
}

let Cards = [];
for (let f in CardFigures) 
    for (let t of CardFigures[f]) 
        Cards.push({ territory:t, figure:f });
for (let x = 0; x < WildCards; x++) 
    Cards.push({ territory:null, figure:null });

/* The code below are to produce check values for testing our code only. */

for (let x in Continents)
    console.log(`${x}:${Continents[x].length}`);
    
let relcount = 0;
for (let x in Borders)
    relcount += Borders[x].length;
console.log(`Total relationships defined:${relcount}`);

let bordercount = 0;
for (let t in Territories) {
    bordercount += Territories[t].Neighbors.size;
    console.log(`${t} has ${Territories[t].Neighbors.size} bordering territories.`);
}
console.log(`Total borders (counted/2) = ${bordercount/2}`);
