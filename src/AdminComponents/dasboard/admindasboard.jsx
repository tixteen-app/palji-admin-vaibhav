import React, { useEffect, useState } from "react";
import "../../adminCss/dashboard/adminDashboard.css";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import { Pie, Doughnut, Bar, Line, Area, Radar } from "react-chartjs-2";
import { Link } from "react-router-dom";


import { Tooltip, Title, ArcElement, Legend, Chart } from "chart.js";

Chart.register(Tooltip, Title, ArcElement, Legend);
function Admindasboard() {
  const [dasboardData, setDasboardData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [TotalRevenue, setTotalRevenue] = useState();

  const getDasboardData = async () => {  
    try {
      setLoading(true);

      const response = await makeApi("/api/get-dashboard", "GET");
      setDasboardData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // for sale details
  const getSaleDetails = async () => {
    try {
      setLoading(true);
      const response = await makeApi("/api/sale-info?today=true&yesterday=true&thisMonth=true&lastMonth=true&year=true&yearName=2024&date=2024-04-12", "GET");
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // for revenu details
  const getRevenuDetails = async () => {
    try {
      setLoading(true);
      const response = await makeApi("/api/revenu-info", "GET");
      console.log(response.data);
      await setTotalRevenue(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // set data for revenu
  const revenuChartData = {
    labels: [
      "Total Orders",
      "Total Pending Revenue",
      "Total Delivered Revenue",
      "Total Canceled Revenue",
    ],
    datasets: [
      {
        data: [
          TotalRevenue?.totalOrders || 0,
          TotalRevenue?.totalPendingRevenue || 0,
          TotalRevenue?.totalDeliveredRevenue || 0,
          TotalRevenue?.totalCanceledRevenue || 0,
        ],
        backgroundColor: [
          "#ffc107",
          "#17a2b8",
          "rgb(87, 185, 96)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ]
  }

  // set data for order
  const orderChartData = {
    labels: [
      "Pending Orders",
      "Shipped Orders",
      "Delivered Orders",
      "Canceled Orders",
      "Returned Orders",
    ],
    datasets: [
      {
        data: [
          dasboardData?.totalPandingOrders || 0,
          dasboardData?.totalShippedOrders || 0,
          dasboardData?.totalDeliveredOrders || 0,
          dasboardData?.totalCanceledOrders || 0,
          dasboardData?.totalReturnedOrders || 0,
        ],
        backgroundColor: [
          "#ffc107",
          "#17a2b8",
          "rgb(87, 185, 96)",
          "#dc3545",
          "#6610f2",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(220, 53, 69, 1)",
          "rgba(102, 16, 242, 1)",
        ],
        borderWidth: 1,
      }
    ]
  }

  // calling data using useEffect
  useEffect(() => {
    getDasboardData();
    getSaleDetails()
    getRevenuDetails()
  }, [])
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard-container">
          {/* <div className="dashboard-card">
            <h2> Users</h2>
            <p>{dasboardData?.totalUsers}</p>
          </div> */}
          <div className="dashboard-card">
            <h2> Products</h2>
            <p>{dasboardData?.totalProducts}</p>
          </div>

          <div className="dashboard-card">
            <h2> Orders</h2>
            <p>{dasboardData?.totalOrders}</p>
          </div>
          <div className="dashboard-card">
            <Link to="/admin/all-orders?status=Pending">
              <h2> Pending Orders</h2>
              <p>{dasboardData?.totalPandingOrders}</p>
            </Link>
          </div>
          <div className="dashboard-card">
            <Link to="/admin/all-orders?status=Shipped">
              <h2> Shipped Orders</h2>
              <p>{dasboardData?.totalShippedOrders}</p>
            </Link>
          </div>
          <div className="dashboard-card">
            <Link to="/admin/all-orders?status=Delivered">
              <h2> Delivered Orders</h2>
              <p>{dasboardData?.totalDeliveredOrders}</p>
            </Link>
          </div>
          <div className="dashboard-card">
            <h2> Canceled Orders</h2>
            <p>{dasboardData?.totalCanceledOrders}</p>
          </div>
          <div className="dashboard-card">
            <h2> Returned Orders</h2>
            <p>{dasboardData?.totalReturnedOrders}</p>
          </div>
        </div>
      )}
      {/* graphs */}
      <div className="main_admin_all_graph_div" >
        {/* order */}
        <div className="main_order_pie_chart_graph">
          <h2>Order Distribution</h2>
          <Pie data={orderChartData} />
        </div>

        {/* revenu  */}

      </div>
      {/* show reveq in bar */}
    </div>
  );
}

export default Admindasboard;
