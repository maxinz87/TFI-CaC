import { URL_SERVER } from "./global.js";

window.onload = async () => {
    const articuloId = new URLSearchParams(window.location.search).get('articleId');
    
    const articuloData = await getNewsById(articuloId);
    
    const articuloImg = document.querySelector('.imgArticulo');
    const articuloTitulo = document.querySelector('.tituloArticulo');
    const articuloTextoPortada = document.querySelector('.textoPortadaArticulo');
    const cuerpoArticulo = document.querySelector('.cuerpoArticulo');

    console.log(articuloData);
    document.title=articuloData.titulo;
    articuloImg.setAttribute("src",articuloData.img);
    articuloTitulo.textContent = articuloData.titulo;
    articuloTextoPortada.textContent = articuloData.textoPortada;
    cuerpoArticulo.innerHTML = articuloData.textoCompleto;

    const loaderElement = document.querySelector('.loader');

    loaderElement.classList.add('loader-hidden');
}

async function getNewsById(newsId){
    const newsResponse = await fetch(`${URL_SERVER}api/articulo_por_id/${newsId}`);
    const newsArray = await newsResponse.json();
    return newsArray[0];
}