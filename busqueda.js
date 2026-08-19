const btnCargar = document.getElementById("btnCargar");
const btnBuscar = document.getElementById("btnBuscar");
const inputId = document.getElementById("inputId");
const tablaCuerpo = document.getElementById("tablaCuerpo");

async function cargarUsuarios() {
  tablaCuerpo.innerHTML = `
                <tr>
                    <td colspan="5" class="loading">
                        Cargando datos del servidor...
                    </td>
                </tr>
            `;

  try {
    const respuesta = await fetch("http://localhost:3000/api/v1/productos");

    if (!respuesta.ok) {
      throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }

    const resultado = await respuesta.json();

    const usuarios = resultado.data;

    tablaCuerpo.innerHTML = "";

    usuarios.forEach((user) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
                        <td>
                            <span class="badge">
                                #${user.id.trim()}
                            </span>
                        </td>

                        <td>${user.Nombre}</td>

                        <td>${user.Apellido}</td>

                        <td>${user.Documento}</td>

                        <td>${user.Numero}</td>
                    `;

      tablaCuerpo.appendChild(fila);
    });
  } catch (error) {
    console.error("Fallo al consultar la API:", error);

    tablaCuerpo.innerHTML = `
                    <tr>
                        <td colspan="5" class="error">
                            ⚠️ No se pudo conectar con el servidor backend en
                            http://localhost:3000.
                            Verifica que el comando
                            "node index.js"
                            esté ejecutándose en la terminal.
                        </td>
                    </tr>
                `;
  }
}

async function buscarProducto() {
  const id = inputId.value.trim();

  // Verificar que el usuario haya escrito un ID
  if (!id) {
    alert("Por favor, digite un ID");

    return;
  }

  tablaCuerpo.innerHTML = `
                <tr>
                    <td colspan="5" class="loading">
                        Buscando producto...
                    </td>
                </tr>
            `;

  try {
    const respuesta = await fetch(
      `http://localhost:3000/api/v1/productos/${id}`,
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      tablaCuerpo.innerHTML = `
                        <tr>
                            <td colspan="5" class="error">
                                ⚠️ ${resultado.mensaje}
                            </td>
                        </tr>
                    `;

      return;
    }

    const producto = resultado.data;

    tablaCuerpo.innerHTML = `
                    <tr>

                        <td>
                            <span class="badge">
                                #${producto.id.trim()}
                            </span>
                        </td>

                        <td>
                            ${producto.Nombre}
                        </td>

                        <td>
                            ${producto.Apellido}
                        </td>

                        <td>
                            ${producto.Documento}
                        </td>

                        <td>
                            ${producto.Numero}
                        </td>

                    </tr>
                `;
  } catch (error) {
    console.error("Fallo al buscar el producto:", error);

    tablaCuerpo.innerHTML = `
                    <tr>
                        <td colspan="5" class="error">
                            ⚠️ No se pudo conectar con el servidor.
                        </td>
                    </tr>
                `;
  }
}

btnCargar.addEventListener("click", cargarUsuarios);

btnBuscar.addEventListener("click", buscarProducto);

const btnError = document.getElementById("bterror");

btnError.addEventListener("click", async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/v1/status-error");

    if (respuesta.status === 404) {
      console.error("Error 404: Página o recurso no encontrado.");

      window.location.href = "../pages/pagina-error.html";
    }
  } catch (error) {
    console.error("Fallo de conexión:", error);
  }
});
