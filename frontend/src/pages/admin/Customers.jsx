import { useEffect, useState } from 'react';
import API from '../../services/api';

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await API.get('/auth/users');
                setUsers(data.data || []);
            } catch (err) {
                console.error("Error fetching users", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading Customers...</div>;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Registered <span className="text-primary">Customers</span></h2>

            <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-dark-base text-white uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-6">Name</th>
                            <th className="p-6">Email</th>
                            <th className="p-6">Phone</th>
                            <th className="p-6">Address</th>
                            <th className="p-6">Role</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition">
                                <td className="p-6 font-bold text-dark-base">{user.name}</td>
                                <td className="p-6 text-sm text-gray-500">{user.email}</td>
                                <td className="p-6 text-sm font-mono text-gray-500">{user.phone}</td>
                                <td className="p-6 text-sm text-gray-500 max-w-xs truncate" title={user.address}>{user.address}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                        {user.role}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                        No customers found
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customers;
