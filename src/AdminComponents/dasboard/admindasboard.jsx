// import React, { useEffect, useState } from "react";
// import "../../adminCss/dashboard/adminDashboard.css";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";
// import { Pie, Doughnut, Bar, Line, Area, Radar } from "react-chartjs-2";
// import { Link } from "react-router-dom";


// import { Tooltip, Title, ArcElement, Legend, Chart } from "chart.js";

// Chart.register(Tooltip, Title, ArcElement, Legend);
// function Admindasboard() {
//   const [dasboardData, setDasboardData] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [TotalRevenue, setTotalRevenue] = useState();

//   const getDasboardData = async () => {  
//     try {
//       setLoading(true);

//       const response = await makeApi("/api/get-dashboard", "GET");
//       setDasboardData(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // for sale details
//   const getSaleDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/sale-info?today=true&yesterday=true&thisMonth=true&lastMonth=true&year=true&yearName=2024&date=2024-04-12", "GET");
//       // console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }
//   // for revenu details
//   const getRevenuDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/revenu-info", "GET");
//       console.log(response.data);
//       await setTotalRevenue(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // set data for revenu
//   const revenuChartData = {
//     labels: [
//       "Total Orders",
//       "Total Pending Revenue",
//       "Total Delivered Revenue",
//       "Total Canceled Revenue",
//     ],
//     datasets: [
//       {
//         data: [
//           TotalRevenue?.totalOrders || 0,
//           TotalRevenue?.totalPendingRevenue || 0,
//           TotalRevenue?.totalDeliveredRevenue || 0,
//           TotalRevenue?.totalCanceledRevenue || 0,
//         ],
//         backgroundColor: [
//           "#ffc107",
//           "#17a2b8",
//           "rgb(87, 185, 96)",
//         ],
//         borderColor: [
//           "rgba(255, 206, 86, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(75, 192, 192, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ]
//   }

//   // set data for order
//   const orderChartData = {
//     labels: [
//       "Pending Orders",
//       "Shipped Orders",
//       "Delivered Orders",
//       "Canceled Orders",
//       "Returned Orders",
//     ],
//     datasets: [
//       {
//         data: [
//           dasboardData?.totalPandingOrders || 0,
//           dasboardData?.totalShippedOrders || 0,
//           dasboardData?.totalDeliveredOrders || 0,
//           dasboardData?.totalCanceledOrders || 0,
//           dasboardData?.totalReturnedOrders || 0,
//         ],
//         backgroundColor: [
//           "#ffc107",
//           "#17a2b8",
//           "rgb(87, 185, 96)",
//           "#dc3545",
//           "#6610f2",
//         ],
//         borderColor: [
//           "rgba(255, 206, 86, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(220, 53, 69, 1)",
//           "rgba(102, 16, 242, 1)",
//         ],
//         borderWidth: 1,
//       }
//     ]
//   }

//   // calling data using useEffect
//   useEffect(() => {
//     getDasboardData();
//     getSaleDetails()
//     getRevenuDetails()
//   }, [])
//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="dashboard-container">
//           {/* <div className="dashboard-card">
//             <h2> Users</h2>
//             <p>{dasboardData?.totalUsers}</p>
//           </div> */}
//           <div className="dashboard-card">
//             <h2> Products</h2>
//             <p>{dasboardData?.totalProducts}</p>
//           </div>

//           <div className="dashboard-card">
//             <h2> Orders</h2>
//             <p>{dasboardData?.totalOrders}</p>
//           </div>
//           <div className="dashboard-card">
//             <Link to="/admin/all-orders?status=Pending">
//               <h2> Pending Orders</h2>
//               <p>{dasboardData?.totalPandingOrders}</p>
//             </Link>
//           </div>
//           <div className="dashboard-card">
//             <Link to="/admin/all-orders?status=Shipped">
//               <h2> Shipped Orders</h2>
//               <p>{dasboardData?.totalShippedOrders}</p>
//             </Link>
//           </div>
//           <div className="dashboard-card">
//             <Link to="/admin/all-orders?status=Delivered">
//               <h2> Delivered Orders</h2>
//               <p>{dasboardData?.totalDeliveredOrders}</p>
//             </Link>
//           </div>
//           <div className="dashboard-card">
//             <h2> Canceled Orders</h2>
//             <p>{dasboardData?.totalCanceledOrders}</p>
//           </div>
//           <div className="dashboard-card">
//             <h2> Returned Orders</h2>
//             <p>{dasboardData?.totalReturnedOrders}</p>
//           </div>
//         </div>
//       )}
//       {/* graphs */}
//       <div className="main_admin_all_graph_div" >
//         {/* order */}
//         <div className="main_order_pie_chart_graph">
//           <h2>Order Distribution</h2>
//           <Pie data={orderChartData} />
//         </div>

