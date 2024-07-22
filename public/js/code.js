import { URL_SERVER } from "./global.js";

let economyNewsResponse = [];


window.addEventListener("load", async (event) => {

    setTimeout(()=>{
        if(window.location.hash){
            window.location.href=window.location.hash;
        }
    },1500);

    const loaderElement = document.querySelector('.loader');

    await populateArticles(3);
    await populateArticles(4);
    await populateArticles(5);
    await populateArticles(6);

    loaderElement.classList.add('loader-hidden');
  });

Object.defineProperty(String.prototype, 'capitalizarPrimeraLetra', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    writable: true, // puede sobreescribirse
    configurable: true // puede borrarse
});

async function getNewsByCategory(categoria){
    const newsResponse = await fetch(`${URL_SERVER}api/articulos/${categoria}`);
    const newsArray = await newsResponse.json();
    return newsArray;
}

function renderArticles(article, category_id){

    switch (category_id) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            {
                const economyArticles_Container = document.querySelector('.economy-articles-container');
                const economyArticleContainer = document.createElement('article');

                if(article.tamano_articulo !== "")
                    economyArticleContainer.classList.add(`article-card-${article.tamano_articulo}`);
                else
                    economyArticleContainer.classList.add(`article-card`);
            
                const imgArticleContainer = document.createElement('div');
                imgArticleContainer.classList.add('containerImg');
                const imgElement = document.createElement('img');
                imgElement.setAttribute("src", article.img);
                
                imgArticleContainer.append(imgElement);
            
                const titleArticle = document.createElement('h3');
                titleArticle.textContent = article.titulo;

                const dataWriterContainer = document.createElement('div');
                const writerDateArticle = document.createElement('span');
                writerDateArticle.textContent = article.nombre.capitalizarPrimeraLetra() + " " + article.apellido.capitalizarPrimeraLetra() + ` | ` + article.fecha_creacion.substring(0,10).split('-').reverse().join('/');
                writerDateArticle.classList.add('writerDateFormat');
                dataWriterContainer.append(writerDateArticle);

                const textArticle = document.createElement('p');
                textArticle.textContent = article.textoPortada;

                const articleLink = document.createElement('a');
                articleLink.classList.add('article-link');
                articleLink.setAttribute('href','/articulo.html?articleId=' + article.id);
            
                economyArticleContainer.append(imgArticleContainer,titleArticle,dataWriterContainer,textArticle,articleLink);
            
                economyArticles_Container.append(economyArticleContainer);
            }
            break;
    
        case 4:
            {
                const sportsArticles_Container = document.querySelector('.sports-articles-container');
                const sportsArticleContainer = document.createElement('article');

                if(article.tamano_articulo !== "")
                    sportsArticleContainer.classList.add(`article-card-${article.tamano_articulo}`);
                else
                    sportsArticleContainer.classList.add(`article-card`);
            
                const imgArticleContainer = document.createElement('div');
                imgArticleContainer.classList.add('containerImg');
                const imgElement = document.createElement('img');
                imgElement.setAttribute("src", article.img);
                
                imgArticleContainer.append(imgElement);
            
                const titleArticle = document.createElement('h3');
                titleArticle.textContent = article.titulo;

                const dataWriterContainer = document.createElement('div');
                const writerDateArticle = document.createElement('span');
                writerDateArticle.textContent = article.nombre.capitalizarPrimeraLetra() + " " + article.apellido.capitalizarPrimeraLetra() + ` \t|\t` + article.fecha_creacion.substring(0,10).split('-').reverse().join('/');
                writerDateArticle.classList.add('writerDateFormat');
                dataWriterContainer.append(writerDateArticle);

                const textArticle = document.createElement('p');
                textArticle.textContent = article.textoPortada;

                const articleLink = document.createElement('a');
                articleLink.classList.add('article-link');
                articleLink.setAttribute('href','/articulo.html?articleId=' + article.id);
            
                sportsArticleContainer.append(imgArticleContainer,titleArticle,dataWriterContainer,textArticle, articleLink);
            
                sportsArticles_Container.append(sportsArticleContainer);
            }
            break;
        case 5:
            {
                const techArticles_Container = document.querySelector('.tech-articles-container');
                const techArticleContainer = document.createElement('article');

                if(article.tamano_articulo !== "")
                    techArticleContainer.classList.add(`article-card-${article.tamano_articulo}`);
                else
                    techArticleContainer.classList.add(`article-card`);
            
                const imgArticleContainer = document.createElement('div');
                imgArticleContainer.classList.add('containerImg');
                const imgElement = document.createElement('img');
                imgElement.setAttribute("src", article.img);
                
                imgArticleContainer.append(imgElement);
            
                const titleArticle = document.createElement('h3');
                titleArticle.textContent = article.titulo;
                
                const dataWriterContainer = document.createElement('div');
                const writerDateArticle = document.createElement('span');
                writerDateArticle.textContent = article.nombre.capitalizarPrimeraLetra() + " " + article.apellido.capitalizarPrimeraLetra() + ` \t|\t` + article.fecha_creacion.substring(0,10).split('-').reverse().join('/');
                writerDateArticle.classList.add('writerDateFormat');
                dataWriterContainer.append(writerDateArticle);

                const textArticle = document.createElement('p');
                textArticle.textContent = article.textoPortada;

                const articleLink = document.createElement('a');
                articleLink.classList.add('article-link');
                articleLink.setAttribute('href','/articulo.html?articleId=' + article.id);
            
                techArticleContainer.append(imgArticleContainer,titleArticle,dataWriterContainer,textArticle, articleLink);
            
                techArticles_Container.append(techArticleContainer);
            }
            break;
            case 6:{
                const cultureArticles_Container = document.querySelector('.culture-articles-container');
                const cultureArticleContainer = document.createElement('article');

                if(article.tamano_articulo !== "")
                    cultureArticleContainer.classList.add(`article-card-${article.tamano_articulo}`);
                else
                    cultureArticleContainer.classList.add(`article-card`);
            
                const imgArticleContainer = document.createElement('div');
                imgArticleContainer.classList.add('containerImg');
                const imgElement = document.createElement('img');
                imgElement.setAttribute("src", article.img);
                
                imgArticleContainer.append(imgElement);
            
                const titleArticle = document.createElement('h3');
                titleArticle.textContent = article.titulo;
                
                const dataWriterContainer = document.createElement('div');
                const writerDateArticle = document.createElement('span');
                writerDateArticle.textContent = article.nombre.capitalizarPrimeraLetra() + " " + article.apellido.capitalizarPrimeraLetra() + ` \t|\t` + article.fecha_creacion.substring(0,10).split('-').reverse().join('/');
                writerDateArticle.classList.add('writerDateFormat');
                dataWriterContainer.append(writerDateArticle);

                const textArticle = document.createElement('p');
                textArticle.textContent = article.textoPortada;

                const articleLink = document.createElement('a');
                articleLink.classList.add('article-link');
                articleLink.setAttribute('href','/articulo.html?articleId=' + article.id);
            
                cultureArticleContainer.append(imgArticleContainer,titleArticle,dataWriterContainer,textArticle, articleLink);
            
                cultureArticles_Container.append(cultureArticleContainer);
            }
            break;
        default:
            break;
    }
}

async function populateArticles(category){

    const economyNewsArray = await getNewsByCategory(category);
    economyNewsArray.forEach(article => {
        renderArticles(article,category);
    });
}

/*
    los IDs de las categorias son:
        1 - Actualidad;
        2 - Policiales;
        3 - Economía;
        4 - Deportes;
        5 - Tecnología
*/