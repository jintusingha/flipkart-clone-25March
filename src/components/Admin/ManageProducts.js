import React, { useState, useEffect } from 'react';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!productName || !price || !rating || !description) {
      alert("Please fill all required fields");
      return;
    }

    
    let imageUrl = "/images/default.jpg";
    if (previewImage) {
      imageUrl = previewImage;
    }

    const newProduct = {
      id: Date.now(),
      name: productName,
      price: Number(price),
      rating: Number(rating),
      description,
      category: category || "Admin Added",
      image: imageUrl
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
   
    setProductName('');
    setPrice('');
    setRating('');
    setDescription('');
    setCategory('');
    setProductImage(null);
    setPreviewImage('');
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="container mt-5 pt-5">
      <h2>Manage Products</h2>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Product Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Price (₹) *</label>
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Rating (1-5) *</label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              className="form-control"
              placeholder="Rating (1-5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Description *</label>
            <textarea
              className="form-control"
              placeholder="Description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Product Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          
          {previewImage && (
            <div className="mb-3">
              <label className="form-label">Image Preview</label>
              <div>
                <img 
                  src={previewImage} 
                  alt="Product Preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <button className="btn btn-primary mb-4" onClick={handleAddProduct}>Add Product</button>
      
      <h3>Product List</h3>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card">
              <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.name} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">₹{product.price} | ⭐{product.rating}</h6>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><small className="text-muted">Category: {product.category}</small></p>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-12">
            <p className="text-center text-muted">No products added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;