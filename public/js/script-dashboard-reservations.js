const loadTable = () => {
  const URI = "https://back-proyecto-1er50-electiva-ii.vercel.app/reservation/";
  const token = localStorage.getItem("login");
  fetch(URI, {
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tBody");
      tbody.innerHTML = "";
      document.getElementById("select-reservation").innerHTML = "";
      const optionDefault = document.createElement("option");
      optionDefault.value = "Seleccione un ID";
      optionDefault.innerText = "Seleccione un ID";
      document.getElementById("select-reservation").appendChild(optionDefault);
      const select = document.getElementById("select-reservation");
      data.data.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.id;
        select.appendChild(option);

        const row = document.createElement("tr");
        const dateStart = dateFormat(element.bookingStartDate);
        const dateEnd = dateFormat(element.bookingEndDate);

        row.innerHTML = `
        <th scope="row style="color: red;">${element.id}</th>
        <td>${element.bookingStartDate}</td>
        <td>${element.bookingEndDate}</td>
        <td>${element.service}</td>
        <td>${element.client.name}</td>
        <td>${element.comments}</td>
        <td><!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop${element._id}">
          Editar
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop${element._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">ID</span>
                    <input disabled type="number" id="idEdit${element.id}" class="form-control" value=${element.id} placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">service</span>
                    <input type="text" class="form-control" id="serviceEdit${element.id}" value=${element.service} placeholder="service" aria-label="Username" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">bookingStartDate</span>
                    <input type="datetime-local" id="dateStartEdit${element.id}" class="form-control" value=${dateStart} placeholder="bookingStartDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">bookingEndDate</span>
                    <input type="datetime-local" id="dateEndEdit${element.id}" class="form-control" value=${dateEnd} placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>


                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Cliente</span>
                    <input disabled type="text" id="clientEdit${element.id}" class="form-control" value=${element.client.name} placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">comments</span>
                    <input type="text" id="commentsEdit${element.id}" class="form-control" value=${element.comments} placeholder="comments" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick="loadTable()">Close</button>
                <button type="button" class="btn btn-primary" onclick='updateElement(this.getAttribute("data-value"))' data-value="${element.id}">Aceptar</button>
              </div>
            </div>
          </div>
        </div></td>
        <td><button type="button" value=${element.id} onClick="deleteElement(this.value)" class="btn btn-danger">Eliminar</button></td>

        `;
        tbody.appendChild(row);
      });
    });
};

const actualizarTabla = (datos) => {
  const map = [datos[0]];
  const tbody = document.getElementById("tBody");
  tbody.innerHTML = "";
  map.forEach((element) => {
    const row = document.createElement("tr");
    const dateStart = dateFormat(element.bookingStartDate);
    const dateEnd = dateFormat(element.bookingEndDate);
    row.innerHTML = `
        <th scope="row style="color: red;">${element.id}</th>
        <td>${element.bookingStartDate}</td>
        <td>${element.bookingEndDate}</td>
        <td>${element.service}</td>
        <td>${element.client.name}</td>
        <td>${element.comments}</td>
        <td><!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop${element._id}">
          Editar
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop${element._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">ID</span>
                    <input disabled type="number" id="idEdit${element.id}" class="form-control" value=${element.id} placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">service</span>
                    <input type="text" class="form-control" id="serviceEdit${element.id}" value=${element.service} placeholder="service" aria-label="Username" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">bookingStartDate</span>
                    <input type="datetime-local" id="dateStartEdit${element.id}" class="form-control" value=${dateStart} placeholder="bookingStartDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">bookingEndDate</span>
                    <input type="datetime-local" id="dateEndEdit${element.id}" class="form-control" value=${dateEnd} placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>


                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Cliente</span>
                    <input disabled type="text" id="clientEdit${element.id}" class="form-control" value=${element.client.name} placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">comments</span>
                    <input type="text" id="commentsEdit${element.id}" class="form-control" value=${element.comments} placeholder="comments" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick="loadTable()">Close</button>
                <button type="button" class="btn btn-primary" onclick='updateElement(this.getAttribute("data-value"))' data-value="${element.id}">Aceptar</button>
              </div>
            </div>
          </div>
        </div></td>
        <td><button type="button" value=${element.id} onClick="deleteElement(this.value)" class="btn btn-danger">Eliminar</button></td>

        `;
    document.getElementById("tBody").appendChild(row);
  });
};

