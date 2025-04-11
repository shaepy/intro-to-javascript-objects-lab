// const pokemon = require('./data.js');

const game = {
    party: [],
    gyms: [
      { location: "Pewter City", completed: false, difficulty: 1 },
      { location: "Cerulean City", completed: false, difficulty: 2 },
      { location: "Vermilion City", completed: false, difficulty: 3 },
      { location: "Celadon City", completed: false, difficulty: 4 },
      { location: "Fuchsia City", completed: false, difficulty: 5 },
      { location: "Saffron City", completed: false, difficulty: 6 },
      { location: "Cinnabar Island", completed: false, difficulty: 7 },
      { location: "Viridian City", completed: false, difficulty: 8 },
    ],
    items: [
      { name: "potion", quantity: 4 },
      { name: "pokeball", quantity: 8 },
      { name: "rare candy", quantity: 99 },
    ],
  }


/* 
********************************************************************************************************

NOTE FOR ASSIGNMENT/PEER REVIEW: 
* Recommended to use the console in browser instead of the node app.js from VS terminal, to easily 
read the console messages that are logged through the methods in each exercise. 

* Note that although .sort() is not yet called until Exercise 17, the earlier logs for game.party 
will still show them sorted by HP descending when using the browser console. 

********************************************************************************************************
*/

// This prints all the pokemon
// console.dir(pokemon, { maxArrayLength: null })

// Exercise 1
// console.log('Exercise 1: ', pokemon[58].name)

// Exercise 2
console.log('----------EXERCISE 2 RESULTS ----------')
console.log('Game Menu: ', game)

/*

Exercise 3
1. Add a new property to the `game` object. Let's call it "difficulty".
2. Choose a value for "difficulty" that you think fits the game. Ex: "Easy", "Med" or "Hard". How would you assign it?
Solve Exercise 3 here:

*/

// This property determines the difficulty based on a string that is either 'EASY', 'MEDIUM', or 'HARD'.
game.difficulty = '';

// This function takes in a mode as a string and changes the difficulty if it matches with a setting
game.changeDifficulty = function(mode) {
  let selectedMode = mode.toUpperCase()
  const difficultySettings = ['EASY', 'MEDIUM', 'HARD']

// If the mode is an option in Settings, change the difficulty, and print the current difficulty
  if (difficultySettings.includes(selectedMode)) {                         
    this.difficulty = selectedMode                                         
    console.log(`The current difficulty is set to ${selectedMode}.`)       
  }
  else {
    console.log('That is not an available setting. Choose EASY, MEDIUM, or HARD.')
  }
}

console.log('----------EXERCISE 3 RESULTS ----------')
game.changeDifficulty('easy')
game.changeDifficulty('hARD')
game.changeDifficulty('sds')

/*

Exercise 4
1. Select a starter Pokémon from the `pokemon` array. Remember, a starter Pokémon's `starter` property is true.
2. Add this Pokémon to the `game.party` array. Which array method will you use to add them?

Solve Exercise 4 here:

*/

game.party.push(pokemon[24])  // I choose Pikachu

/*

Exercise 5
1. Choose three more Pokémon from the `pokemon` array and add them to your party.
2. Consider different attributes like 'type' or 'HP' for your selection. Which array method will you use to add them?

Solve Exercise 5 here:
*/

// This method makes a random number within the pokemon array and pushes a pokemon to the party
game.findRandomPokemon = function(){
  const randomNum = Math.floor(Math.random() * pokemon.length);
  const randomPokemon = pokemon[randomNum]

  // This checks to see if the party is full, and adds to party if not
  if (this.party.length < 6) {            
    this.party.push(randomPokemon)          
    console.log(`Wow! You have found a wild ${randomPokemon.name}. Check your party.`)
  }

  // This will push the Pokemon to collection if party is full
  else { 
    this.collection.push(randomPokemon)      
    console.log(`Wow! You have found a wild ${randomPokemon.name}. Check your collection.`)
  }
}

console.log('----------EXERCISE 5 RESULTS ----------')
game.findRandomPokemon();         // Call method for random Pokemon
game.findRandomPokemon();         // Re-save to refresh browser console and select different random Pokemon
game.findRandomPokemon();

console.log('Party: ', game.party)

/*

Exercise 6
1. Set the `completed` property to true for gyms with a difficulty below 3.
2. Think about how you'd loop through the `gyms` array to check and update the `completed` property.

Solve Exercise 6 here:
*/

