export interface Dispute {
  id: string;
  orderId: string;
  farmer: string;
  buyer: string;
  reason: string;
  status: 'Open' | 'Under Review' | 'Resolved';
  date: string;
}

export interface VerificationRequest {
  id: string;
  farmer: string;
  location: string;
  crops: string[];
  status: 'Pending' | 'Approved' | 'Rejected';
  dateSubmitted: string;
}

export const mockDisputes: Dispute[] = [
  { id: 'D-8910', orderId: 'ORD-551', farmer: 'Kato Farms', buyer: 'FreshMart', reason: 'Quality not as described', status: 'Open', date: 'Oct 24, 2023' },
  { id: 'D-8911', orderId: 'ORD-552', farmer: 'Ssenyonga Ag', buyer: 'City Grocers', reason: 'Late delivery', status: 'Under Review', date: 'Oct 23, 2023' },
  { id: 'D-8902', orderId: 'ORD-540', farmer: 'Lwanga Co-op', buyer: 'Metro Foods', reason: 'Short weight', status: 'Resolved', date: 'Oct 20, 2023' }
];

export const mockVerifications: VerificationRequest[] = [
  { id: 'V-1029', farmer: 'Nalweyiso Jane', location: 'Masaka', crops: ['Coffee', 'Bananas'], status: 'Pending', dateSubmitted: 'Oct 25, 2023' },
  { id: 'V-1030', farmer: 'Mukasa Peter', location: 'Mbale', crops: ['Maize', 'Beans'], status: 'Pending', dateSubmitted: 'Oct 24, 2023' },
  { id: 'V-1031', farmer: 'Ouma John', location: 'Gulu', crops: ['Cassava', 'Groundnuts'], status: 'Pending', dateSubmitted: 'Oct 23, 2023' }
];

export const platformStats = {
  totalFarmers: 1245,
  activeOrders: 342,
  openDisputes: 12,
  pendingVerifications: 45
};
