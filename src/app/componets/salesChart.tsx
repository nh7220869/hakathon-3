'use client'; // Client-side component

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null); // To store the chart instance

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create new chart instance
        chartInstance.current = new Chart(ctx, {
          type: 'bar', // Bar graph
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // X-axis labels
            datasets: [
              {
                label: 'Sales', // Dataset label
                data: [1000, 1500, 1200, 1800, 2000], // Y-axis data
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)', // Border color
                borderWidth: 1, // Border width
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true, // Y-axis starts from 0
              },
            },
          },
        });
      }
    }

    // Cleanup function to destroy chart instance on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} className="w-full h-64"></canvas>;
};

export default SalesChart;