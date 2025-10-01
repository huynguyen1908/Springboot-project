import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js'; // Thêm dòng này
import { BaseChartDirective } from 'ng2-charts';
import {CommonModule, NgClass} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    BaseChartDirective,
    NgClass,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    { title: 'Total Orders', value: '$126.500', percentage: '34.7%', icon: 'fas fa-box-open' },
    { title: 'Active Orders', value: '$126.500', percentage: '34.7%', icon: 'fas fa-clock' },
    { title: 'Shipped Orders', value: '$126.500', percentage: '34.7%', icon: 'fas fa-truck' }
  ];

  // Dữ liệu và cấu hình cho biểu đồ
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [100, 150, 120, 180, 250, 400],
        label: 'Sales',
        backgroundColor: 'rgba(93, 93, 255, 0.2)',
        borderColor: '#5d5dff',
        pointBackgroundColor: '#5d5dff',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4
      }
    },
    scales: {
      x: {},
      y: {
        min: 0,
        max: 400
      }
    }
  };

  public lineChartType: ChartType = 'line';

  // Dữ liệu cho sản phẩm bán chạy nhất
  bestSellers = [
    { name: 'Adidas Ultra boost', price: '$126.500', sales: '999 sales', image: 'path/to/shoe1.png' },
    { name: 'Adidas Ultra boost', price: '$126.500', sales: '999 sales', image: 'path/to/shoe2.png' },
    { name: 'Adidas Ultra boost', price: '$126.500', sales: '999 sales', image: 'path/to/shoe3.png' }
  ];

  // Dữ liệu cho đơn hàng gần đây
  recentOrders = [
    { orderID: '#25426', date: 'Jan 8th,2022', customerName: 'Leo Gouse', status: 'Delivered', amount: '$200.00', customerImage: 'path/to/avatar1.png' },
    { orderID: '#25425', date: 'Jan 7th,2022', customerName: 'Jaxson Korsgaard', status: 'Canceled', amount: '$200.00', customerImage: 'path/to/avatar2.png' },
    { orderID: '#25424', date: 'Jan 6th,2022', customerName: 'Talan Botosh', status: 'Delivered', amount: '$200.00', customerImage: 'path/to/avatar3.png' },
    { orderID: '#25423', date: 'Jan 5th,2022', customerName: 'Ryan Philips', status: 'Canceled', amount: '$200.00', customerImage: 'path/to/avatar4.png' },
    { orderID: '#25422', date: 'Jan 4th,2022', customerName: 'Emerson Baptista', status: 'Delivered', amount: '$200.00', customerImage: 'path/to/avatar5.png' },
    { orderID: '#25421', date: 'Jan 2th,2022', customerName: 'Jaxson Calzoni', status: 'Delivered', amount: '$200.00', customerImage: 'path/to/avatar6.png' }
  ];

  constructor() { }

  ngOnInit(): void { }

  getStatusClass(status: string) {
    if (status === 'Delivered') {
      return 'status-delivered';
    }
    if (status === 'Canceled') {
      return 'status-canceled';
    }
    return '';
  }
}
