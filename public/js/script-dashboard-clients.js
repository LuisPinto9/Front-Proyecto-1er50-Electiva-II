console.log("Inicio del script");


const apiUrl = "https://back-proyecto-1er50-electiva-ii.vercel.app/client";
const authorizationToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDI3NTU2MTYsImV4cCI6MTcwMjg0MjAxNn0.deQpcFR6OMeYRxAHa9UD5vDTHZrN8BKQ4rdAIOFhlvc";

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
              <td>${cliente.reservations.map(reserva => reserva.id).join(', ') || "N/A"}</td>
              <td><button class='btn btn-danger' value='${cliente.id
                        }' onclick='drop(this.value)'>Eliminar</button></td>
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
                                    <input type="text" class="form-control" id="update-name" value="${cliente.name}">
                                </div>
                                <div class="mb-3">
                                    <label for="update-celphone" class="form-label">Teléfono</label>
                                    <input type="tel" class="form-control" id="update-celphone" value="${cliente.celphone}">
                                </div>
                                <div class="mb-3">
                                    <label for="update-email" class="form-label">Correo Electrónico</label>
                                    <input type="email" class="form-control" id="update-email" value="${cliente.email}">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" onclick="updateClient('${cliente.id}')">Actualizar Cliente</button>
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
{/* <button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='updateModal("${datos.id}")'>Actualizar</button>*/}


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
                    <td>${datos.reservations.map(reserva => reserva.id).join(', ') || "N/A"}</td>
                    <td><button class='btn btn-danger' value='${datos.id}' onclick='drop(this.value)'>Eliminar</button></td>
                    

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
                                    <input type="text" class="form-control" id="update-name" value="${cliente.name}">
                                </div>
                                <div class="mb-3">
                                    <label for="update-celphone" class="form-label">Teléfono</label>
                                    <input type="tel" class="form-control" id="update-celphone" value="${cliente.celphone}">
                                </div>
                                <div class="mb-3">
                                    <label for="update-email" class="form-label">Correo Electrónico</label>
                                    <input type="email" class="form-control" id="update-email" value="${cliente.email}">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" onclick="updateClient('${cliente._id}')">Actualizar Cliente</button>
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
{/* <td><button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='updateModal("${datos.id}")'>Actualizar</button></td> */ }

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


const addClient = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const celphone = document.getElementById("celphone").value;
    const email = document.getElementById("email").value;

    // Validación simple (puedes agregar más validaciones según tus necesidades)
    if (!name) {
        alert("Por favor, ingresa el nombre del cliente.");
        return;
    }

    // Objeto que representa el nuevo cliente
    const newClient = {
        id: id,
        name: name,
        celphone: celphone,
        email: email,
    };

    // Realiza la solicitud para agregar el nuevo cliente
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
                // Si se agrega exitosamente, recarga la tabla
                loadTable();
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



const updateClient = (clientId) => {
    // Obtén los valores actualizados del formulario dentro del modal
    
    const updatedName = document.getElementById("update-name").value;
    const updatedCelphone = document.getElementById("update-celphone").value;
    const updatedEmail = document.getElementById("update-email").value;
    // console.log("jajaj",clientId,updatedName,updatedCelphone,updatedEmail)

    // Lógica para realizar la actualización del cliente
    const updateData = {
        
        name: updatedName,
        celphone: updatedCelphone,
        email: updatedEmail
    };

    // Realiza la solicitud PUT para actualizar el cliente
    fetch(`https://back-proyecto-1er50-electiva-ii.vercel.app/client/${clientId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${authorizationToken}`
        },
        body: JSON.stringify(updateData)
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            if (result.state) {
                loadTable(); // Recarga la tabla después de la actualización
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







