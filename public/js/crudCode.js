import { URL_SERVER } from "./global.js";
import { quill } from "./crudTextEditorCode.js";


let articleToModify = undefined;
let categories, writers;
const articleCreateForm = document.querySelector('#article-create-form');
const articleModifyForm = document.querySelector('#article-modify-form');
let spanMessageCreate = document.querySelector('#span-message-create');
let spanMessageModify = document.querySelector('#span-message-modify');

const menuButtonCreate = document.querySelector('#buttonCreate');
const menuButtonModify = document.querySelector('#buttonModify');
menuButtonCreate.addEventListener('click', (e) => { openTab(e, 'crearArticulo') });
menuButtonModify.addEventListener('click', (e) => { openTab(e, 'modificarArticulo') });

const searchInput = document.querySelector('#search-input');
const buttonSearch = document.querySelector('#search-button');
const buttonCreate = document.querySelector('#button_create');
const buttonModify = document.querySelector('#button_modify');
const buttonDelete = document.querySelector('#button_delete');


function openTab(evt, cityName) {
    // Declare all variables
    let i, tabcontent, tablinks;
  
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
    const categoriesResponse = await fetch(`${URL_SERVER}api/categorias`);
    const categoriesArray = await categoriesResponse.json();
    return categoriesArray;
}

async function getWriters(){
  const writersResponse = await fetch(`${URL_SERVER}api/lista_de_usuarios/redactores`);
  const writersArray = await writersResponse.json();
  return writersArray;
}
async function getArticleById(article_id){
  const articleResponse = await fetch(`${URL_SERVER}api/articulo_por_id/${article_id}`);
  const articleArray = await articleResponse.json();
  return articleArray[0];

}

async function createNewArticle(form_querySelector){

  const response = await fetch(`${URL_SERVER}api/crear_nuevo_articulo`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      titulo: form_querySelector.elements.titulo.value,
      redactorId: form_querySelector.elements.redactor.value,
      categoriaId: form_querySelector.elements.categoria.value,
      textoPortada: form_querySelector.elements.textoPortada.value,
      tamano_articulo: form_querySelector.elements.tamano_articulo.value,
      img: form_querySelector.elements.urlImg.value,
      epigrafe: "",
      textoCompleto: quill.getSemanticHTML(),
      posicion_articulo: ""
    })
  });

  const responseJson = await response.json();
  return responseJson;
}

async function deleteArticleByID(article_id){
  const Response = await fetch(`${URL_SERVER}api/borrar_articulo_por_id/${article_id}`, {
    method: 'DELETE',
    headers:{
      "Content-Type": 'application/json'
    }
  });
  return await Response.json();
}



  window.onload = async (evt) => {

    disable_article_modify_controls(true);
    await populateCategoriesAndWriters_select('article-create-form');
  }

  function disable_article_modify_controls(valor){
    articleModifyForm.categoria.disabled = valor;
    articleModifyForm.titulo.disabled = valor;
    articleModifyForm.redactor.disabled = valor;
    articleModifyForm.textoPortada.disabled = valor;
    articleModifyForm.urlImg.disabled = valor;
    articleModifyForm.tamano_articulo.disabled = valor;
    articleModifyForm.button_modify.disabled = valor;
    articleModifyForm.button_delete.disabled = valor;
  }

