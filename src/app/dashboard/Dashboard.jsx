import { TrendingUp, TrendingDown, ShoppingCart, Package, Users, Clock, AlertTriangle, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { LOCAL_URL } from "../../../API_URL";
import Link from "next/link";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  const stats = [
    { title: "Total Revenue", value: "45,231.89", change: "+20.1%", trend: "up", description: "from last month" },
    { title: "Orders", value: "2,350", change: "+180", trend: "up", description: "from yesterday" },
    { title: "Products", value: "12,234", change: "+19%", trend: "up", description: "in stock" },
    { title: "Active Users", value: "573", change: "-2%", trend: "down", description: "from last week" },
  ];

  const lowStockItems = [
    { name: "iPhone 14 Pro", stock: 3, branch: "Main Branch" },
    { name: "Samsung Galaxy S23", stock: 5, branch: "North Branch" },
    { name: "MacBook Air M2", stock: 2, branch: "South Branch" },
    { name: "iPad Pro 11", stock: 4, branch: "East Branch" },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-green-100 text-green-800";
      case "shipped": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-200 text-gray-600";
    }
  };

  // Fetch orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${LOCAL_URL}api/orders`);
        const data = await res.json();

        if (data.orders && Array.isArray(data.orders)) {
          const now = new Date();
          const recentOrders = data.orders.filter(order => {
            const orderTime = new Date(order.createdAt);
            const diffHours = (now - orderTime) / (1000 * 60 * 60);
            return diffHours <= 24;
          });

          setOrders(recentOrders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-sm font-medium">{stat.title}</h3>
            </div>
            <div className="mt-2 text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              {stat.trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
              <span className="ml-1">{stat.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders and Low Stock */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium mb-2">Recent Orders</h3>
          <p className="text-sm text-gray-500 mb-4">Latest orders across all branches</p>
          <div className="space-y-4">
            {orders.length === 0 && <p className="text-gray-500">No orders in the last 24 hours</p>}
            {orders.map((order) => (
              <div key={order._id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg border hover:bg-gray-50 transition space-y-2 md:space-y-0">
                {/* Customer */}
                <div>
                  <p className="font-medium">{order.customer?.name}</p>
                </div>

                {/* Products */}
                <div>
                  {order.items?.map((item) => (
                    <div key={item._id} className="text-sm text-gray-700">
                      {item.productName} (Code: {item.productCode}) x {item.qty} - {item.price}
                    </div>
                  ))}
                </div>

                {/* Status */}
                <div className="text-sm">
                  Status:{" "}
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Time ago */}
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Low Stock Alert
          </h3>
          <p className="text-sm text-gray-500 mb-4">Items running low across branches</p>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg border-l-4 border-yellow-500 bg-yellow-50">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.branch}</p>
                </div>
                <span className="px-2 py-1 border border-yellow-500 rounded text-yellow-700 text-sm">
                  {item.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
        <p className="text-sm text-gray-500 mb-4">Common tasks and shortcuts</p>
        <div className="grid gap-4 md:grid-cols-4">
          <Link href="/add-product">
            <button className="h-20 flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg hover:opacity-90 transition">
              <Package className="mb-2 h-6 w-6" />
              Add Product
            </button>
          </Link>
          <button className="h-20 flex flex-col items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <ShoppingCart className="mb-2 h-6 w-6" />
            New Order
          </button>
          <button className="h-20 flex flex-col items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Users className="mb-2 h-6 w-6" />
            Add User
          </button>
          <button className="h-20 flex flex-col items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <TrendingUp className="mb-2 h-6 w-6" />
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