document.getElementById("select-reservation").addEventListener("change", () => {
  const valor = document.getElementById("select-reservation").value;
  const URI = `https://back-proyecto-1er50-electiva-ii.vercel.app/reservation/${valor}`;
  const token = localStorage.getItem("login");
  fetch(URI, {
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((r) => {
      actualizarTabla(r.data);
    })
    .catch((err) => console.error(err));
});

document
  .getElementById("btn-reload-reservation")
  .addEventListener("click", () => {
    loadTable();
  });

const dateFormat = (date) => {
  var fechaOriginal = new Date(date);

  var año = fechaOriginal.getUTCFullYear();
  var mes = ("0" + (fechaOriginal.getUTCMonth() + 1)).slice(-2); // Sumar 1 porque los meses van de 0 a 11
  var dia = ("0" + fechaOriginal.getUTCDate()).slice(-2);
  var horas = ("0" + fechaOriginal.getUTCHours()).slice(-2);
  var minutos = ("0" + fechaOriginal.getUTCMinutes()).slice(-2);

  // Formatear la fecha como "yyyy-MM-ddThh:mm"
  var fechaFormateadaStart =
    año + "-" + mes + "-" + dia + "T" + horas + ":" + minutos;
  return fechaFormateadaStart;
};

const chargeSelect = () => {
  const URIC = "https://back-proyecto-1er50-electiva-ii.vercel.app/client";
  const token = localStorage.getItem("login");

  fetch(URIC, {
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((element) => {
        const select = document.createElement("option");
        select.value = element._id;
        select.textContent = element.name;

        document.getElementById("clientnSend").appendChild(select);
      });
    });
};

document.getElementById("Agregar").addEventListener("click", () => {
  const id = document.getElementById("idSend").value;
  const name = document.getElementById("nameSend").value;
  const bookingStar = document.getElementById("bookingStar").value;
  const bookingEnd = document.getElementById("bookingEnd").value;
  const clientnSend = document.getElementById("clientnSend").value;
  const comments = document.getElementById("commentsSend").value;

  if (
    validateFields(id, name, bookingStar, clientnSend, bookingEnd, comments)
  ) {
    const dataSend = {
      id: id,
      bookingStartDate: bookingStar,
      bookingEndDate: bookingEnd,
      service: name,
      comments: comments,
      client: {
        _id: clientnSend,
      },
    };

    //falta validar para que no deje campos vacios
    const URI =
      "https://back-proyecto-1er50-electiva-ii.vercel.app/reservation/";
    const token = localStorage.getItem("login");
    fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataSend),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.state) {
          alert("Agregado!!");
          cleanFields();
          loadTable();
        } else {
          alert("some wrong");
          console.log(result);
        }
      })
      .catch((err) => console.log(err));
  } else {
    alert("por favor llene todos los campos");
  }
});

document.getElementById("limpiar").addEventListener("click", () => {
  cleanFields();
});

chargeSelect();
loadTable();

const updateElement = (id) => {
  const service = document.getElementById("serviceEdit"+id).value;
  const dateStart = document.getElementById("dateStartEdit"+id).value;
  const dateEnd = document.getElementById("dateEndEdit"+id).value;
  const client = document.getElementById("clientEdit"+id).value;
  const comments = document.getElementById("commentsEdit"+id).value;

  const updateData = {
    bookingStartDate: dateStart,
    bookingEndDate: dateEnd,
    service: service,
    cliente: client,
    comments: comments,
  };

  const URI = `https://back-proyecto-1er50-electiva-ii.vercel.app/reservation/${id}`;
  const token = localStorage.getItem("login");
  fetch(URI, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.state) {
        alert("Reservacion actualizada exitosamente.");
      } else {
        alert(result.error);
      }
    })
    .catch((error) => alert(error));
};

const deleteElement = (id) => {
  const token = localStorage.getItem("login");
  const URI = `https://back-proyecto-1er50-electiva-ii.vercel.app/reservation/${id}`;
  fetch(URI, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.state) {
        loadTable();
        alert("Reservation eliminado");
      } else {
        alert("Error al eliminar el cliente");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ocurrió un error al eliminar el cliente");
    });
};

const validateFields = (
  id,
  name,
  bookingStar,
  clientnSend,
  bookingEnd,
  comments
) => {
  const validate =
    id == undefined ||
    name == undefined ||
    bookingStar == undefined ||
    bookingEnd == undefined ||
    clientnSend == undefined ||
    comments == undefined ||
    id == null ||
    name == null ||
    bookingStar == null ||
    bookingEnd == null ||
    clientnSend == null ||
    comments == null ||
    clientnSend == "Cliente"
      ? false
      : true;
  return validate;
};

const cleanFields = () => {
  document.getElementById("idSend").value = "";
  document.getElementById("nameSend").value = "";
  document.getElementById("bookingStar").value = "";
  document.getElementById("bookingEnd").value = "";
  document.getElementById("commentsSend").value = "";

  // Restablecer el valor seleccionado en el elemento select
  var selectElement = document.getElementById("clientnSend");
  selectElement.selectedIndex = 0; // Establece la opción predeterminada como seleccionada
};
