import { elements } from './base';

//instead of using one variable for all exports, we use an object for that
export const getInput = () => elements.searchInput.value; 

export const clearInput = () => {
    elements.searchInput.value = ''
}

export const clearResults = () => {
    elements.searchResList.innerHTML = ''
}


const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `
    elements.searchResList.insertAdjacentHTML('beforeend', markup) 
}

//receives the recipes and render results
export const renderResults = recipes => {
    //will loop throuhg the array of recipes and execute the 
    //renderRecipe function for each one of those elements
    //of the array
    
    recipes.forEach(el => renderRecipe(el)); 
    
} 