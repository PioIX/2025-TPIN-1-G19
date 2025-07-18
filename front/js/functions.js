let idLogged = -1  
let arrayCanciones = [];
let contadorCanciones=0;
let contadorPuntaje=0;


async function existsUser(nombre,password) { //creas la funcion y los() los parametros que recibe....i es una variable que cambia apra verificar los usuarios
    try {
        console.log(10)
        const response = await fetch(`http://localhost:4000/buscarUsuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({nombre_usuario: nombre, contraseña: password})
        })
        let result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error, "hola no funciono")
    }
} 


async function conseguirID(nombre) { //creas la funcion y los() los parametros que recibe....i es una variable que cambia apra verificar los usuarios
        try {
            const response = await fetch(`http://localhost:4000/conseguirID`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({nombre_usuario: nombre})

            })
            let result = await response.json()
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
        }
    } 

    async function esAdmin(nombre) { //creas la funcion y los() los parametros que recibe....i es una variable que cambia apra verificar los usuarios
        try {
            const response = await fetch(`http://localhost:4000/esAdmin`, { //cambiar la url para que sea pedido get
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({nombre_usuario: nombre})
            })
            let result = await response.json()
            console.log(result)
            if (result.length > 0) {

                if (result[0].es_admin==1){
                    console.log("es admin")
                    opcionesSelect( )
                }

                return result[0].es_admin //solo manda el numero
            } else {
                return -1
            }
        } catch (error) {
            console.log(error)
        }
    } 

    async function newuser(email, username,password) {
    let resultado = existsUser(email,username,password)
    if (resultado <= 0) {
            users.push(new User (email,username, password))
            return users.length;
        } else {
            ui.showModal("Ese usuario ya existe")
            return -1;
        }
}
 //ya está registrar
/*
async function login() {
    try {
        let nombre = ui.getUsername();       // Obtener el usuario
        let password = ui.getPassword(); // Obtener la contraseña
        console.log(nombre, password)
        let resultado = await existsUser(nombre, password)  
        console.log(resultado)

        if (resultado.length > 0) {
            idLogged = await conseguirID(nombre)
            let admin = await esAdmin(nombre)
            console.log(admin)
            if (admin > 0) {
                ui.clearLoginInputs()
                console.log("es admin y entro al juego")
                /* ui.changescreenAdmin() */ 
            //} else {
              //  ui.clearLoginInputs()
                //console.log("no es admin y entro al juego")
                /*
                ui.changeScreen() 
            }

            //ui.changeScreen() va aca porque cambia la pantalla sea admin o no
        } else {
            console.log("no entro")
            idLogged = -1
        }
    } catch (error) {
        console.log(error)
    }
}*/
            

async function registrar() {
    let email = ui.getEmail();
    let nombre_usuario = ui.getUsername();
    let contraseña = ui.getPassword();

    const datos = {
        email: email,
        nombre_usuario:nombre_usuario,
        contraseña:contraseña,
        es_admin: false
/*
    }
    
    try {
        const response = await fetch(`http://localhost:4000/guardarUsuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        });

        let result = await response.json();
        console.log(result);
        if (result.length > 0) {
            login()
        } else {
            console.log("error")
            console.log("Usuario existente, inicie sesion o vuelva a intentar")
        }
    } catch (error) {
        console.log(error)
    }

*/
    }
    
    try {
        const response = await fetch(`http://localhost:4000/guardarUsuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        });

        let result = await response.json();
        console.log(result);
        if (result.length > 0) {
            login()
        } else {
            console.log("error")
            console.log("Usuario existente, inicie sesion o vuelva a intentar")
        }
    } catch (error) {
        console.log(error)
    }


}

function cerrarsesion(){
    if (confirm("¿Queres cerrar sesion?") == true) {
        console.log("vas a cerrar sesion")
        idLogged = -1
        ui.clearLoginInputs()
        ui.changeScreenLogin()
        //ui.showModal("Cerraste sesion")
    } else {
        //ui.showModal("Seguis en sesion")
    }

}



async function login() {
    try {
        let nombre = ui.getUsername();       // Obtener el email del usuario
        let password = ui.getPassword(); // Obtener la contraseña
        console.log(nombre, password)
        let resultado = await existsUser(nombre, password)  
        console.log(resultado)
        if (resultado.length > 0) {
            idLogged = await conseguirID(nombre)
            let admin = await esAdmin(nombre)
            console.log(admin)
            if (admin > 0) {
                ui.clearLoginInputs()
                console.log("es admin y entro al juego")
                ui.changeScreenAdmin()

                mostrarCancionesJuego()
            } else {
                ui.clearLoginInputs()
                console.log("no es admin y entro al juego")
                ui.changeScreen()
                mostrarCancionesJuego()

            }
        } else {
            let boton = ui.registrar();
            if (boton == true)
                ui.changeScreenRegistro()
            else {
                console.log("no entro")
                idLogged = -1
            }
            
        }
    } catch (error) {
        console.log(error)
    }
}


async function guardarCancion(nombre,nombreArt,reproducciones) { //creas la funcion y los() los parametros que recibe....i es una variable que cambia apra verificar los usuarios
    try {
        console.log(10)
        const response = await fetch(`http://localhost:4000/guardarCanciones`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({nombre_cancion: nombre, nombre_artista: nombreArt, nro_reproducciones: reproducciones})
        })
        let result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.log("hola no funciono")
    }
} 

