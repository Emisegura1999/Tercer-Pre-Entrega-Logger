const socket = io(); 
const $ = document;

socket.on("products", (data) => {
    viewProducts(data);
});

const viewProducts = (productos) => {
    const prods = document.getElementById("product-list");
    prods.innerHTML = "";
    productos.docs.forEach(item => {
        const cardProds = document.createElement("div");
        cardProds.innerHTML = 
        ` 
            <div class="container mb-4 mx-auto card d-flex align-items-center gap-4" style="max-width: 20rem;">
          <div class="text-dark fw-semibold text-center mt-3">codigo del producto: ${
            item.code
          } </br>ID: ${item._id}</div>
          <div class="card-body">
            <img src="${
              item.thumbnail
            }" alt="img" class="img-thumbnail img-fluid h-30" id="img">
              <ul class="card-text list-unstyled">
                <li><h4 class="fs-5 text-center mt-3 text-dark">${
                  item.title
                }</h4></li>
                <li class="text-center mb-2 fs-5">categoria: ${
                  item.category
                }</li>
                <li class="text-center mb-2 fs-5">Estado: ${item.status}</li>
                <li class="text-center mb-2 fs-5">Existencias: ${
                  item.stock
                }</li>
                <li class="text-center mt-3 mb-2 fs-3 text-dark text-center mt-2">$${
                  item.price
                }</li>
                <div class="d-flex justify-content-center mt-4 mb-4">
                <button type="button" class="btn btn-danger delete-btn" onclick="deleteProduct('${String(
                  item._id
                )}')">Eliminar</button>
                </div>
              </ul>
            </div>
          </div>
        </div>
        `;
        prods.appendChild(cardProds);
        cardProds.querySelector("button").addEventListener("click", ()=> {
            deleteproduct(item._id);
        });
    });
};

const deleteproduct = (id) =>  {
    socket.emit("deleteProd", id);
};

document.getElementById("btnEnviar").addEventListener("click", () => {
    addProduct();
});

const addProduct = () => {
    const producto = {
        title: $.getElementById("title").value,
        thumbnail: $.getElementById("img").value,
        description: $.getElementById("description").value,
        price: $.getElementById("price").value,
        img: $.getElementById("img").value,
        code: $.getElementById("code").value,
        stock: $.getElementById("stock").value,
        category: $.getElementById("category").value,
        status: $.getElementById("status").value === "true",
    };
    socket.emit("addProd", producto);
};