// This function takes a number and sets all gyms below that level to completed: true
game.completeLevelsBelow = function(difficultyLevel) {    
  this.gyms.forEach(gym => {                              
    if (gym.difficulty < difficultyLevel) {            
        gym.completed = true;
        console.log(`Congrats! You have defeated the gym leader at ${gym.location}.`)
    }
  })
}

console.log('----------EXERCISE 6 RESULTS ----------')
game.completeLevelsBelow(3);

/*

Exercise 7
1. Evolve the starter Pokémon you added to your party earlier. Each starter Pokémon evolves into a specific one.
2. How would you replace the current starter Pokémon in your party with its evolved form?

Hint: 
  - Pokemon 1: Bulbasaur evolves into Pokemon 2: Ivysaur
  - Pokemon 4: Charmander evolves into Pokemon 5: Charmeleon
  - Pokemon 7: Squirtle evolves into Pokemon 8: Wartortle
  - Pokemon 25: Pikachu evolves into Pokemon 26: Raichu

More Hints: The existing starter Pokemon will be *replaced* in your party with the Pokemon it evolved into. When working with an array of objects, the splice() array method is ideal for replacing one element with another. 

Solve Exercise 7 here:
*/

console.log('----------EXERCISE 7 RESULTS ----------')

// This object holds starter Pokemon and their paired evolutions
let pokemonEvolutions = {
  starterPokemon: [],
  starterNextEvolve: [],
  starterFinalEvolve: []
}

// This function fills up the pokemonEvolutions object based on which Pokemon have starter: true
const setStarterPokemon = () => {
  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].starter === true) {
      pokemonEvolutions.starterPokemon.push(pokemon[i])
      pokemonEvolutions.starterNextEvolve.push(pokemon[i+1])
      pokemonEvolutions.starterFinalEvolve.push(pokemon[i+2])
    }
  }
}

// Call the function to fill up the pokemonEvolutions object
setStarterPokemon();

console.log(pokemonEvolutions)

/* This method below evolves any starter Pokemon in your party, up to its Final evolution.
 It will look at all the monsters in your party, and will evolve any that are starterPokemons 
 I used a for loop so we can place 'x' as the position to splice. */
 
game.evolveStarterPokemon = function(){
  // This looks at each Pokemon in the party
  for (let x = 0; x < this.party.length; x++) {                                  
    const monster = this.party[x]

    // This checks if the Pokemon is a starterPokemon, which one is it, and replaces it with the corresponding starterNextEvolve
    if (pokemonEvolutions.starterPokemon.includes(monster)) {                      
      for (let i = 0; i < pokemonEvolutions.starterPokemon.length; i++) {                      
        if (monster === pokemonEvolutions.starterPokemon[i]) {                   
          this.party.splice(x, 1, pokemonEvolutions.starterNextEvolve[i])         
          console.log(`Your ${monster.name} has evolved into ${pokemonEvolutions.starterNextEvolve[i].name}!`)
        } 
      } 
    }
    // This checks if the Pokemon is a nextEvolve starter, which one is it, and replaces it with the corresponding starterFinalEvolve
    else if (pokemonEvolutions.starterNextEvolve.includes(monster)) {              
      for (let i = 0; i < pokemonEvolutions.starterNextEvolve.length; i++) {       
        if (monster === pokemonEvolutions.starterNextEvolve[i]) {
          this.party.splice(x, 1, pokemonEvolutions.starterFinalEvolve[i]) 
          console.log(`Your ${monster.name} has evolved into ${pokemonEvolutions.starterFinalEvolve[i].name}!`)
        } 
      }
    }
    // This checks if it's already at finalEvolve, and prints a message stating so.
    else if (pokemonEvolutions.starterFinalEvolve.includes(monster)) {           
      console.log(`Your ${monster.name} is already at the final evolution.`)            
    }
  }
}

game.evolveStarterPokemon();
game.evolveStarterPokemon();
//game.evolveStarterPokemon();

console.log(game.party)

/*

Exercise 8
1. Print the name of each Pokémon in your party.
2. Consider using a loop or an array method to access each Pokémon's name.

Solve Exercise 8 here:
*/

console.log('----------EXERCISE 8 RESULTS ----------')

