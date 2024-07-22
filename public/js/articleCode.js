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

    if(articuloData.textoCompleto !== "")   //Condición para darle texto al cuerpo del articulo ya que los articulos de prueba no tienen texto
        cuerpoArticulo.innerHTML = articuloData.textoCompleto;
    else
        cuerpoArticulo.innerHTML = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl suscipit adipiscing bibendum est ultricies integer quis. Neque laoreet suspendisse interdum consectetur. Arcu risus quis varius quam quisque. Pretium quam vulputate dignissim suspendisse in est ante in nibh. At volutpat diam ut venenatis tellus in metus vulputate. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. Scelerisque eu ultrices vitae auctor eu augue ut lectus. Diam quis enim lobortis scelerisque fermentum dui faucibus. Morbi non arcu risus quis varius quam quisque id diam. Orci eu lobortis elementum nibh tellus molestie nunc. Pretium fusce id velit ut. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh.<p>

<p>Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Quis eleifend quam adipiscing vitae proin sagittis nisl. Sed id semper risus in hendrerit gravida rutrum. Aliquam vestibulum morbi blandit cursus. Faucibus turpis in eu mi bibendum neque egestas congue. Egestas quis ipsum suspendisse ultrices gravida dictum. Non tellus orci ac auctor augue mauris augue neque gravida. Augue neque gravida in fermentum et. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Nibh praesent tristique magna sit. Tincidunt ornare massa eget egestas purus viverra accumsan. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. In mollis nunc sed id. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Cursus in hac habitasse platea dictumst quisque sagittis. Vitae auctor eu augue ut lectus. Id volutpat lacus laoreet non curabitur gravida. Senectus et netus et malesuada fames ac turpis egestas.<p>

Malesuada fames ac turpis egestas. Nunc sed augue lacus viverra vitae congue eu consequat. Libero nunc consequat interdum varius sit amet mattis vulputate enim. At varius vel pharetra vel turpis. Pulvinar etiam non quam lacus suspendisse faucibus. Suspendisse in est ante in nibh mauris cursus mattis molestie. Viverra tellus in hac habitasse. Risus pretium quam vulputate dignissim suspendisse in est ante. At elementum eu facilisis sed. Molestie a iaculis at erat pellentesque. Mauris nunc congue nisi vitae suscipit tellus mauris a diam. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Turpis egestas maecenas pharetra convallis. Augue mauris augue neque gravida. Vestibulum mattis ullamcorper velit sed ullamcorper. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit.

Mauris a diam maecenas sed enim ut. Mauris nunc congue nisi vitae suscipit. Dolor sed viverra ipsum nunc aliquet. Eget mi proin sed libero enim sed faucibus turpis. Morbi tempus iaculis urna id volutpat lacus. Lobortis elementum nibh tellus molestie nunc non. Morbi blandit cursus risus at ultrices mi. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Tincidunt arcu non sodales neque sodales ut etiam. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Purus in massa tempor nec feugiat nisl. Sit amet dictum sit amet justo donec. Lectus sit amet est placerat in. Enim sed faucibus turpis in. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Neque sodales ut etiam sit. Et malesuada fames ac turpis egestas maecenas pharetra convallis. Sed elementum tempus egestas sed sed risus. Neque vitae tempus quam pellentesque nec nam aliquam sem.`

    const loaderElement = document.querySelector('.loader');

    loaderElement.classList.add('loader-hidden');
}

async function getNewsById(newsId){
    const newsResponse = await fetch(`${URL_SERVER}api/articulo_por_id/${newsId}`);
    const newsArray = await newsResponse.json();
    return newsArray[0];
}