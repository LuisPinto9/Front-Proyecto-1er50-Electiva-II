console.log("Inicio del script");
// import Swal from "sweetalert2";
// import Swal from './node_modules/sweetalert2/dist/sweetalert2.esm.js';

const apiUrl = "https://back-proyecto-1er50-electiva-ii.vercel.app/client";
const authorizationToken = localStorage.getItem("login")

fetch(apiUrl, {
    headers: {
        Authorization: `${authorizationToken}`
    }
})
    .then((datos) => datos.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error(error));

const loadTable = () => {
    document.getElementById("table-body").innerHTML = "";
  document.getElementById("select-id").innerHTML = "";
  const optionDefault = document.createElement("option");
  optionDefault.value = "Seleccione un ID";
  optionDefault.innerText = "Seleccione un ID";
  document.getElementById("select-id").appendChild(optionDefault);

    return new Promise((resolve, reject) => {

        fetch(apiUrl, {
            headers: {
                Authorization: `${authorizationToken}`
            }
        })
            .then((datos) => datos.json())
            .then((datos) => {
                console.log(datos);
                const select = document.getElementById("select-id");

                datos.data.forEach((cliente) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
              <td>${cliente.id}</td>
              <td>${cliente.name}</td>
              <td>${cliente.celphone || "N/A"}</td>
              <td>${cliente.email || "N/A"}</td>
              <td><i class="bi bi-x-circle" data-value='${cliente._id}' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i></td>

              
              <td>      
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal${cliente._id}">
                    Editar
                </button>
            
                <!-- Modal -->
                <div class="modal fade" id="editModal${cliente._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="editModalLabel">Editar Cliente</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
            
            
                                <div class="mb-3">
                                    <label for="update-name" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="update-name${cliente._id}" value="${cliente.name}">
                                </div>
                                <div class="mb-3">
                                    <label for="update-celphone" class="form-label">Teléfono</label>
                                    <input type="tel" class="form-control" id="update-celphone${cliente._id}" value="${cliente.celphone}">
                                </div>
                                <div class="mb-3">
                                    <label for="update-email" class="form-label">Correo Electrónico</label>
                                    <input type="email" class="form-control" id="update-email${cliente._id}" value="${cliente.email}">
                                </div>
                            </div>
                            <div class="modal-footer">
                            

                                <button type="button" class="btn btn-secondary" onclick="loadTable()" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" onclick="updateClient('${cliente.id}' , '${cliente._id}')">Actualizar Cliente</button>
                            </div>
                        </div>
                    </div>
                </div>
            

                </td> 

                    
            `;

                    const option = document.createElement("option");
                    option.value = cliente.id;
                    option.innerText = cliente.id;
                    select.appendChild(option);

                    document.getElementById("table-body").appendChild(row);
                });
            })
            .catch((error) => console.log(error));
    });
};


loadTable();
const findById = () => {
    const option = document.getElementById("select-id");
    if (option.value !== "Seleccione un ID") {
        return new Promise((resolve, reject) => {
            fetch(`https://back-proyecto-1er50-electiva-ii.vercel.app/client/${option.value}`, {
                headers: {
                    Authorization: `${authorizationToken}`
                }
            })
                .then((data) => {
                    if (!data.ok) {
                        throw new Error(`Error: ${data.status} - ${data.statusText}`);
                    }
                    return data.json();
                })
                .then((result) => {
                    const datos = result.data[0];
                    document.getElementById("table-body").innerHTML = "";
                    const row = document.createElement("tr");
                    row.innerHTML = `
                    <td>${datos.id}</td>
                    <td>${datos.name}</td>
                    <td>${datos.celphone || "N/A"}</td>
                    <td>${datos.email || "N/A"}</td>
                    <td><i class="bi bi-x-circle" data-value='${datos._id}' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i></td>
                    <td>

                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal${datos._id}">
                    Editar
                </button>
            
                <!-- Modal -->
                <div class="modal fade" id="editModal${datos._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="editModalLabel">Editar Cliente</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
            
            
                                <div class="mb-3">
                                    <label for="update-name" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="update-name${datos._id}" value="${datos.name}">
                                </div>
                                <div class="mb-3">
                                    <label for="update-celphone" class="form-label">Teléfono</label>
                                    <input type="tel" class="form-control" id="update-celphone${datos._id}" value="${datos.celphone}">
                                </div>
                                <div class="mb-3">
                                    <label for="update-email" class="form-label">Correo Electrónico</label>
                                    <input type="email" class="form-control" id="update-email${datos._id}" value="${datos.email}">
                                </div>
                            </div>
                            <div class="modal-footer">
                            

                                <button type="button" class="btn btn-secondary" onclick="loadTable()" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" onclick="updateClient('${datos.id}' , '${datos._id}')">Actualizar Cliente</button>
                            </div>
                        </div>
                    </div>
                </div>
            


                    </td>
                `;


                    document.getElementById("table-body").appendChild(row);
                    console.log(row);
                })
                .catch((error) => reject(error));
        });
    }
};

const drop = (id) => {
    const URI = `https://back-proyecto-1er50-electiva-ii.vercel.app/client/${id}`;
    fetch(URI, {
        method: "DELETE",
        headers: {
            Authorization: `${authorizationToken}`
        }
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.state) {
                loadTable();
                alert("Cliente eliminado");
            } else {
                alert("Error al eliminar el cliente");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Ocurrió un error al eliminar el cliente");
        });
};

