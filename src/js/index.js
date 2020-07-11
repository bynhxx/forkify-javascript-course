import Search from './models/Search';
import * as searchView from './views/SearchView';
import { elements } from './views/base';

/* 
Global state of the app 
-Search object
-Current recipe object
-Shopping list object
-Liked recipes
*/

const state = {}
const controlSearch = async () => {
    // 1 - get query from the view
    const query = searchView.getInput(); 
    console.log(query)

    if(query){
        // 2 - new search object and add it to state
        state.search = new Search(query)

        // 3 - prepare UI for results

        // 4 - search for recipes
        await state.search.getResults()

        // 5 - render results on UI
        console.log(state.search.result)
    } 

    // 2 - 
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //so the page doesn't reload
    controlSearch();
})







