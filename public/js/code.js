let economyNewsResponse = [];

async function getNewsByCategory(categoria){
    newsResponse = await fetch(`http://localhost:2408/api/articulos_por_id/${categoria}`);
    newsArray = await newsResponse.json();
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
                const writerDateArticle = document.createElement('p');
                writerDateArticle.textContent = article.nombre + " " + article.apellido + ` | ` + article.fecha_creacion.substring(0,10);
                dataWriterContainer.append(writerDateArticle);

                const textArticle = document.createElement('p');
                textArticle.textContent = article.textoPortada;
            
                economyArticleContainer.append(imgArticleContainer,titleArticle,dataWriterContainer,textArticle);
            
                economyArticles_Container.append(economyArticleContainer);
            }
            break;
    
        case 4:
            {
                const sportsArticles_Container = document.querySelector('.sports-articles-container');
                const sportsArticleContainer = document.createElement('article');
                sportsArticleContainer.classList.add('article-card');
            
                const imgArticleContainer = document.createElement('div');
                imgArticleContainer.classList.add('containerImg');
                const imgElement = document.createElement('img');
                imgElement.setAttribute("src", article.img);
                
                imgArticleContainer.append(imgElement);
            
                const titleArticle = document.createElement('h3');
                titleArticle.textContent = article.titulo;

                const dataWriterContainer = document.createElement('div');
                const writerDateArticle = document.createElement('p');
                writerDateArticle.textContent = article.nombre + " " + article.apellido + ` \t|\t` + article.fecha_creacion.substring(0,10);
                dataWriterContainer.append(writerDateArticle);

                const textArticle = document.createElement('p');
                textArticle.textContent = article.textoPortada;
            
                sportsArticleContainer.append(imgArticleContainer,titleArticle,dataWriterContainer,textArticle);
            
                sportsArticles_Container.append(sportsArticleContainer);
            }
            break;
        case 5:
            {
                const techArticles_Container = document.querySelector('.tech-articles-container');
                const techArticleContainer = document.createElement('article');
                techArticleContainer.classList.add('article-card');
            
                const imgArticleContainer = document.createElement('div');
                imgArticleContainer.classList.add('containerImg');
                const imgElement = document.createElement('img');
                imgElement.setAttribute("src", article.img);
                
                imgArticleContainer.append(imgElement);
            
                const titleArticle = document.createElement('h3');
                titleArticle.textContent = article.titulo;
                
                const dataWriterContainer = document.createElement('div');
                const writerDateArticle = document.createElement('p');
                writerDateArticle.textContent = article.nombre + " " + article.apellido + ` \t|\t` + article.fecha_creacion.substring(0,10);
                dataWriterContainer.append(writerDateArticle);

                const textArticle = document.createElement('p');
                textArticle.textContent = article.textoPortada;
            
                techArticleContainer.append(imgArticleContainer,titleArticle,dataWriterContainer,textArticle);
            
                techArticles_Container.append(techArticleContainer);
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

populateArticles(3);
populateArticles(4);
populateArticles(5);