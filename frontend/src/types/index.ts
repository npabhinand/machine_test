export interface CardContainerProps {
    title: string;
    icon?: React.ReactNode;
    count?: number;
}

export interface PieChartItem {
    name: string;
    value: number;
     [key: string]: string | number;
}

export interface PieChartProps {
    data: PieChartItem[];
}

// Contact related types
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: 'Active' | 'Inactive';
  lastContact: string;
  category: 'Work' | 'Personal' | 'Business' | 'Other';
  address?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactsResponse {
  contacts: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  status?: string;
  category?: string;
}

// Dashboard related types
export interface ActiveContactRs2Type {
  name: string;
  count: number;
}

export interface ActiveContactsDataType {
  rs1: { total: number };
  rs2: ActiveContactRs2Type[];
}

export interface ChartRs1Type {
  date: string;
  searchResults: number;
  listingViews: number;
}

export interface ChartRs2Type {
  property: string;
  value: number;
  searchResultViews?: number;
  listingViews?: number;
}

export interface ChartDataResponseType {
  rs1: ChartRs1Type[];
  rs2: ChartRs2Type[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Form types
export interface ContactFormDataType {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: 'Active' | 'Inactive';
  category: 'Work' | 'Personal' | 'Business' | 'Other';
  lastContact: string;
  address?: string;
  notes?: string;
}

// Filter types
export interface ContactFiltersType {
  search: string;
  status: string;
  category: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// Bulk actions types
export interface BulkActionRequestType {
  ids: number[];
  action: 'delete' | 'export' | 'update-status';
  data?: any;
}


// 
export interface ActiveContactItemType {
  name: string;
  count: number;
}

export interface ActiveContactResponse {
  rs1: { total: number };
  rs2: ActiveContactItemType[];
}

export interface ChartItemType {
  date: string;
  searchResults: number;
  listingViews: number;
}

export interface ListingItemType {
  property: string;
  value: number;
}

export interface ChartResponseType {
  rs1: ChartItemType[];
  rs2: ListingItemType[];
}

export interface PaginationProps{
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    itemsPerPage: number;
    data: {
        total: number;
        contacts: any[];
    } | null;
    totalPages: number;
}

export interface SelectedTabProps{
    value:string;
    setState:(value:string)=>void;
    options:{value:string;label:string}[]
}