async function populateCategoriesAndWriters_select(idForm){
    const selectWriters = document.querySelector(`#${idForm} #select-redactores`);
    const selectCategories = document.querySelector(`#${idForm} #select-categorias`);

    const categories = await getCategories();
    const writers = await getWriters();

    if(selectCategories.options.length > 0){
      selectCategories.innerHTML = "";
    }
    if(selectWriters.options.length > 0){
      selectWriters.innerHTML = "";
    }

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
    const loaderSearch = document.querySelector('.loader_search');
    loaderSearch.style.display = 'block';

    spanMessageModify.classList.remove('spanMessageError','spanMessageOK');
    spanMessageModify.textContent = "";
    if(searchInput.value.trim() !== ""){
      try {
        articleToModify = await getArticleById(searchInput.value);

        await populateCategoriesAndWriters_select('article-modify-form');

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
        console.log(error);
        if(error.message === "Failed to fetch");
        spanMessageModify.classList.add('spanMessageError');
        spanMessageModify.textContent = "Error al realizar la petición";
      }

    }
    else{
      
      spanMessageModify.classList.add('spanMessageError');
      spanMessageModify.textContent = "Ingrese un valor";
    }

    loaderSearch.style.display = 'none';

  });


  buttonCreate.addEventListener("click", async (e) => {
    e.preventDefault();
    let createFlag = true;

    console.log(quill.getSemanticHTML());

    spanMessageCreate.innerHTML = "";
    spanMessageCreate.classList.remove('spanMessageError');
    if(articleCreateForm.elements.titulo.value.trim() === ""){
      spanMessageCreate.innerHTML = "-> Falta agregar un título<br>";
      spanMessageCreate.classList.add('spanMessageError');
      createFlag = false;
    }

    if(articleCreateForm.elements.urlImg.value.trim() === ""){
      spanMessageCreate.innerHTML = spanMessageCreate.innerHTML + "-> falta agregar una URL de imagen<br>";
      spanMessageCreate.classList.add('spanMessageError');
      createFlag = false;
    }

    if(articleCreateForm.elements.textoPortada.value.trim() === ""){
      spanMessageCreate.innerHTML = spanMessageCreate.innerHTML + "-> falta agregar texto de portada<br>";
      spanMessageCreate.classList.add('spanMessageError');
      createFlag = false;
    }

    if(quill.getSemanticHTML().trim() === "<p></p>"){
      spanMessageCreate.innerHTML = spanMessageCreate.innerHTML + "-> falta agregar el cuerpo del artículo";
      spanMessageCreate.classList.add('spanMessageError');
      createFlag = false;
    }

    if(createFlag){
      try {
        const responseMessage = await createNewArticle(articleCreateForm);
        if(responseMessage.errno){
          spanMessageCreate.classList.add('spanMessageError');
          spanMessageCreate.innerHTML = 'Ha ocurrido un error al crear el articulo';
        }
        else if(responseMessage.affectedRows === 1){
          spanMessageCreate.classList.add('spanMessageOK');
          spanMessageCreate.innerHTML = 'El articulo ha sido creado exitosamente!'
          
          articleCreateForm.elements.titulo.value = "";
          articleCreateForm.elements.urlImg.value = "";
          articleCreateForm.elements.textoPortada.value = "";
          quill.setText('');

        }
      } catch (error) {
        console.log(error);
      }
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

  buttonDelete.addEventListener('click', (e)=>{
    e.preventDefault();
    swal({
      title: `Está por eliminar el artículo ${articleToModify.id}`,
      text: "Está seguro de realizar esta operación?",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Aceptar",
          value: true,
          visible: true,
          className: "",
          closeModal: true
        }
      },
      dangerMode: true,
      closeOnClickOutside: false,
      className: 'modalConfirmDelete',
    })
    .then(async (willDelete) => {
      if (willDelete) {

        const respuestaBorrado = await deleteArticleByID(articleToModify.id);
        if(respuestaBorrado.resultado.affectedRows === 1)
        {
          disable_article_modify_controls(true);
          articleModifyForm.elements.titulo.value = "";
          articleModifyForm.elements.urlImg.value = "";
          articleModifyForm.elements.categoria.value = "";
          articleModifyForm.elements.redactor.value = "";
          articleModifyForm.elements.textoPortada.value = "";
          articleModifyForm.elements.tamano_articulo.value = "";
          swal("El artículo ha sido borrado exitosamente", {
            icon: "success",
            className: 'modalConfirmDelete'
          });
        }


      }
    });
  });