// This method will log the name of each Pokemon in the party and its corresponding position.
game.viewParty = function(){
  for (let i = 0; i < game.party.length; i++) {
    console.log(`Party Position ${i + 1}: `, game.party[i].name)
  }
}

game.viewParty()

/*

Exercise 9
1. Can you print out all the starter Pokémon from the `pokemon` array?
2. Think about how you can identify a starter Pokémon and then log their names.

Solve Exercise 9 here:
*/ 
console.log('----------EXERCISE 9 RESULTS ----------')

// This method will log all the starter Pokemons available in the game.
game.showStarterPokemon = function(){
  pokemon.forEach(monster => {
    if (monster.starter === true) {
      console.log(`${monster.name} is a starter pokemon.`)
  }
  })
}

game.showStarterPokemon();

/*

Exercise 10
Create a method called `catchPokemon` and add it to the `game` object. You should not need to edit the original game object directly. This method should:
  - Accept an object as a parameter called `pokemonObj`
  - Add the `pokemonObj` to the `game.party` array.
  - not return anything

After writing this method, call it and pass in a Pokemon object of your choice from the `pokemon` data to catch it.

Solve Exercise 10 here:
*/

// NOTE: I updated this method in Exercise 20.
game.catchPokemon = function(pokemonObj) {
    this.party.push(pokemonObj)
}

// game.catchPokemon(pokemon[64])

/*

Exercise 11
1. Copy the `catchPokemon` method that you just wrote above, and paste it below. Modify it so that it also decreases the number of pokeballs in your inventory each time you catch a Pokémon.
2. How will you find and update the quantity of pokeballs in the `game.items` array?

Tips:
For this exercise, it's okay to have a negative number of pokeballs.
After updating the method, call it and pass in a Pokemon object of your choice from the `pokemon` data to catch it.
Also, log the `game.items` array to confirm that the pokeball quantity is being decremented.

Solve Exercise 11 here:
*/

game.catchPokemon = function(pokemonObj) {
    this.party.push(pokemonObj)
    this.items[1].quantity--
}

game.catchPokemon(pokemon[150])
// console.log(game.items)

/*

Exercise 12
1. Similar to Exercise 6, now complete gyms with a difficulty below 6. How will you approach this?
 (change the value of `complete` in the qualifying objects from false to true).

Solve Exercise 12 here:
*/

console.log('----------EXERCISE 12 RESULTS ----------')
// Calling a previous method and setting the difficultyLevel to 6
game.completeLevelsBelow(6);

/*

Exercise 13
1. Create a `gymStatus` method in `game` to tally completed and incomplete gyms.
2. How will you iterate through the `gyms` array and update the tally? Remember to log the final tally.

This method should:
  - Not accept any arguments.
  - Initially create a constant `gymTally`, which is an object that has two 
    properties: `completed` and `incomplete`, both of which are initially set to 0.
  - Iterate through the objects in the `game.gyms` array and update the 
    properties on `gymTally` as follows: 
    - `completed` should count how many gyms in the array have a value of `true` 
      for their `completed` property. 
    - `incomplete` should count how many gyms in the array have a value of 
      `false` for their `completed` property.
  - Log the value of `gymTally`.
  - The method should not return anything.

For example, if five gym objects have a value of `true` on their `completed` property and three gym objects have a value of `false` on their `completed` property, the logged value would be: `{ completed: 5, incomplete: 3 }`.

Solve Exercise 13 here:
*/

// This method looks at each gym and tallies them into the gymTally object, completed (true) or incomplete (false)
game.gymStatus = function() {
  const gymTally = {completed: 0, incomplete: 0}
    this.gyms.forEach(location => {
      if (location.completed === true) {
          gymTally.completed++
      }
      else if (location.completed === false) {
          gymTally.incomplete++
      }
  })
  // This will print the tally after calculating the total
  console.log('Gym Tally: ', gymTally) 
}

console.log('----------EXERCISE 13 RESULTS ----------')
game.gymStatus()

/*

Exercise 14
1. Add a `partyCount` method to `game` that counts the number of Pokémon in your party.
This method should:
  - Not accept any arguments.
  - Count the number of Pokemon in the party.
  - return the found number of Pokemon in the party.

Solve Exercise 14 here:
*/

console.log('----------EXERCISE 14 RESULTS ----------')

// This method counts the number of Pokemon in the party and returns that value
game.partyCount = function() {
    return game.party.length
}

