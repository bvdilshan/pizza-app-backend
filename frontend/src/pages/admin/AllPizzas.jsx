import { useEffect, useState } from 'react';
import API from '../../services/api';

const AllPizzas = () => {
  const [pizzas, setPizzas] = useState([]);

  const fetchPizzas = async () => {
    try {
      const { data } = await API.get('/menu');
      setPizzas(data.data || data);
    } catch (err) {
      console.error("Error fetching menu", err);
    }
  };

  useEffect(() => { fetchPizzas(); }, []);

const handleDelete = async (id) => {
    try {
        
        const { data } = await API.delete(`/menu/${id}`); 
        
        if (data.status === 'success') {
            alert("Pizza Deleted! ");
            fetchPizzas(); 
        }
    } catch (err) {
        console.error(err);
        alert("Delete failed: " + err.response?.data?.message);
    }
};

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Inventory <span className="text-primary text-xl">(Edit/Delete)</span></h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pizzas.map((pizza) => (
          <div key={pizza._id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div className="flex items-center gap-5">
              <img src={pizza.image} alt="" className="w-16 h-16 rounded-2xl object-cover bg-gray-100" />
              <div>
                <h3 className="font-bold text-lg leading-tight">{pizza.name}</h3>
                <span className="text-xs font-bold text-primary uppercase">{pizza.category}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm font-bold text-gray-500 font-poppins text-xs">Rs. {pizza.price}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl hover:bg-blue-600 hover:text-white transition">
                <i className="fas fa-edit"></i>
              </button>
              <button 
                onClick={() => handleDelete(pizza._id)}
                className="bg-red-50 text-red-600 w-10 h-10 rounded-xl hover:bg-red-600 hover:text-white transition"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPizzas;