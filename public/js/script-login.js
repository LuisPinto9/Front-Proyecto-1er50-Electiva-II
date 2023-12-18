document.getElementById("btnLogin").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const URI = "https://back-proyecto-1er50-electiva-ii.vercel.app/login/";
  const dataSend = {
    username: username,
    password: password,
  };
  fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataSend),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.state) {
        window.location.replace("/dashboard-home");
        SaveLocalStorage("login", data.token);
      } else {
        Swal.fire({
          title: "Error de ingreso",
          text: "Revise el usuario o la contraseña.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((err) => {
      Swal.fire({
        title: "Error de conexión",
        text: `${err}`,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    });
});

const SaveLocalStorage = (key, item) => {
  //conseguir elementos en localStorage
  let elementos = localStorage.getItem(key);
  //comprar si es un array
  if (Array.isArray(elementos)) {
    elementos.push(item);
  } else {
    //crear array
    elementos = item;
  }
  //guardar en el localStorage
  localStorage.setItem(key, elementos);
  //devolver objeto
  return item;
};
