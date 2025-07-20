import { SalesRecord, DashboardData, DateRange } from './types';
import salesData from '../sales.json';

export class DataService {
  private salesData: SalesRecord[] = salesData as SalesRecord[];

  // Get unique states
  getStates(): string[] {
    const states = [...new Set(this.salesData.map(record => record.State))];
    return states.sort();
  }

  // Get unique customer IDs
  getCustomerIds(): string[] {
    const customerIds = [...new Set(this.salesData.map(record => record["Customer ID"]))];
    return customerIds.sort();
  }

  // Get date range for a specific state
  getDateRangeForState(state: string): DateRange {
    const stateData = this.salesData.filter(record => record.State === state);
    
    if (stateData.length === 0) {
      return { minDate: '', maxDate: '' };
    }

    const dates = stateData.map(record => new Date(record["Order Date"]));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

    return {
      minDate: minDate.toISOString().split('T')[0],
      maxDate: maxDate.toISOString().split('T')[0]
    };
  }

  // Get date range for a specific customer ID
  getDateRangeForCustomer(customerId: string): DateRange {
    const customerData = this.salesData.filter(record => record["Customer ID"] === customerId);
    
    if (customerData.length === 0) {
      return { minDate: '', maxDate: '' };
    }

    const dates = customerData.map(record => new Date(record["Order Date"]));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

    return {
      minDate: minDate.toISOString().split('T')[0],
      maxDate: maxDate.toISOString().split('T')[0]
    };
  }

  // Get dashboard data for a specific state and date range
  getDashboardData(state: string, fromDate: string, toDate: string, customerId?: string): DashboardData {
    let filteredData = this.salesData.filter(record => {
      const recordDate = new Date(record["Order Date"]);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      
      let matches = recordDate >= from && recordDate <= to;
      
      // Add state filter
      matches = matches && record.State === state;
      
      // Add customer ID filter if provided
      if (customerId) {
        matches = matches && record["Customer ID"] === customerId;
      }
      
      return matches;
    });

    // Calculate KPIs
    const totalSales = filteredData.reduce((sum, record) => sum + record.Sales, 0);
    const quantitySold = filteredData.reduce((sum, record) => sum + record.Quantity, 0);
    const totalDiscount = filteredData.reduce((sum, record) => sum + record.Discount, 0);
    const profit = filteredData.reduce((sum, record) => sum + record.Profit, 0);
    const discountPercentage = totalSales > 0 ? (totalDiscount / totalSales) * 100 : 0;

    // Sales by City
    const citySales = new Map<string, number>();
    filteredData.forEach(record => {
      const current = citySales.get(record.City) || 0;
      citySales.set(record.City, current + record.Sales);
    });
    const salesByCity = Array.from(citySales.entries())
      .map(([city, sales]) => ({ city, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 8); // Top 8 cities

    // Sales by Products
    const productSales = new Map<string, number>();
    filteredData.forEach(record => {
      const current = productSales.get(record["Product Name"]) || 0;
      productSales.set(record["Product Name"], current + record.Sales);
    });
    const salesByProducts = Array.from(productSales.entries())
      .map(([productName, sales]) => ({ productName, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10); // Top 10 products

    // Sales by Category
    const categorySales = new Map<string, number>();
    filteredData.forEach(record => {
      const current = categorySales.get(record.Category) || 0;
      categorySales.set(record.Category, current + record.Sales);
    });
    const salesByCategory = Array.from(categorySales.entries())
      .map(([category, sales]) => ({ category, sales }))
      .sort((a, b) => b.sales - a.sales);

    // Sales by Sub Category
    const subCategorySales = new Map<string, number>();
    filteredData.forEach(record => {
      const current = subCategorySales.get(record["Sub-Category"]) || 0;
      subCategorySales.set(record["Sub-Category"], current + record.Sales);
    });
    const salesBySubCategory = Array.from(subCategorySales.entries())
      .map(([subCategory, sales]) => ({ subCategory, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10); // Top 10 sub categories

    // Sales by Segment
    const segmentSales = new Map<string, number>();
    filteredData.forEach(record => {
      const current = segmentSales.get(record.Segment) || 0;
      segmentSales.set(record.Segment, current + record.Sales);
    });
    const salesBySegment = Array.from(segmentSales.entries())
      .map(([segment, sales]) => ({ segment, sales }))
      .sort((a, b) => b.sales - a.sales);

    return {
      totalSales,
      quantitySold,
      discountPercentage,
      profit,
      salesByCity,
      salesByProducts,
      salesByCategory,
      salesBySubCategory,
      salesBySegment
    };
  }
} 