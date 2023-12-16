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
        // const apiUrl = "https://back-proyecto-1er50-electiva-ii.vercel.app/client";
        // const authorizationToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDI3NDc2NTIsImV4cCI6MTcwMjgzNDA1Mn0.PVLGbu42cyVknj6rUen0_RY0QsW4dtFGu4zyf5nWm_Y";

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
                    <td>${datos.reservations.map(reserva => reserva.id).join(', ') || "N/A"}</td>
                    <td><button class='btn btn-danger' value='${datos.id}' onclick='drop(this.value)'>Eliminar</button></td>
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



