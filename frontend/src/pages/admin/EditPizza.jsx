import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import toast from 'react-hot-toast';

const EditPizza = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        category: 'Veg',
        price: '',
        description: '',
        image: null,
        currentImage: ''
    });

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const { data } = await API.get('/menu');
                const pizzas = data.data || data;
                const pizza = pizzas.find(p => p._id === id);

                if (pizza) {
                    setFormData({
                        name: pizza.name,
                        category: pizza.category,
                        price: pizza.price,
                        description: pizza.description || '',
                        currentImage: pizza.image,
                        image: null
                    });
                } else {
                    toast.error("Pizza not found");
                    navigate('/admin/all-pizzas');
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch pizza details");
            } finally {
                setLoading(false);
            }
        };
        fetchPizza();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('category', formData.category);
        data.append('price', formData.price);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const res = await API.patch(`/menu/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.status === 'success') {
                toast.success("Pizza Updated Successfully!");
                navigate('/admin/all-pizzas');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Edit <span className="text-primary">Pizza</span></h2>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl space-y-6 border border-gray-100">

                <div className="flex justify-center mb-6">
                    <img
                        src={formData.image ? URL.createObjectURL(formData.image) : formData.currentImage}
                        alt="Preview"
                        className="w-32 h-32 rounded-2xl object-cover bg-gray-100 border-4 border-white shadow-lg"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-2">Pizza Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 font-bold" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-2">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 font-bold">
                            <option value="Veg">Veg</option>
                            <option value="Meat">Meat</option>
                            <option value="Chicken">Chicken</option>
                            <option value="Seafood">Seafood</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-2">Price (Rs)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 font-bold" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 font-medium text-sm"></textarea>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-2">Update Image (Optional)</label>
                    <input type="file" onChange={handleFileChange} accept="image/*" className="w-full p-3 bg-gray-50 rounded-2xl border-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                </div>

                <button type="submit" disabled={submitting} className="w-full py-4 bg-dark-base text-white font-black uppercase tracking-widest rounded-2xl shadow-lg hover:bg-primary transition-colors disabled:opacity-50 mt-4">
                    {submitting ? 'Updating...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default EditPizza;
