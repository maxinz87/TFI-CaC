const URL_SERVER = 'https://cac-news.vercel.app/';

window.onload = async () => {
    const articuloId = new URLSearchParams(window.location.search).get('articleId');
    
    const articuloData = await getNewsById(articuloId);
    
    const articuloImg = document.querySelector('.imgArticulo');
    const articuloTitulo = document.querySelector('.tituloArticulo');
    const articuloTextoPortada = document.querySelector('.textoPortadaArticulo');

    console.log(articuloData);

    articuloImg.setAttribute("src",articuloData.img);
    articuloTitulo.textContent = articuloData.titulo;
    articuloTextoPortada.textContent = articuloData.textoPortada;
}

async function getNewsById(newsId){
    newsResponse = await fetch(`${URL_SERVER}api/articulo_por_id/${newsId}`);
    newsArray = await newsResponse.json();
    return newsArray[0];
}