async function insertarCancion(){
    let nombre_cancion= ui.getNombre_cancion()
    let nombre_artista= ui.getNombre_artista()
    let nro_reproducciones= ui.getReproducciones()
    console.log(nombre_cancion, nombre_artista, nro_reproducciones)
    let resultado = await guardarCancion(nombre_cancion,nombre_artista,nro_reproducciones)
    console.log(resultado)
    /*if (resultado.length > 0) {
        console.log("Se inserto el usuario")
    } else {
        console.log("No se pudo insertar el usuario")
    } */
}


async function mostrarCancionesJuego() {
    try {
        const response=await fetch(`http://localhost:4000/cancionesJuego`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            
        })
        arrayCanciones = await response.json()
        console.log("canciones", arrayCanciones)

        reemplazarPorCanciones(arrayCanciones)
    } catch (error) {
        console.log("error al mostrar las canciones", error)
    }
}

function reemplazarPorCanciones(arrayCanciones){
    console.log("aca se deberian reemplazar las canciones")
    
    if (arrayCanciones.length>contadorCanciones+1){
        document.getElementById("title1").innerHTML=arrayCanciones[contadorCanciones].nombre_cancion;
        document.getElementById("title2").innerHTML=arrayCanciones[contadorCanciones+1].nombre_cancion;
        document.getElementById("artist1").innerHTML=arrayCanciones[contadorCanciones].nombre_artista;
        document.getElementById("artist2").innerHTML=arrayCanciones[contadorCanciones+1].nombre_artista;
        document.getElementById("reproducciones").innerHTML="Reproducciones: " + arrayCanciones[contadorCanciones].nro_reproducciones
        //document.getElementById("idImagen").src = arrayCanciones[contadorCanciones+1].nombre_archivo
        document.getElementById("imagen1").src = "../images/" + arrayCanciones[contadorCanciones].nombre_imagen;
        document.getElementById("imagen2").src = "../images/" + arrayCanciones[contadorCanciones + 1].nombre_imagen;
    } else {
        alert("No hay más canciones para seguir jugando")
    }
}


function calcularReproduccionesBotonMas(arrayCanciones){
    if (arrayCanciones[contadorCanciones+1].nro_reproducciones>arrayCanciones[contadorCanciones].nro_reproducciones){
        console.log("sumaste punto BOTON MAS")
        contadorPuntaje=contadorPuntaje+1
        puntajeUsuario(contadorPuntaje)
    } else {
        console.log("no sumaste punto BOTON MAS")
        puntajeUsuario(contadorPuntaje)
    }
    contadorCanciones=contadorCanciones+1
    reemplazarPorCanciones(arrayCanciones)
}

function calcularReproduccionesMenos(arrayCanciones){
    if (arrayCanciones[contadorCanciones+1].nro_reproducciones<arrayCanciones[contadorCanciones].nro_reproducciones){
        console.log("sumaste punto BOTON MENOS")
        contadorPuntaje=contadorPuntaje+1
        puntajeUsuario(contadorPuntaje)
    } else {
        if (arrayCanciones[contadorCanciones+1].nro_reproducciones>arrayCanciones[contadorCanciones].nro_reproducciones){
            console.log("no sumaste BOTON MENOS")
        }
        puntajeUsuario(contadorPuntaje)
    }
    contadorCanciones=contadorCanciones+1
    reemplazarPorCanciones(arrayCanciones)
}

function puntajeUsuario(contadorPuntaje){
    document.getElementById("puntajeUsuario").innerHTML="Tu puntaje es de: " + contadorPuntaje
}

//AGREGAR OPCIONES AL SELECT
async function traerCancionesFetch() {
    try {
        const response = await fetch(`http://localhost:4000/traerCanciones`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        let result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function opcionesSelect() {
    const canciones = await traerCancionesFetch();
    let opcionesCanciones = `<option disabled selected value="">Seleccione una canción</option>`;
    for (let i = 0; i < canciones.length; i++) {
        opcionesCanciones += `<option value="${canciones[i].nombre_cancion}">${canciones[i].nombre_cancion}</option>`;
    }
    document.getElementById("selectCanciones").innerHTML = opcionesCanciones;
    document.getElementById("selectCancionesDelete").innerHTML=opcionesCanciones;

    let campoModificar = `
        <option disabled selected value="">Seleccione qué desea modificar</option>
        <option value="nombre_cancion">Nombre de la canción</option>
        <option value="nombre_artista">Nombre del artista</option>
        <option value="nro_reproducciones">Número de reproducciones</option>
    `;
    document.getElementById("campoModificar").innerHTML = campoModificar;
}


//MODIFICAR CANCION
async function modificarCanciones(){
    let cancionSeleccionada= ui.getSelectCanciones()
    let campo= ui.getSelectModificar()
    let nuevoValor= ui.getInput()

    const datos = {
    cancionSeleccionada: cancionSeleccionada,
    campo: campo,
    nuevoValor: nuevoValor
    };


    if (campo!="" && nuevoValor !== ""){
        try {
            const responde = await fetch (`http://localhost:4000/modificarCanciones`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify(datos)
            });
            const result = await responde.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
       
    } else {
        alert ("complete los campos")
    }

}

//ELIMINAR CANCION
async function eliminarCanciones() {
    cancionSeleccionadaDelete=ui.getselectCancionesDelete()

    const datos = {
        cancionSeleccionadaDelete:cancionSeleccionadaDelete
    }

    try {
        const responde = await fetch (`http://localhost:4000/eliminarCanciones`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(datos)
        });
        const result = await responde.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}