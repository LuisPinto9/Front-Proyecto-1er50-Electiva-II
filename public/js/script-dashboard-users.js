const apiUrl = "https://back-proyecto-1er50-electiva-ii.vercel.app/login/";
const authorizationToken = localStorage.getItem("login");

const isAuthenticated = () => {
  return authorizationToken !== null && authorizationToken !== undefined;
};
  
const requireLogin = () => {
if (!isAuthenticated()) {
  window.location.replace("/login");
} 
};  
requireLogin()


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
        Authorization: `${authorizationToken}`,
      },
    })
      .then((datos) => datos.json())
      .then((datos) => {
        const select = document.getElementById("select-id");
        datos.data.forEach((user) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${user._id}</td>
              <td>${user.username}</td>
              <td>${user.password}</td>
              <td>
              <i class="bi bi-pencil-fill"
              type="button" 
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop${user._id}" 
              style="color: #FFC300; font-size: 2rem;">
              </i>
              <div
              class="modal fade"
              id="staticBackdrop${user._id}"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">
                      Editar usuario
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onclick=loadTable()
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form id="add-client-form">
                      <div class="mb-3">
                        <label for="update-username${user._id}" class="form-label">Nombre de usuario</label>
                        <input type="text" class="form-control" id="update-username${user._id}" value='${user.username}' required />
                      </div>
                      <div class="mb-3">
                        <label for="update-password${user._id}" class="form-label">Contraseña</label>
                        <input type="text" class="form-control" value='${user.password}' id="update-password${user._id}" />
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onclick=loadTable()
                    >
                      Cancelar
                    </button>
                    <button type="button" class="btn btn-primary" data-value="${user._id}" onclick='update(this.getAttribute("data-value"))'>
                      Editar usuario
                    </button>
                  </div>
                </div>
              </div>
            </div></td></td>
              <td><i class="bi bi-x-circle" data-value="${user._id}" type="button" onClick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i></td>
            `;

          const option = document.createElement("option");
          option.value = user._id;
          option.innerText = user._id;
          select.appendChild(option);

          document.getElementById("table-body").appendChild(row);
        });
      })
      .catch((error) =>
        Swal.fire({
          title: `Error de conexión: ${error}`,
          text: "Hubo un error al tratar de conectar con el servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
        })
      );
  });
};

loadTable();

const findById = () => {
  const option = document.getElementById("select-id");
  if (option.value !== "Seleccione un ID") {
    return new Promise((resolve, reject) => {
      fetch(apiUrl + `${option.value}`, {
        headers: {
          Authorization: `${authorizationToken}`,
        },
      })
        .then((data) => {
          if (!data.ok) {
            throw new Error(`Error: ${data.status} - ${data.statusText}`);
          }
          return data.json();
        })
        .then((result) => {
          const datos = result.data;
          document.getElementById("table-body").innerHTML = "";
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>${datos._id}</td>
                    <td>${datos.username}</td>
                    <td>${datos.password}</td>
                    <td><i class="bi bi-pencil-fill"
                    type="button" 
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop${datos._id}" 
                    style="color: #FFC300; font-size: 2rem;">
                    </i>
                  <div
                    class="modal fade"
                    id="staticBackdrop${datos._id}"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="staticBackdropLabel">
                            Editar usuario
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onclick=loadTable()
                          ></button>
                        </div>
                        <div class="modal-body">
                          <form id="add-client-form">
                            <div class="mb-3">
                              <label for="update-username${datos._id}" class="form-label">Nombre de usuario</label>
                              <input type="text" class="form-control" id="update-username${datos._id}" value="${datos.username}" required />
                            </div>
                            <div class="mb-3">
                              <label for="update-password${datos._id}" class="form-label">Contraseña</label>
                              <input type="text" class="form-control" value="${datos.password}" id="update-password${datos._id}" />
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onclick=loadTable()
                          >
                            Cancelar
                          </button>
                          <button type="button" class="btn btn-primary" data-value="${datos._id}" onclick='update(this.getAttribute("data-value"))'>
                            Editar usuario
                          </button>
                        </div>
                      </div>
                    </div>
                  </div></td>
                    <td><i class="bi bi-x-circle" data-value='${datos._id}' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i></td>
                `;

          document.getElementById("table-body").appendChild(row);
        })
        .catch((error) => reject(error));
    });
  } else if ((option.value = "Seleccione un ID")) {
    loadTable();
  }
};

const drop = (id) => {
  const URI = apiUrl + id;
  fetch(URI, {
    method: "DELETE",
    headers: {
      Authorization: `${authorizationToken}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.state) {
        loadTable();
        Swal.fire({
          title: "Eliminación exitosa",
          text: `El usuario ${id} fue eliminado.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error al eliminar el usuario",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        title: "Error de conexión",
        text: "Hubo un error al tratar de conectar con el servidor.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    });
};

const clearInputs = () => {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
};

const add = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password || !username.trim() || !password.trim()) {
    Swal.fire({
      title: "Campos invalidos",
      text: "Ingrese los campos correctamente.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  const newUser = {
    username: username,
    password: password,
  };

  const URI = apiUrl + "save";

  fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authorizationToken}`,
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result.state) {
        Swal.fire({
          title: "Registro exitoso",
          text: `El usuario ${username} ha sido registrado.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        loadTable();
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      } else {
        Swal.fire({
          title: "Error al registrar el usuario",
          text: "Hubo un error al tratar de registrar en la base de datos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        title: "Error de guardado",
        text: "Ha ocurrido un error en el guardado del usuario, verifique si el usuario ya existe.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    });
};

const update = (id) => {
  const updateUsername = document.getElementById("update-username" + id).value;
  const updatePassword = document.getElementById("update-password" + id).value;

  if (
    !updateUsername ||
    !updatePassword ||
    !updateUsername.trim() ||
    !updatePassword.trim()
  ) {
    Swal.fire({
      title: "Campos invalidos",
      text: "Ingrese los campos correctamente.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  const updateData = {
    username: updateUsername,
    password: updatePassword,
  };

  fetch(apiUrl + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authorizationToken}`,
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.state) {
        Swal.fire({
          title: "Actualización exitosa",
          text: `El usuario ha sido actualizado.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error al actualizar el usuario",
          text: "Hubo un error al tratar de actualizar en la base de datos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        title: "Error de conexión",
        text: "Hubo un error al tratar de conectar con el servidor.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    });
};
