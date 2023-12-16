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
      data.data.forEach((element) => {
        const row = document.createElement("tr");
        const dateStart = dateFormat(element.bookingStartDate)
        const dateEnd = dateFormat(element.bookingEndDate)

        row.innerHTML = `
        <th scope="row style="color: red;">${element._id}</th>
        <td>${element.bookingStartDate}</td>
        <td>${element.bookingEndDate}</td>
        <td>${element.service}</td>
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
                    <span class="input-group-text" id="basic-addon1">service</span>
                    <input type="text" class="form-control" value=${element.service} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">bookingStartDate</span>
                    <input type="datetime-local" class="form-control" value=${dateStart} placeholder="bookingStartDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">bookingEndDate</span>
                    <input type="datetime-local" class="form-control" value=${dateEnd} placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">comments</span>
                    <input type="text" class="form-control" value=${element.comments} placeholder="comments" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Editar</button>
              </div>
            </div>
          </div>
        </div></td>
        `;
        tbody.appendChild(row);
      });
    });
};

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
    return fechaFormateadaStart
};

loadTable();
