//definicion de las clases

class Libro{
    constructor(titulo,autor,isbm){
        this.titulo = titulo;
        this.autor = autor;
        this.isbm = isbm;
    }
}

class UI{
    static mostrarLibros(){

    }

    static agregarLibroLista(Libro){

    }

    static eliminarLibro(){

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

    static LimpiarCampos(){
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#isbm').value = '';

    }
}

class Datos{
    static traerLibros(){

        let libros;
        if(localStorage.getItem('libross')===null){
            libros = [];
        }else{
            libros = JSON.parse(localStorage.getItem('libross'));
        }
        return libros;
    }

    static agregarLibro(libro){
        const libros = Datos.traerLibros();
        libros.push(libro);
        localStorage.setItem('libross',JSON.stringify(libros));
    }
    static removerLibro(isbm){

    }
}
//controlar el evento submit
document.querySelector('#libro-form').addEventListener('submit',(e)=>{
    e.preventDefault();

    //obtener los valores de los campos

    const titulo = document.querySelector('#titulo').value;
    const autor = document.querySelector('#autor').value;
    const isbm = document.querySelector('#isbm').value;

    if(titulo === '' || autor === '' || isbm === '' ){
        UI.mostrarAlerta('por favor ingrese datos','danger');
    }else{
        const libro = new Libro(titulo,autor,isbm)
            Datos.agregarLibro(libro);
            UI.LimpiarCampos();

     
    }
});