//         {/* revenu  */}

//       </div>
//       {/* show reveq in bar */}
//     </div>
//   );
// }

// export default Admindasboard;

// import React, { useEffect, useState } from "react";
// import "../../adminCss/dashboard/adminDashboard.css";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";
// import { Pie } from "react-chartjs-2";
// import { Link } from "react-router-dom";
// import { Tooltip, Title, ArcElement, Legend, Chart } from "chart.js";
// import { FaBox, FaShoppingCart, FaShippingFast, FaCheckCircle, FaTimesCircle, FaRedo } from "react-icons/fa"; 

// Chart.register(Tooltip, Title, ArcElement, Legend);

// function Admindasboard() {
//   const [dashboardData, setDashboardData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [totalRevenue, setTotalRevenue] = useState({});

//   useEffect(() => {
//     getDashboardData();
//     getSaleDetails();
//     getRevenueDetails();
//   }, []);

//   const getDashboardData = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/get-dashboard", "GET");
//       setDashboardData(response.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getSaleDetails = async () => {
//     try {
//       setLoading(true);
//       await makeApi("/api/sale-info?today=true&yesterday=true&thisMonth=true&lastMonth=true&year=true&yearName=2024&date=2024-04-12", "GET");
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getRevenueDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/revenu-info", "GET");
//       setTotalRevenue(response.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const orderChartData = {
//     labels: ["Pending", "Shipped", "Delivered", "Canceled", "Returned"],
//     datasets: [
//       {
//         data: [
//           dashboardData?.totalPandingOrders || 0,
//           dashboardData?.totalShippedOrders || 0,
//           dashboardData?.totalDeliveredOrders || 0,
//           dashboardData?.totalCanceledOrders || 0,
//           dashboardData?.totalReturnedOrders || 0,
//         ],
//         backgroundColor: ["#ffc107", "#17a2b8", "rgb(87, 185, 96)", "#dc3545", "#6610f2"],
//         borderColor: ["rgba(255, 206, 86, 1)", "rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)", "rgba(220, 53, 69, 1)", "rgba(102, 16, 242, 1)"],
//         borderWidth: 1,
//       }
//     ]
//   };

//   return (
//     <div className="admin-dashboard">
//       {loading ? <Loader /> : (
//         <div className="dashboard-grid">
//           <div className="dashboard-card">
//             <FaBox className="dashboard-icon" />
//             <h2>Products</h2>
//             <p>{dashboardData?.totalProducts}</p>
//           </div>

//           <div className="dashboard-card">
//             <FaShoppingCart className="dashboard-icon" />
//             <h2>Total Orders</h2>
//             <p>{dashboardData?.totalOrders}</p>
//           </div>

//           <Link to="/admin/all-orders?status=NEW" className="dashboard-card link">
//             <FaShippingFast className="dashboard-icon" />
//             <h2>Pending Orders</h2>
//             <p>{dashboardData?.totalPandingOrders}</p>
//           </Link>

//           <Link to="/admin/all-orders?status=Shipped" className="dashboard-card link">
//             <FaShippingFast className="dashboard-icon" />
//             <h2>Shipped Orders</h2>
//             <p>{dashboardData?.totalShippedOrders}</p>
//           </Link>

//           <Link to="/admin/all-orders?status=Delivered" className="dashboard-card link">
//             <FaCheckCircle className="dashboard-icon" />
//             <h2>Delivered Orders</h2>
//             <p>{dashboardData?.totalDeliveredOrders}</p>
//           </Link>
          
//           <div className="dashboard-card">
//           <Link to="/admin/all-orders?status=CANCELED" className="dashboard-card link">

//             <FaTimesCircle className="dashboard-icon" />
//             <h2>Canceled Orders</h2>
//             <p>{dashboardData?.totalCanceledOrders}</p>
//           </Link>

//           </div>

//           <div className="dashboard-card">
//             <FaRedo className="dashboard-icon" />
//             <h2>Returned Orders</h2>
//             <p>{dashboardData?.totalReturnedOrders}</p>
//           </div>
//         </div>
//       )}

//       {/* Order Chart Section */}
//       {/* <div className="chart-container">
//         <h2>Order Distribution</h2>
//         <Pie data={orderChartData} />
//       </div> */}
//     </div>
//   );
// }

// export default Admindasboard;

import React, { useEffect, useState } from "react";
import "../../adminCss/dashboard/adminDashboard.css";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Tooltip, Title, ArcElement, Legend, Chart } from "chart.js";
import { FaBox, FaShoppingCart, FaShippingFast, FaCheckCircle, FaTimesCircle, FaRedo } from "react-icons/fa";

