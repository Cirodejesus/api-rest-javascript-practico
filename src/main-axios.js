const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});


async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
  //    iteración x cada elemento
    const movies = data.results;

    // Para no duplicar imagenes el en DOM
    trendingMoviesPreviewList.innerHTML = '';

    // console.log({ data, movies });
    movies.forEach(movie => {
   

     const movieContainer = document.createElement('div');
     movieContainer.classList.add('movie-container');

     const movieImg = document.createElement('img');
     movieImg.classList.add('movie-img');
     movieImg.setAttribute('alt', movie.title);
     movieImg.setAttribute(
        'src', 
        'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);
    });
}

async function getTCategegoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    
    // Para no duplicar imagenes el en DOM
    categoriesPreviewList.innerHTML = '';

    // console.log({ data, movies });
    categories.forEach(category => {

     const categoryContainer = document.createElement('div');
     categoryContainer.classList.add('category-container');

     const categoryTitle = document.createElement('h3');
     categoryTitle.classList.add('category-title');
     categoryTitle.setAttribute('id', 'id' + category.id);
    // Evento para atrapar categorias y nos lleve cuando le hagamos click a cada   una de ellas.
    categoryTitle.addEventListener('click', () => {
      location.hash  = `#category=${category.id}-${category.name}`;
    });

     const categoryTitleText = document.createTextNode(category.name);
     categoryTitle.appendChild(categoryTitleText);
     categoryContainer.appendChild(categoryTitle);
     categoriesPreviewList.appendChild(categoryContainer);
      
    });
}

async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
      params: {
        with_genres: id,
      }  
    });
  //    iteración x cada elemento
    const movies = data.results;

    // Para no duplicar imagenes el en DOM
    genericSection.innerHTML = '';

    // console.log({ data, movies });
    movies.forEach(movie => {
     const movieContainer = document.createElement('div');
     movieContainer.classList.add('movie-container');

     const movieImg = document.createElement('img');
     movieImg.classList.add('movie-img');
     movieImg.setAttribute('alt', movie.title);
     movieImg.setAttribute(
        'src', 
        'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);
    });
}