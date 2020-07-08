import axios from 'axios';

// Global app controller

//https://forkify-api.herokuapp.com/api/search

async function getRestults(query){
    try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
        const recipes = res.data.recipes; 
        console.log(recipes)
    } catch (error) {
        alert(error)
    }
    
    
}

getRestults('pasta');