Chart.register(Tooltip, Title, ArcElement, Legend);

function Admindasboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState({});

  useEffect(() => {
    getDashboardData();
    getSaleDetails();
    getRevenueDetails();
  }, []);

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const response = await makeApi("/api/get-dashboard", "GET");
      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSaleDetails = async () => {
    try {
      setLoading(true);
      await makeApi("/api/sale-info?today=true&yesterday=true&thisMonth=true&lastMonth=true&year=true&yearName=2024&date=2024-04-12", "GET");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRevenueDetails = async () => {
    try {
      setLoading(true);
      const response = await makeApi("/api/revenu-info", "GET");
      setTotalRevenue(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const orderChartData = {
    labels: ["Pending", "Shipped", "Delivered", "Canceled", "Returned"],
    datasets: [
      {
        data: [
          dashboardData?.totalPandingOrders || 0,
          dashboardData?.totalShippedOrders || 0,
          dashboardData?.totalDeliveredOrders || 0,
          dashboardData?.totalCanceledOrders || 0,
          dashboardData?.totalReturnedOrders || 0,
        ],
        backgroundColor: ["#ffc107", "#17a2b8", "rgb(87, 185, 96)", "#dc3545", "#6610f2"],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)", "rgba(220, 53, 69, 1)", "rgba(102, 16, 242, 1)"],
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="admin-dashboard">
      {loading ? <Loader /> : (
        <div className="dashboard-grid">
          {/* Existing Cards */}
          <div className="dashboard-card">
            <FaBox className="dashboard-icon" />
            <h2>Products</h2>
            <p>{dashboardData?.totalProducts}</p>
          </div>

          {/* <div className="dashboard-card">
            <FaShoppingCart className="dashboard-icon" />
            <h2>Total Orders</h2>
            <p>{dashboardData?.totalOrders}</p>
          </div> */}

          {/* <Link to="/admin/all-orders?status=NEW" className="dashboard-card link">
            <FaShippingFast className="dashboard-icon" />
            <h2>Pending Orders</h2>
            <p>{dashboardData?.totalPandingOrders}</p>
          </Link> */}

          {/* <Link to="/admin/all-orders?status=Shipped" className="dashboard-card link">
            <FaShippingFast className="dashboard-icon" />
            <h2>Shipped Orders</h2>
            <p>{dashboardData?.totalShippedOrders}</p>
          </Link> */}
{/* 
          <Link to="/admin/all-orders?status=Delivered" className="dashboard-card link">
            <FaCheckCircle className="dashboard-icon" />
            <h2>Delivered Orders</h2>
            <p>{dashboardData?.totalDeliveredOrders}</p>
          </Link> */}

          {/* <div className="dashboard-card">
            <Link to="/admin/all-orders?status=CANCELED" className="dashboard-card link">
              <FaTimesCircle className="dashboard-icon" />
              <h2>Canceled Orders</h2>
              <p>{dashboardData?.totalCanceledOrders}</p>
            </Link>
          </div> */}

          <div className="dashboard-card">
            <FaRedo className="dashboard-icon" />
            <h2>Returned Orders</h2>
            <p>{dashboardData?.totalReturnedOrders}</p>
          </div>

          {/* New Cards for Shiprocket Data */}
          <div className="dashboard-card">
          <Link to="/admin/all-orders?status=NEW" className="dashboard-card link">

            <FaShippingFast className="dashboard-icon" />
            <h2>Shiprocket New Orders</h2>
            <p>{dashboardData?.shiprocketNewOrders || 0}</p>
            </Link>
          </div>

          <div className="dashboard-card">
          <Link to="/admin/all-orders?status=CANCELED" className="dashboard-card link">

            <FaTimesCircle className="dashboard-icon" />
            <h2>Shiprocket Canceled Orders</h2>
            <p>{dashboardData?.shiprocketCanceledOrders || 0}</p>
            </Link>
          </div>

          <div className="dashboard-card">
          <Link to="/admin/all-orders?status=Delivered" className="dashboard-card link">

            <FaCheckCircle className="dashboard-icon" />
            <h2>Shiprocket Delivered Orders</h2>
            <p>{dashboardData?.shiprocketDeliveredOrders || 0}</p>
            </Link>
          </div>

          <div className="dashboard-card">
            <FaShippingFast className="dashboard-icon" />
            <h2>Shiprocket Shipped Orders</h2>
            <p>{dashboardData?.shiprocketShippedOrders || 0}</p>
          </div>
        </div>
      )}

      {/* Order Chart Section */}
      {/* <div className="chart-container">
        <h2>Order Distribution</h2>
        <Pie data={orderChartData} />
      </div> */}
    </div>
  );
}

export default Admindasboard;