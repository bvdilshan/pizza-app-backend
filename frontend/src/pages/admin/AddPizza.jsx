import { useState } from 'react';
import API from '../../services/api';

const AddPizza = () => {
  const [pizzaData, setPizzaData] = useState({
    name: '',
    price: '',
    category: 'Veg',
    size: 'Medium',
    description: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState(null);


  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', pizzaData.name);
      formData.append('price', pizzaData.price);
      formData.append('category', pizzaData.category);
      formData.append('size', pizzaData.size);
      formData.append('description', pizzaData.description);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      await API.post('/menu/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert("New Pizza Added Successfully! ");

      setPizzaData({ name: '', price: '', category: 'Veg', description: '', image: '' });
      setSelectedFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add pizza. Try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 font-inter">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-50 flex flex-col md:flex-row gap-10">


        <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[2rem] p-4 bg-gray-50">
          {imagePreview ? (
            <img src={imagePreview} className="w-full h-48 object-cover rounded-2xl mb-4 shadow-md" alt="Preview" />
          ) : (
            <div className="text-gray-400 text-center mb-4">
              <i className="fas fa-image text-5xl mb-2"></i>
              <p className="text-xs font-bold uppercase">No Image Selected</p>
            </div>
          )}
          <label className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition">
            CHOOSE IMAGE
            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
          </label>
          {pizzaData.image && <p className="text-[10px] text-gray-400 mt-2 truncate w-full text-center">{pizzaData.image}</p>}
        </div>


        <form onSubmit={handleSubmit} className="flex-grow space-y-5">
          <h2 className="text-3xl font-black text-dark-base mb-6">
            Add New <span className="text-primary">Pizza</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Pizza Name</label>
              <input
                type="text" placeholder="e.g. Seafood Pizza"
                className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary outline-none transition font-bold"
                onChange={(e) => setPizzaData({ ...pizzaData, name: e.target.value })}
                value={pizzaData.name} required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Price (Rs.)</label>
              <input
                type="number" placeholder="2500"
                className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary outline-none transition font-bold"
                onChange={(e) => setPizzaData({ ...pizzaData, price: e.target.value })}
                value={pizzaData.price} required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">Category</label>
            <select
              className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary outline-none transition font-bold"
              onChange={(e) => setPizzaData({ ...pizzaData, category: e.target.value })}
              value={pizzaData.category}
            >
              <option value="Veg">Vegetarian</option>
              <option value="Meat">Meat Lovers</option>
              <option value="Chicken">Chicken Special</option>
              <option value="Seafood">Seafood Feast</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">Size</label>
            <select
              className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary outline-none transition font-bold"
              onChange={(e) => setPizzaData({ ...pizzaData, size: e.target.value })}
              value={pizzaData.size}
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">Description</label>
            <textarea
              placeholder="Brief description of ingredients..."
              className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary outline-none transition h-24 font-medium"
              onChange={(e) => setPizzaData({ ...pizzaData, description: e.target.value })}
              value={pizzaData.description} required
            ></textarea>
          </div>

          <button className="w-full bg-dark-base hover:bg-primary text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95 uppercase tracking-widest">
            Add to Menu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPizza;