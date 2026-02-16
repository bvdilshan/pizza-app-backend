import { ShoppingCart, DollarSign, Clock, Users } from 'lucide-react';

const DashboardStats = ({ data }) => {
    const stats = [
        {
            label: 'Total Revenue',
            value: `LKR ${data?.revenue?.toLocaleString() || '0'}`,
            icon: <DollarSign className="text-white" />,
            bgColor: 'bg-primary',
        },
        {
            label: 'Total Orders',
            value: data?.totalOrders || '0',
            icon: <ShoppingCart className="text-white" />,
            bgColor: 'bg-soft-dark',
        },
        {
            label: 'Pending Orders',
            value: data?.pendingOrders || '0',
            icon: <Clock className="text-white" />,
            bgColor: 'bg-[#FFA500]',
        },
        {
            label: 'Active Users',
            value: data?.activeUsers || '0',
            icon: <Users className="text-white" />,
            bgColor: 'bg-[#F5B700]',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center space-x-4 hover:shadow-md transition-shadow"
                >
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                        {stat.icon}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                            {stat.label}
                        </p>
                        <h3 className="text-2xl font-bold text-dark-base mt-1">
                            {stat.value}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
