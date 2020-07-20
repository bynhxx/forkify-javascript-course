import Search from './models/Search';
import Recipe from './models/Recipe'; 
import * as searchView from './views/SearchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* 
Global state of the app 
-Search object
-Current recipe object
-Shopping list object
-Liked recipes
*/

// === SEARCH CONTROLLER == //

const state = {}
const controlSearch = async () => {
    // 1 - get query from the view
    const query = searchView.getInput(); 
    

    if(query){
        // 2 - new search object and add it to state
        state.search = new Search(query)

        // 3 - prepare UI for results
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchRes)

        try{

            // 4 - search for recipes
            await state.search.getResults()

            // 5 - render results on UI
            searchView.renderResults(state.search.result)
            
            
        } catch (err) {
            alert('Something wrong with the search'); 
            clearLoader()
        }

    } 

    // 2 - 
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //so the page doesn't reload
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10); 
        searchView.clearResults()
        searchView.renderResults(state.search.result, goToPage)
        console.log(goToPage)
    }
})


// == RECIPE CONTROLLER == // 

const controlRecipe = async () => {
    // get the id from the url
    const id = window.location.hash.replace('#', '')
    console.log(id)

    if(id){
        //prepare UI for changes

        //create new recipe object
        state.recipe = new Recipe(id)

        try{
            
        //get recipe data
        await state.recipe.getRecipe()

        //calculate servings and time
        state.recipe.calcServings()
        state.recipe.calcTime() 

        //render the recipe
        console.log(state.recipe)
        } catch (err) {
            alert('Error during processing the recipe. ')
        }

    }

}
/* 
window.addEventListener('hashchange', controlRecipe); 
//everytime the hashchange the controlRecipe will be called
window.addEventListener('load', controlRecipe)
 */

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))