const limpiarCampos =()=>{
     document.getElementById("id").value= "";
     document.getElementById("name").value= "";
    document.getElementById("celphone").value= "";
     document.getElementById("email").value= "";
}

const addClient = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const celphone = document.getElementById("celphone").value;
    const email = document.getElementById("email").value;
    if (!name) {
        alert("Por favor, ingresa el nombre del cliente.");
        return;
    }

    const newClient = {
        id: id,
        name: name,
        celphone: celphone,
        email: email,
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${authorizationToken}`,
        },
        body: JSON.stringify(newClient),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((result) => {
            if (result.state) {
                loadTable();
                limpiarCampos();
                alert("Cliente agregado exitosamente.");
            } else {
                alert("Error al agregar el cliente.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Ocurrió un error al agregar el cliente.");
        });
};
let errorMessages = {};


// const validateField = (fieldName, value) => {
//     switch (fieldName) {
//         case "Id":
//             const idPattern = /^[0-9]+$/;
//             if (!idPattern.test(value) || parseInt(value, 10) === 0) {
//                 errorMessages[fieldName] =
//                     "El campo ID debe contener solo números y no ser igual a cero.";
//             } else {
//                 errorMessages[fieldName] = "";
//             }
//             break;
//         case "Nombre":
//             const nombrePattern = /^[\p{L}ÁÉÍÓÚáéíóúÑñ\s]+$/u;
//             if (!nombrePattern.test(value) || value.length < 3) {
//                 errorMessages[fieldName] =
//                     "El campo Nombre debe contener solo letras y tener al menos 3 caracteres.";
//             } else {
//                 errorMessages[fieldName] = "";
//             }
//             break;
//         // Agrega otras validaciones para los campos restantes según sea necesario
//         default:
//             break;
//     }
// };

const validateField = (fieldName, value) => {
    
    console.log("valor", fieldName, value)
    switch (fieldName) {
        // case "Id":
        //     const idPattern = /^[0-9]+$/;
        //     if (!idPattern.test(value) || parseInt(value, 10) === 0) {
        //         e rrorMessages[fieldName] =
        //             "El campo ID debe contener solo números y no ser igual a cero.";
        //     } else { 
        //         errorMessages[fieldName] = "";
        //     }
        //     break;
        
        case "Nombre":
            const nombrePattern = /^[\p{L}ÁÉÍÓÚáéíóúÑñ\s]+$/u;
            if (!nombrePattern.test(value)) {
                console.log("valor nombre 222")

                errorMessages[fieldName] =
                    "El campo Nombre debe contener solo letras y tener al menos 3 caracteres.";
            } else {
                errorMessages[fieldName] = "";
            }
            break;
        case "Celphone":
            const celphonePattern = /^[0-9]{10}$/;
            if (!celphonePattern.test(value)) {
                errorMessages[fieldName] = "El campo Celphone debe contener 10 dígitos numéricos.";
                console.log("valor celular222")
                
            } else {
                errorMessages[fieldName] = "";
            }
            break;
        case "Email":
            const emailPattern = /^[\w-]+(?:\.[\w-]+)*@(?:gmail\.com|hotmail\.com|uptc\.edu\.co)$/;
            if (!emailPattern.test(value)) {
                console.log("valor email")

                errorMessages[fieldName] =
                    "El campo Email debe tener un formato válido (@gmail.com, @hotmail.com, @uptc.edu.co).";
            } else {
                errorMessages[fieldName] = "";
            }
            break;
        // Agrega otras validaciones para los campos restantes según sea necesario
        default:
            break;
    }
};
const validateFields = (updatedName,updatedCelphone,updatedEmail) => {
   

    validateField("Nombre", updatedName);
    validateField("Celphone", updatedCelphone);
    validateField("Email", updatedEmail);

    mostrarMensajeError();
};

const mostrarMensajeError = () => {
    const hasErrors = Object.values(errorMessages).some(message => message !== "");

    if (hasErrors) {
        Swal.fire({
            title: "Campos inválidos",
            text: "Uno o más campos contienen datos inválidos. Por favor, corrige los errores.",
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
        });
    }
};

const updateClient = (ClienteId1, clientId) => {
    console.log("aa", clientId)
    console.log("aa2", ClienteId1)
    

    const updatedName = document.getElementById("update-name" + clientId).value;
    const updatedCelphone = document.getElementById("update-celphone" + clientId).value;
    const updatedEmail = document.getElementById("update-email" + clientId).value;


   
    validateFields(updatedName, updatedCelphone, updatedEmail);
    const hasErrors = Object.values(errorMessages).some((message) => message !== "");

    if (hasErrors) {
        mostrarMensajeError();
        return; // Detener la ejecución si hay errores
    }
    

    const updateData = {
        name: updatedName,
        celphone: updatedCelphone,
        email: updatedEmail
    };


    fetch(`https://back-proyecto-1er50-electiva-ii.vercel.app/client/${ClienteId1}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${authorizationToken}`
        },
        body: JSON.stringify(updateData)
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.state) {

                alert("Cliente actualizado exitosamente.");

            } else {
                alert("Error al actualizar el cliente.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Ocurrió un error al actualizar el cliente.");
        });


};







