
"use strict"

const db = firebase.firestore();
const frm = document.querySelector("#frm");
const tblContacto = document.querySelector("#tblContacto > tbody");
const coleccionStr = "Contacto";

const findAll = () => db.collection(coleccionStr).get();
const onFindAll = callback => db.collection(coleccionStr).onSnapshot(callback);
const onInsert = objeto => db.collection(coleccionStr).doc().set(objeto);

window.addEventListener("load", async () => {
    await onFindAll(query => {
        tblContacto.innerHTML = "";

        query.forEach(doc => {
            let dato = doc.data();
            tblContacto.innerHTML += `
                <tr>
                    <td>${dato.nombre}</td>
                    <td>${dato.apellido}</td>
                    <td>${dato.direccion}</td>
                    <td>${dato.correo}</td>
                </tr>
            `;
        });
    });
});

frm.addEventListener("submit", async evento => {
    evento.preventDefault();

    const personaTO = {
        nombre: frm.txtNombre.value,
        apellido: frm.txtApellido.value,
        direccion: frm.txtDireccion.value,
        correo: frm.txtCorreo.value
    }

    await onInsert(personaTO);
    Swal.fire({
        title: "Pronto nos contactaremos con usted por medio del correo, gracias",
        text: "Registrado",
        icon: "success"
    });

    limpiar();
});

function limpiar() {
    frm.reset();
    frm.btnGuardar.innerHTML = "Guardar";
    frm.txtNombre.focus();
}
