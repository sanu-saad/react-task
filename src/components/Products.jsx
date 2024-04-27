import React, { useEffect, useState } from "react";

function ProductModal({ product, onClose }) {
  return (
    <div className=" fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <img src={product.image} alt="" className=" w-42 h-28" />
        <h2 className="text-xl font-bold mb-4">{product.title}</h2>
        <p>{product.description}</p>
        <p className="font-bold">Category - {product.category}</p>
        <p className="mt-4">
          <strong>Price:</strong> ${product.price}
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}
//Update product model
const UpdateModel = ({ product, onClose }) => {
  return (
    <div className=" fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <input
          type="text"
          className="input"
          value={product.title}
          name="title"
        />
        <input
          type="text"
          className="input"
          value={product.category}
          name="category"
        />
        <input
          type="text"
          className="input"
          value={product.price}
          name="price"
        />
        <div className="text-center">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
            onClick={() => alert("Product Updated")}
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [changeProduct, setChangeProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        // console.log(data);
        setProducts(data);

        const uniqueCategories = [
          ...new Set(products.map((product) => product.category)),
        ];
        // console.log(uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [categories]);

  const filterProducts = () => {
    let filteredProducts = products;

    // Filter by category if a category is selected
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query (case-insensitive)
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredProducts;
  };
  const filteredProducts = filterProducts();

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  //Update Model
  const openUpdateModel = (product) => {
    setChangeProduct(product);
  };
  const exitModel = () => {
    setChangeProduct(null);
  };

  // Delete products
  const deleteProduct = (id) => {
    confirm("Are you sure ?");
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <section className="p-4 h-screen">
      <h2 className="text-3xl font-bold text-center mb-4">All Products</h2>
      <div className="flex items-center justify-between">
        <div className="mt-5">
          <input
            type="text"
            placeholder="Search Products"
            className="w-full lg:w-[600px] bg-gray-100 border border-gray-400 text-gray-900 text-lg rounded-lg focus:ring-blue-800 focus:border-blue-500  p-2.5 mb-5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown for categories */}
        <div>
          <label htmlFor="category-dropdown">Select a Category:</label>
          <select
            className="border-solid border-2 border-gray-700 rounded"
            id="category-dropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {/* Optional default option */}
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* table for products */}
      <table class="table-auto border-collapse border border-slate-500 w-full">
        <thead>
          <tr>
            <th class="border border-slate-600">Product Title</th>
            <th class="border border-slate-600 ">Price</th>
            <th class="border border-slate-600 ">Description</th>
            <th class="border border-slate-600 ">Category</th>
            <th class="border border-slate-600 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <>
              <tr key={product.id}>
                <td class="border border-slate-700 ...">
                  {product.title.split(" ").slice(0, 5).join(" ")}
                </td>
                <td class="border border-slate-700 ...">{product.price}</td>
                <td class="border border-slate-700 ...">
                  {product.description.split(" ").slice(0, 10).join(" ")}
                </td>
                <td class="border border-slate-700 ...">{product.category}</td>
                <td class="border border-slate-700 ...">
                  <button
                    className="bg-blue-500 text-white rounded px-1 text-sm mr-1"
                    onClick={() => openModal(product)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 text-white rounded px-1 text-sm mr-1"
                    onClick={() => openUpdateModel(product)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white rounded px-1 text-sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
      {changeProduct && (
        <UpdateModel product={changeProduct} onClose={exitModel} />
      )}
    </section>
  );
};

export default Products;