const currentPartyNumber = game.partyCount()
// Printing this to console for testing
console.log(`You have ${currentPartyNumber} Pokemon in your party.`)    

/*

Exercise 15
1. Now, complete gyms with a difficulty below 8. Reflect on how this is similar to or different from the previous gym exercises.
(change the value of `complete` in the qualifying objects from false to true).

Solve Exercise 15 here:
*/

console.log('----------EXERCISE 15 RESULTS ----------')
// Calling a previous method and setting the difficultyLevel to 8
game.completeLevelsBelow(8);
console.log('Gyms: ', game.gyms)

/*

Exercise 16
1. Log the entire `game` object to the console. Take a moment to review the changes you've made throughout the exercises.

Solve Exercise 16 here:
*/

console.log('----------EXERCISE 16 RESULTS ----------')
console.log('Game Menu: ', game)

/*

Exercise 17
1. Arrange the Pokémon in `game.party` by their HP. The one with the highest HP should come first.
2. You'll need to use the `.sort()` method. How does the compare function work in sorting numbers?

Solve Exercise 17 here:
*/


// This sorts the party by descending order of highest HP first by passing two arguments.
// It will compare b - a, and sort before or after based on whether the difference is positive, negative, or 0 
game.party.sort(function(a,b){
    return b.hp - a.hp
  }
)

/*
Exercise 18
Add a new property to the `game` object called `collection` and initialize its value to an empty array.

Copy the `catchPokemon` method you wrote in Exercise Twelve and paste it below. Modify it so that:
  - Ensure that no more than six Pokemon can be in the party at any time. 
    Excess Pokemon should be placed in the `game.collection` array.
  - It's up to you how to distribute Pokemon in a situation where more than six 
    would be placed into the `game.party` array.

Again, for this exercise, it's okay to have a negative number of pokeballs.
After updating the method, use it by calling it and passing in a pokemon object of your choice from the `pokemon` data to catch it.
Also, log the `game.items` array to confirm that the pokeball quantity is being decremented.

Solve Exercise 18 here:
*/

game.collection = [];

game.catchPokemon = function(pokemonObj) {
  this.items[1].quantity--
    // Check if the party is full. if not, add to party
    if (this.party.length < 6) {               
      this.party.push(pokemonObj)
      console.log(`You have captured ${pokemonObj.name}. ${pokemonObj.name} is now in your party.`)
    }
    // Else, add to collection
    else {
      this.collection.push(pokemonObj)
      console.log(`You have captured ${pokemonObj.name}. ${pokemonObj.name} has been added to your collection.`)
    }
}

console.log('----------EXERCISE 18 RESULTS ----------')
game.catchPokemon(pokemon[129])
game.viewParty()

/*

Exercise 19
Copy the `catchPokemon` method that you just wrote above, and paste it below. The time has come to make it so that we cannot catch a Pokemon when we do not have any pokeballs to catch it with. 
Modify the method so that if there are no pokeballs a message will be displayed that there are not enough pokeballs to catch the desired Pokemon.
Also, ensure that the Pokemon isn't added to the `game.party` or the `game.collection`.

Solve Exercise 19 here:
*/

game.catchPokemon = function(pokemonObj) {
  // This method checks and returns which index pokeballs is in
  const itemPokeballs = this.items.find(item => item.name === 'pokeball');

  // If pokeballs is greater than 0, decrement a pokeball from items
  if (itemPokeballs.quantity > 0) {         
    itemPokeballs.quantity--             
    console.log(`You threw a Pokeball. You have ${itemPokeballs.quantity} Pokeballs remaining.`)
    // Check if the party is full. if not, add to party
    if (this.party.length < 6) {               
      this.party.push(pokemonObj)
      console.log(`You have captured ${pokemonObj.name}. ${pokemonObj.name} is now in your party.`)
    }
    // Else, add to collection
    else {
      this.collection.push(pokemonObj)
      console.log(`You have captured ${pokemonObj.name}. ${pokemonObj.name} has been added to your collection.`)
    }
  }
  // Print this if pokeballs is less than or equals 0
  else { 
    console.log('You are out of Pokeballs.')      
  }
}

console.log('----------EXERCISE 19 RESULTS ----------')
game.catchPokemon(pokemon[11])
console.log('Collection: ', game.collection)
console.log('Inventory: ', game.items)


