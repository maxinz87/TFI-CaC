
/*
const controls = document.querySelectorAll('.btn-text-editor-control');
const text_editor_box = document.querySelector('.text-editor-box');

controls.forEach(control => {
    control.addEventListener('click', ()=>{
        let command = control.dataset['control'];
        document.execCommand(command, false, null);

    });
});
*/
let qlEditor = 0;

window.addEventListener('load', () => {
    qlEditor = document.querySelector('.ql-editor');
});


function imageHandler() {
    const range = this.quill.getSelection();
    const value = prompt('Inserte debajo el vínculo de la imagen.');
    if(value){
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
}

export const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: {
            container: [[{ 'size': ['small', false, 'large', 'huge'] }],['bold','italic','underline','strike','link','image']],
            handlers: {
                image: imageHandler
            }
        }
    },
    placeholder: 'Escriba el artículo aquí.'
  });

export const quillModify = new Quill('#editor-modify', {
    theme: 'snow',
    modules: {
        toolbar: {
            container: [[{ 'size': ['small', false, 'large', 'huge'] }],['bold','italic','underline','strike','link','image']],
            handlers: {
                image: imageHandler
            }
        }
    },
    placeholder: 'Escriba el artículo aquí.'
});