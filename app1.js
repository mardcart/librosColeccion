//DEFINICION DE LAS CLASES

class Libro{
    constructor(titulo,autor,codigo){
        this.titulo = titulo;
        this.autor =autor;
        this.codigo = codigo;
    }
}

class UI{
    //TODO ESTO VA AL INTERFACE GRAFICA
    //NO ES ES INSTANCIABLE SERA DIRECTO OSEA STATIC
    static mostrarLibros(){
        const arrayLibros = DatosLS.traerLibros();
        arrayLibros.forEach((libro)=>UI.agregarLibroLista(libro));
    }

    static agregarLibroLista(libro){
        const lista =  document.querySelector('#libro-list');

        const fila =document.createElement('tr');
        fila.innerHTML= `
         <td>${libro.titulo}</td>
         <td>${libro.autor}</td>
         <td>${libro.codigo}</td>
         <td><a href="#" class=" btn btn-danger btn-sm delete" >x</a></td>
        `;
        lista.appendChild(fila);
    }

    static eliminarLibroLista(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static mostrarAlerta(mensaje, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(mensaje));

        const container = document.querySelector('.container');
        const form = document.querySelector('#libro-form');

        container.insertBefore(div,form);

        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }

    static limpiarDatos(){
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#isbm').value = '';
    }
}

class DatosLS{
    static traerLibros(){
        let libros;
        if(localStorage.getItem('LIBROS') === null){
            libros = [];
        }else{
            libros = JSON.parse(localStorage.getItem('LIBROS'));
        }

        return libros;
    }

    static agregarLibro(libro){
        const arrayLibros = DatosLS.traerLibros();
        arrayLibros.push(libro);
        localStorage.setItem('LIBROS',JSON.stringify(arrayLibros));
    }

    static removerLibro(codigo){
        const arraylibros = DatosLS.traerLibros();

         console.log(codigo);
        arraylibros.forEach((libro,index) =>{
            if(libro.codigo === codigo){
                arraylibros.splice(index,1);
            }
        });

        localStorage.setItem('LIBROS',JSON.stringify(arraylibros));
    }
}


//////////////////////////////////////////////////////

//*********CARGA DE LA PAGINA /************ */ */
document.addEventListener('DOMContentLoaded',UI.mostrarLibros());



//********CONTROLAR EL EVENTO SUBMIT * FORM *** */

document.querySelector('#libro-form').addEventListener('submit',(e)=>{
    e.preventDefault();
   
    //OBTENER VALORE DE LOS CAMPOS
    const titulo  = document.querySelector('#titulo').value;
    const autor  = document.querySelector('#autor').value;
    const codigo = document.querySelector('#isbm').value;

    if(titulo === '' || autor === '' || codigo === ''){
        UI.mostrarAlerta('por favor ingrese datos','danger');
    }else{
        const registroLibro  = new Libro(titulo,autor,codigo);
        DatosLS.agregarLibro(registroLibro);
        UI.agregarLibroLista(registroLibro);
        UI.mostrarAlerta('libro agregado a la coleccion','success');
        UI.limpiarDatos();

    }
   
});

///****************ELIMINAR LIBROS***** */
    
document.querySelector('#libro-list').addEventListener('click', (e) => {
    UI.eliminarLibroLista(e.target);

    DatosLS.removerLibro(e.target.parentElement.previousElementSibling.textContent);
    UI.mostrarAlerta('libro eliminado','warning');
});
