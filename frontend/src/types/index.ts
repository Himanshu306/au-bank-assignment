export interface DashboardData {
  totalSales: number;
  quantitySold: number;
  discountPercentage: number;
  profit: number;
  salesByCity: Array<{ city: string; sales: number }>;
  salesByProducts: Array<{ productName: string; sales: number }>;
  salesByCategory: Array<{ category: string; sales: number }>;
  salesBySubCategory: Array<{ subCategory: string; sales: number }>;
  salesBySegment: Array<{ segment: string; sales: number }>;
}

export interface DateRange {
  minDate: string;
  maxDate: string;
}

export interface Theme {
  mode: 'light' | 'dark';
} 