/*

Exercise 20
Copy the `catchPokemon` method that you just wrote above, and paste it below. Modify is so that you can just pass in the name of a Pokemon instead of an entire object, and the method will look up the Pokemon from the data set for you.
The string passed in should be allowed to be any case (for example, if the string 'PiKacHU' is passed to the function, it should match to 'Pikachu' in the data set). 
If there is not a match, then return a string noting that the selected Pokemon does not exist. Ensure you do not decrement the pokeball count if an invalid Pokemon name is passed in, and also ensure that the Pokemon isn't added to the `game.party` or the `game.collection`.

Solve Exercise 20 here:
*/

game.catchPokemon = function(name) {
  // This method checks and returns if the name is an existing object in pokemon
  const pokemonObj = pokemon.find(p => p.name.toLowerCase() === name.toLowerCase());
  // This method checks and returns which index pokeballs is in
  const itemPokeballs = this.items.find(item => item.name === 'pokeball');

   // Check if pokemonObj has returned something
  if (pokemonObj !== undefined) {
    // And if pokeballs is greater than 0, decrement a pokeball from items
    if (itemPokeballs.quantity > 0) {         
      itemPokeballs.quantity--             
      console.log(`You threw a Pokeball. You have ${itemPokeballs.quantity} Pokeballs remaining.`)
      // Check if the party is full. if not, add to party
      if (this.party.length < 6) {               
        this.party.push(pokemonObj)
        console.log(`You have captured ${pokemonObj.name}. ${pokemonObj.name} is now in your party.`)
      }
      // Else, add to collection
      else {
        this.collection.push(pokemonObj)
        console.log(`You have captured ${pokemonObj.name}. ${pokemonObj.name} has been added to your collection.`)
      }
    }
    // Print this if pokeballs is less than or equals 0
    else { 
      console.log('You are out of Pokeballs.')      
    }
  }
  // Print this if no match for the pokemon is found
  else {
    console.log('This Pokemon does not exist. Please try again.')      
  }
}

console.log('----------EXERCISE 20 RESULTS ----------')
// Throw until you're out of pokeballs!
game.catchPokemon('ocaptainmycaptaIn')
game.catchPokemon('SNORLAX')
game.catchPokemon('Gdsgkabibakumomo')
game.catchPokemon('jigglypuff')
game.catchPokemon('ditto')
game.catchPokemon('Ninetales')
game.catchPokemon('Staryu')
game.catchPokemon('Poliwag')
game.catchPokemon('MaGIKArp')
game.catchPokemon('Staryu')
game.catchPokemon('VULPIX')

console.log('Collection: ', game.collection)

console.log('Inventory: ', game.items)

/*

Exercise 21
Dynamically construct an object with the existing `pokemon` data sorted by the different pokemon types. The object will have this structure:
{
  grass: [
    { number: 1, name: 'Bulbasaur', type: 'grass', hp: 45, starter: true },
    { number: 2, name: 'Ivysaur', type: 'grass', hp: 60, starter: false },
    { number: 3, name: 'Venusaur', type: 'grass', hp: 80, starter: false },
    * more grass type Pokemon objects...
  ],
  fire: [
    { number: 4, name: 'Charmander', type: 'fire', hp: 39, starter: true },
    * more fire type Pokemon objects...
  ],
  water: [
    * water type Pokemon objects...
  ],
  * etc... until there is an array for every Pokemon type!
}
Log the object when it's constructed.

Solve Exercise 21 here:
*/

// This object will hold the new types and their matching pokemon objects
const typeCollector = {}; 

// For each monster in Pokemon,
pokemon.forEach((monster) => {             
  // If the Pokemon's type is not already in typeCollector, create a new array property with the type as the key name    
  if (monster.type in typeCollector === false) {       
    typeCollector[monster.type] = [];                   
  }
  // Add this monster to a type that matches
  typeCollector[monster.type].push(monster)             
})

console.log('----------EXERCISE 21 RESULTS ----------')
console.log(typeCollector);


/*
pseudo-code for Exercise 21:
create a new-object with keys that hold arrays
each key will be named after an existing pokemon 'type' (i.e grass, fire, water...)

go through each pokemon-obj in the pokemon array,
    for each pokemon-obj, look at the key 'type'
        if the value of 'type' matches a 'type' in new-object
            add this pokemon obj to that array
        if the value of 'type' is not in new-object
            add it as a key in new-object 
            add this pokemon-obj to that array
*/