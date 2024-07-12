const URL_SERVER = 'https://cac-news-deu3ba1ih-maxinz87s-projects.vercel.app/';


let articleToModify = undefined;
let categories, writers;
const articleModifyForm = document.querySelector('#article-modify-form');
let spanMessageModify = document.querySelector('#span-message-modify');

function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

async function getCategories(){
    categoriesResponse = await fetch(`${URL_SERVER}api/categorias`);
    categoriesArray = await categoriesResponse.json();
    return categoriesArray;
}

async function getWriters(){
  writersResponse = await fetch(`${URL_SERVER}api/lista_de_usuarios/redactores`);
  writersArray = await writersResponse.json();
  return writersArray;
}
async function getArticleById(article_id){
  articleResponse = await fetch(`${URL_SERVER}api/articulo_por_id/${article_id}`);
  articleArray = await articleResponse.json();
  return articleArray[0];

}



  window.onload = async (evt) => {

    disable_article_modify_controls(true);

  }

  const searchInput = document.querySelector('#search-input');
  const buttonSearch = document.querySelector('#search-button');
  const buttonModify = document.querySelector('#button_modify');


  function disable_article_modify_controls(valor){
    articleModifyForm.categoria.disabled = valor;
    articleModifyForm.titulo.disabled = valor;
    articleModifyForm.redactor.disabled = valor;
    articleModifyForm.textoPortada.disabled = valor;
    articleModifyForm.urlImg.disabled = valor;
    articleModifyForm.tamano_articulo.disabled = valor;
    articleModifyForm.button_modify.disabled = valor;
  }

  console.log(articleModifyForm.elements);

  async function populateCategoriesAndWriters_select(){
  const selectWriters = document.querySelector('#select-redactores');
  const selectCategories = document.querySelector('#select-categorias');

  const categories = await getCategories();
  const writers = await getWriters();

  categories.forEach(category => {
    const newOption = document.createElement('option');
    newOption.textContent = category.nombre;
    newOption.setAttribute('value', category.id);
    selectCategories.append(newOption);
  });

  writers.forEach(writer => {
    const newOption = document.createElement('option');
    newOption.textContent = writer.nombre + " " + writer.apellido;
    newOption.setAttribute('value', writer.id);
    selectWriters.append(newOption);
  });
}

  buttonSearch.addEventListener("click", async (e) => {
    e.preventDefault();
    spanMessageModify.classList.remove('spanMessageError','spanMessageOK');
    spanMessageModify.textContent = "";
    if(searchInput.value.trim() !== ""){
      try {
        articleToModify = await getArticleById(searchInput.value);

        await populateCategoriesAndWriters_select();

        console.log(articleToModify);
        if(articleToModify)
          {
            disable_article_modify_controls(false);
            articleModifyForm.elements.titulo.value = articleToModify.titulo;
            articleModifyForm.elements.urlImg.value = articleToModify.img;
            articleModifyForm.elements.categoria.value = articleToModify.categoria_id;
            articleModifyForm.elements.redactor.value = articleToModify.redactor_id;
            articleModifyForm.elements.textoPortada.value = articleToModify.textoPortada;
            articleModifyForm.elements.tamano_articulo.value = articleToModify.tamano_articulo;
          }
          else{
            disable_article_modify_controls(true);
            articleModifyForm.elements.titulo.value = "";
            articleModifyForm.elements.urlImg.value = "";
            articleModifyForm.elements.categoria.value = "";
            articleModifyForm.elements.redactor.value = "";
            articleModifyForm.elements.textoPortada.value = "";
            articleModifyForm.elements.tamano_articulo.value = "";
            spanMessageModify.classList.add('spanMessageError');
            spanMessageModify.textContent = "No existe un articulo con el ID ingresado";
          }
      } catch (error) {
        if(error.message === "Failed to fetch");
        spanMessageModify.classList.add('spanMessageError');
        spanMessageModify.textContent = "Error al realizar la petición";
      }

    }
    else{
      spanMessageModify.classList.add('spanMessageError');
      spanMessageModify.textContent = "Ingrese un valor";
    }

  });

  buttonModify.addEventListener("click", async (e) => {
    e.preventDefault();
    const res = await fetch(`${URL_SERVER}api/modificar_articulo_por_id/${articleToModify.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo : articleModifyForm.elements.titulo.value,
        img : articleModifyForm.elements.urlImg.value,
        categoriaId : articleModifyForm.elements.categoria.value,
        redactorId : articleModifyForm.elements.redactor.value,
        textoPortada : articleModifyForm.elements.textoPortada.value,
        tamano_articulo : (articleModifyForm.elements.tamano_articulo.value)
      })
    });

    const res_json = await res.json();
    console.log(res_json);

    if(res_json.resultado.affectedRows === 1)
    {
      spanMessageModify.classList.add('spanMessageOK');
      spanMessageModify.textContent = "Se ha modificado el artículo!"
    }
    else{
      spanMessageModify.classList.add('spanMessageError');
      spanMessageModify.textContent = "No se ha podido modificar el artículo";
    }

  });