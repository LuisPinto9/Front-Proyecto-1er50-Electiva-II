console.log("Inicio del script");

const url = 'https://back-proyecto-1er50-electiva-ii.vercel.app/client';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDI3NDU0OTQsImV4cCI6MTcwMjgzMTg5NH0.vHCG2kzpEZQRpDkbAXznZC7WQ8vFQxacjstKEy7gCXs';


const apiUrl = "https://back-proyecto-1er50-electiva-ii.vercel.app/client";
const authorizationToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDI3NDc2NTIsImV4cCI6MTcwMjgzNDA1Mn0.PVLGbu42cyVknj6rUen0_RY0QsW4dtFGu4zyf5nWm_Y";

        fetch(apiUrl, {
            headers: {
                Authorization: `${authorizationToken}`
            }
        })
            .then((datos) => datos.json())
            .then(data => {
                console.log("aqui")
                console.log(data); 
                console.log("aqui")
            })
            .catch(error => console.error(error));

// fetch(url, {
//     method: 'GET', // o el método que necesites (GET, POST, etc.)
//     headers: {
//         'Authorization': `Bearer ${token}`
//         // Agrega otros encabezados si es necesario
//     }
// })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));

// fetch('https://back-proyecto-1er50-electiva-ii.vercel.app/client')
//     .then(response => response.json())
//     .then(data => {
//         console.log("aqui")
//         console.log(data); 
//         console.log("aqui")
//     })
//     .catch(error => console.error(error));

// const loadTable = () => {
//     console.log
//     document.getElementById("table-body").innerHTML = "";
//     return new Promise((resolve, reject) => {
//       fetch("https://back-proyecto-1er50-electiva-ii.vercel.app/client")
//         .then((datos) => datos.json())
//         .then((datos) => {
const loadTable = () => {
    document.getElementById("table-body").innerHTML = "";
    return new Promise((resolve, reject) => {
        const apiUrl = "https://back-proyecto-1er50-electiva-ii.vercel.app/client";
        const authorizationToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDI3NDc2NTIsImV4cCI6MTcwMjgzNDA1Mn0.PVLGbu42cyVknj6rUen0_RY0QsW4dtFGu4zyf5nWm_Y";

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