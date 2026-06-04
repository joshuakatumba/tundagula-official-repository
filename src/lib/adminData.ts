// ─── DASHBOARD DATA ───

export const dashboardStats = [
  { label: 'Total Farmers', value: '284', delta: '+12 this month', deltaType: 'up' as const, color: 'blue' as const },
  { label: 'Restaurants', value: '91', delta: '+8 this month', deltaType: 'up' as const, color: 'green' as const },
  { label: 'Orders (Apr)', value: '347', delta: '↑ 23% vs Mar', deltaType: 'up' as const, color: 'amber' as const },
  { label: 'GMV (Apr)', value: '74.2M', delta: 'UGX · ↑ 31%', deltaType: 'up' as const, color: 'purple' as const },
  { label: 'Platform Revenue', value: '2.83M', delta: 'UGX · fees + subs', deltaType: 'up' as const, color: 'green' as const },
];

export const orderVolumeChart = [
  { height: '35%', type: 'dim' as const },
  { height: '45%', type: 'dim' as const },
  { height: '40%', type: 'dim' as const },
  { height: '55%', type: 'dim' as const },
  { height: '50%', type: 'dim' as const },
  { height: '60%', type: 'dim' as const },
  { height: '58%', type: 'dim' as const },
  { height: '70%', type: 'dim' as const },
  { height: '68%', type: 'dim' as const },
  { height: '75%', type: 'accent' as const },
  { height: '88%', type: 'accent' as const },
  { height: '95%', type: 'accent' as const },
];

export const orderVolumeMetrics = [
  { label: 'COMPLETION RATE', value: '96.2%', color: 'var(--green)' },
  { label: 'AVG ORDER VALUE', value: '214K UGX', color: 'var(--accent)' },
  { label: 'DISPUTE RATE', value: '1.4%', color: 'var(--amber)' },
  { label: 'ON-TIME DELIVERY', value: '91.8%', color: 'var(--green)' },
];

export const platformHealth = [
  { label: 'Escrow Success', value: '98.6%', color: 'green' as const, barWidth: '98.6%' },
  { label: 'Farmer Uptime', value: '94.1%', color: 'green' as const, barWidth: '94%' },
  { label: 'Dispute Rate', value: '1.4%', color: 'amber' as const, barWidth: '14%' },
  { label: 'Verification Lag', value: '38hrs', color: 'amber' as const, barWidth: '55%' },
  { label: 'Payment Success', value: '99.1%', color: 'green' as const, barWidth: '99%' },
  { label: 'Churn (30d)', value: '2.3%', color: 'green' as const, barWidth: '23%' },
];

export const recentOrders = [
  { id: '#AGC-847', restaurant: 'Kati Kati', farmer: 'Kato Joseph', value: '221K', status: 'CONFIRMED', badgeColor: 'blue' as const },
  { id: '#AGC-846', restaurant: 'Serena Hotel', farmer: 'B. Moses', value: '340K', status: 'TRANSIT', badgeColor: 'amber' as const },
  { id: '#AGC-845', restaurant: 'Café Javas', farmer: 'A. Nancy', value: '65K', status: 'DELIVERED', badgeColor: 'green' as const },
  { id: '#AGC-844', restaurant: 'Mamba Point', farmer: 'N. Ketty', value: '480K', status: 'DELIVERED', badgeColor: 'green' as const },
  { id: '#AGC-843', restaurant: 'The Lawns', farmer: 'O. James', value: '112K', status: 'DISPUTE', badgeColor: 'red' as const },
  { id: '#AGC-842', restaurant: 'Fang Fang', farmer: 'A. Christine', value: '180K', status: 'DELIVERED', badgeColor: 'green' as const },
];

export const verifyQueueMini = [
  { initials: 'RK', name: 'Rugaba Kenneth', meta: 'Mbarara · Dairy' },
  { initials: 'AM', name: 'Atim Margaret', meta: 'Gulu · Mixed' },
  { initials: 'OK', name: 'Opio Kenneth', meta: 'Lira · Fruits' },
];

export const geoDistribution = [
  { label: 'Wakiso', width: '85%', count: '68', barBg: undefined },
  { label: 'Kayunga', width: '60%', count: '48', barBg: undefined },
  { label: 'Mbarara', width: '50%', count: '40', barBg: undefined },
  { label: 'Luwero', width: '40%', count: '32', barBg: undefined },
  { label: 'Mukono', width: '30%', count: '24', barBg: undefined },
  { label: 'Other', width: '90%', count: '72', barBg: 'var(--border-light)' },
];

export const activityLog = [
  { dotColor: 'green' as const, html: '<strong>Kati Kati Restaurant</strong> placed order #AGC-847 — UGX 221,000', time: '2 min ago' },
  { dotColor: 'blue' as const, html: '<strong>Rugaba Kenneth</strong> submitted farm registration (Mbarara, Dairy)', time: '14 min ago' },
  { dotColor: 'amber' as const, html: 'Dispute #D-019 opened — <strong>The Lawns</strong> vs <strong>Otim James</strong> (quality issue)', time: '38 min ago' },
  { dotColor: 'green' as const, html: 'Escrow released: UGX 340,000 → <strong>Byamukama Moses</strong> (order #AGC-846)', time: '1 hr ago' },
  { dotColor: 'green' as const, html: '<strong>Café Javas</strong> confirmed delivery #AGC-845 — rated farmer 5★', time: '2 hr ago' },
  { dotColor: 'blue' as const, html: '<strong>Atim Margaret</strong> submitted farm registration (Gulu, Mixed produce)', time: '3 hr ago' },
  { dotColor: 'red' as const, html: 'MTN MoMo payment retry failed — order #AGC-838. Manual review needed.', time: '4 hr ago' },
  { dotColor: 'green' as const, html: '<strong>Serena Hotel</strong> upgraded to Premium Plan — UGX 360,000 collected', time: '5 hr ago' },
];


// ─── VERIFICATION PAGE DATA ───

export const verificationStats = [
  { label: 'Pending Review', value: '5', valueColor: 'amber' as const, sub: 'avg wait: 38hrs' },
  { label: 'Approved (Apr)', value: '23', valueColor: 'green' as const, sub: 'avg time: 28hrs' },
  { label: 'Rejected (Apr)', value: '4', valueColor: 'red' as const, sub: 'mostly docs missing' },
  { label: 'Total Verified', value: '218', valueColor: 'blue' as const, sub: 'on platform' },
];

export const verificationFilterTabs = ['All (5)', 'Pending (3)', 'Needs Info (2)', 'Approved', 'Rejected'];

export const sortOptions = ['Sort: Oldest first', 'Sort: Newest first', 'Sort: District'];

export interface FarmerDoc {
  icon: string;
  label: string;
  missing?: boolean;
}

export interface FarmerCard {
  id: string;
  initials: string;
  name: string;
  contact: string;
  email: string;
  status: string;
  statusColor: 'amber' | 'blue' | 'green' | 'red';
  submitted: string;
  district: string;
  farmType: string;
  farmSize: string;
  plan: string;
  docs: FarmerDoc[];
}

export const farmerCards: FarmerCard[] = [
  {
    id: 'RK',
    initials: 'RK',
    name: 'Rugaba Kenneth',
    contact: '+256 77X XXX XXX',
    email: 'rugaba.k@gmail.com',
    status: 'PENDING',
    statusColor: 'amber',
    submitted: 'Submitted 38hrs ago',
    district: 'Mbarara',
    farmType: 'Dairy',
    farmSize: '8 acres',
    plan: 'Standard',
    docs: [
      { icon: '📄', label: 'National ID' },
      { icon: '📋', label: 'Land Title' },
      { icon: '🥛', label: 'Dairy Permit' },
      { icon: '⚠️', label: 'UNBS Cert — missing', missing: true },
    ],
  },
  {
    id: 'AM',
    initials: 'AM',
    name: 'Atim Margaret',
    contact: '+256 75X XXX XXX',
    email: 'atim.m@yahoo.com',
    status: 'PENDING',
    statusColor: 'amber',
    submitted: 'Submitted 52hrs ago',
    district: 'Gulu',
    farmType: 'Mixed',
    farmSize: '15 acres',
    plan: 'Starter',
    docs: [
      { icon: '📄', label: 'National ID' },
      { icon: '📋', label: 'Land Title' },
      { icon: '⚠️', label: 'Farm Photo — missing', missing: true },
    ],
  },
  {
    id: 'OK',
    initials: 'OK',
    name: 'Opio Kenneth',
    contact: '+256 70X XXX XXX',
    email: 'opio.k@gmail.com',
    status: 'NEEDS INFO',
    statusColor: 'blue',
    submitted: 'Submitted 71hrs ago',
    district: 'Lira',
    farmType: 'Fruits',
    farmSize: '5 acres',
    plan: 'Standard',
    docs: [
      { icon: '📄', label: 'National ID' },
      { icon: '⚠️', label: 'Land Title — missing', missing: true },
      { icon: '⚠️', label: 'GPS Pin — not set', missing: true },
    ],
  },
  {
    id: 'NB',
    initials: 'NB',
    name: 'Nakato Beatrice',
    contact: '+256 78X XXX XXX',
    email: 'nakato.b@gmail.com',
    status: 'PENDING',
    statusColor: 'amber',
    submitted: 'Submitted 14hrs ago',
    district: 'Wakiso',
    farmType: 'Poultry',
    farmSize: '2 acres',
    plan: 'Standard',
    docs: [
      { icon: '📄', label: 'National ID' },
      { icon: '📋', label: 'Land Title' },
      { icon: '🐓', label: 'Poultry Permit' },
    ],
  },
];

export interface DetailPanelData {
  name: string;
  subtitle: string;
  fields: { key: string; value: string; mono?: boolean; badge?: boolean; badgeColor?: string }[];
  checklist: { icon: 'pass' | 'fail' | 'warn'; iconChar: string; label: string }[];
}

export const farmerDetailPanels: Record<string, DetailPanelData> = {
  RK: {
    name: 'Rugaba Kenneth',
    subtitle: 'Rugaba Kenneth · Mbarara Dairy Farm',
    fields: [
      { key: 'Full Name', value: 'Rugaba Kenneth' },
      { key: 'Phone', value: '+256 77X XXX XXX', mono: true },
      { key: 'District', value: 'Mbarara' },
      { key: 'Sub-county', value: 'Rwanyamahembe' },
      { key: 'Farm Size', value: '8 acres' },
      { key: 'Produce', value: 'Milk, Yoghurt, Ghee' },
      { key: 'Years Farming', value: '14 years' },
      { key: 'Plan', value: 'STANDARD', badge: true, badgeColor: 'blue' },
    ],
    checklist: [
      { icon: 'pass', iconChar: '✓', label: '<strong>National ID</strong> — uploaded & valid' },
      { icon: 'pass', iconChar: '✓', label: '<strong>Land Title</strong> — uploaded & verified' },
      { icon: 'pass', iconChar: '✓', label: '<strong>Dairy Permit</strong> — valid, expires Dec 2026' },
      { icon: 'pass', iconChar: '✓', label: '<strong>GPS Pin</strong> — set on map' },
      { icon: 'pass', iconChar: '✓', label: '<strong>Farm Photo</strong> — uploaded' },
      { icon: 'fail', iconChar: '✗', label: '<strong>UNBS Certificate</strong> — not uploaded' },
      { icon: 'warn', iconChar: '!', label: '<strong>Bio/Story</strong> — very short (12 words)' },
    ],
  },
  AM: {
    name: 'Atim Margaret',
    subtitle: 'Atim Margaret · Gulu Mixed Farm',
    fields: [
      { key: 'Full Name', value: 'Atim Margaret' },
      { key: 'Phone', value: '+256 75X XXX XXX', mono: true },
      { key: 'District', value: 'Gulu' },
      { key: 'Sub-county', value: 'Laroo' },
      { key: 'Farm Size', value: '15 acres' },
      { key: 'Produce', value: 'Cassava, Groundnuts, Sesame' },
      { key: 'Years Farming', value: '8 years' },
      { key: 'Plan', value: 'STARTER', badge: true, badgeColor: 'gray' },
    ],
    checklist: [
      { icon: 'pass', iconChar: '✓', label: '<strong>National ID</strong> — uploaded & valid' },
      { icon: 'pass', iconChar: '✓', label: '<strong>Land Title</strong> — uploaded & verified' },
      { icon: 'fail', iconChar: '✗', label: '<strong>Farm Photo</strong> — not uploaded' },
      { icon: 'pass', iconChar: '✓', label: '<strong>GPS Pin</strong> — set on map' },
    ],
  },
  OK: {
    name: 'Opio Kenneth',
    subtitle: 'Opio Kenneth · Lira Fruits Farm',
    fields: [
      { key: 'Full Name', value: 'Opio Kenneth' },
      { key: 'Phone', value: '+256 70X XXX XXX', mono: true },
      { key: 'District', value: 'Lira' },
      { key: 'Sub-county', value: 'Adekokwok' },
      { key: 'Farm Size', value: '5 acres' },
      { key: 'Produce', value: 'Oranges, Mangoes, Avocado' },
      { key: 'Years Farming', value: '6 years' },
      { key: 'Plan', value: 'STANDARD', badge: true, badgeColor: 'blue' },
    ],
    checklist: [
      { icon: 'pass', iconChar: '✓', label: '<strong>National ID</strong> — uploaded & valid' },
      { icon: 'fail', iconChar: '✗', label: '<strong>Land Title</strong> — not uploaded' },
      { icon: 'fail', iconChar: '✗', label: '<strong>GPS Pin</strong> — not set' },
    ],
  },
  NB: {
    name: 'Nakato Beatrice',
    subtitle: 'Nakato Beatrice · Wakiso Poultry Farm',
    fields: [
      { key: 'Full Name', value: 'Nakato Beatrice' },
      { key: 'Phone', value: '+256 78X XXX XXX', mono: true },
      { key: 'District', value: 'Wakiso' },
      { key: 'Sub-county', value: 'Nsangi' },
      { key: 'Farm Size', value: '2 acres' },
      { key: 'Produce', value: 'Chicken, Eggs' },
      { key: 'Years Farming', value: '3 years' },
      { key: 'Plan', value: 'STANDARD', badge: true, badgeColor: 'blue' },
    ],
    checklist: [
      { icon: 'pass', iconChar: '✓', label: '<strong>National ID</strong> — uploaded & valid' },
      { icon: 'pass', iconChar: '✓', label: '<strong>Land Title</strong> — uploaded & verified' },
      { icon: 'pass', iconChar: '✓', label: '<strong>Poultry Permit</strong> — valid' },
      { icon: 'pass', iconChar: '✓', label: '<strong>GPS Pin</strong> — set on map' },
      { icon: 'pass', iconChar: '✓', label: '<strong>Farm Photo</strong> — uploaded' },
    ],
  },
};


// ─── ANALYTICS PAGE DATA ───

export const analyticsKPIs = [
  { label: 'GMV (Apr)', value: '74.2M', delta: '↑ 31% vs Mar', deltaType: 'up' as const },
  { label: 'Platform Revenue', value: '2.83M', delta: '↑ 28%', deltaType: 'up' as const },
  { label: 'Active Farmers', value: '218', delta: '+12 this month', deltaType: 'up' as const },
  { label: 'Active Restaurants', value: '91', delta: '+8 this month', deltaType: 'up' as const },
  { label: 'Order Count', value: '347', delta: '↑ 23%', deltaType: 'up' as const },
];

export const gmvByMonth = [
  { month: 'Oct', value: '18M', height: '28%', type: 'dim' as const },
  { month: 'Nov', value: '22M', height: '34%', type: 'dim' as const },
  { month: 'Dec', value: '26M', height: '40%', type: 'dim' as const },
  { month: 'Jan', value: '30M', height: '45%', type: 'dim' as const },
  { month: 'Feb', value: '36M', height: '55%', type: 'dim' as const },
  { month: 'Mar', value: '56M', height: '85%', type: 'dim' as const },
  { month: 'Apr', value: '74M', height: '100%', type: 'accent' as const },
];

export const produceBreakdown = [
  { icon: '🍍', label: 'Fruits', pct: '42%', width: '42%', color: 'var(--accent)' },
  { icon: '🥬', label: 'Vegetables', pct: '28%', width: '28%', color: 'var(--green)' },
  { icon: '🥛', label: 'Dairy', pct: '15%', width: '15%', color: 'var(--amber)' },
  { icon: '🥩', label: 'Meat', pct: '10%', width: '10%', color: 'var(--red)' },
  { icon: '🐓', label: 'Poultry', pct: '5%', width: '5%', color: 'var(--purple)' },
];

export const topDistrictsByOrders = [
  { label: 'Wakiso', count: '138', width: '75%' },
  { label: 'Kayunga', count: '95', width: '52%' },
  { label: 'Mbarara', count: '70', width: '38%' },
  { label: 'Luwero', count: '44', width: '24%' },
];

export const topFarmers = [
  { rank: '01', rankColor: 'var(--amber)', name: 'Kato Joseph', district: 'Kayunga', category: 'Fruits', orders: '47', gmv: '9.8M', rating: '4.9★', status: 'ACTIVE' },
  { rank: '02', rankColor: 'var(--amber)', name: 'Byamukama Moses', district: 'Mbarara', category: 'Dairy', orders: '62', gmv: '8.4M', rating: '4.6★', status: 'ACTIVE' },
  { rank: '03', rankColor: 'var(--amber)', name: 'Nakato Ketty', district: 'Luwero', category: 'Meat', orders: '31', gmv: '7.1M', rating: '4.7★', status: 'ACTIVE' },
  { rank: '04', rankColor: 'var(--text-muted)', name: 'Apio Christine', district: 'Wakiso', category: 'Poultry', orders: '55', gmv: '6.6M', rating: '4.9★', status: 'ACTIVE' },
  { rank: '05', rankColor: 'var(--text-muted)', name: 'Akello Nancy', district: 'Wakiso', category: 'Vegetables', orders: '38', gmv: '4.2M', rating: '4.8★', status: 'ACTIVE' },
];

export const revenueStreams = [
  { label: 'Transaction Fees', pct: '61%', width: '60%', color: 'var(--accent)' },
  { label: 'Farmer Subs', pct: '26%', width: '25%', color: 'var(--green)' },
  { label: 'Restaurant Subs', pct: '13%', width: '13%', color: 'var(--amber)' },
];

export const escrowBreakdown = [
  { label: 'Awaiting delivery', value: '2.94M', width: '70%', color: 'var(--amber)' },
  { label: 'Pending confirm', value: '1.26M', width: '30%', color: 'var(--blue, #3498DB)' },
];

export const growthMetrics = [
  { label: 'Farmer growth', pct: '+4.4%', width: '80%', color: 'var(--green)' },
  { label: 'Restaurant growth', pct: '+9.6%', width: '65%', color: 'var(--accent)' },
  { label: 'Repeat order rate', pct: '74%', width: '74%', color: 'var(--purple)' },
  { label: 'Churn rate', pct: '2.3%', width: '23%', color: 'var(--red)' },
];


// ─── DISPUTES DATA ───

export const disputeKPIs = [
  { label: 'Open Disputes', value: '2', valueColor: 'var(--red)', delta: 'requires action', deltaType: 'flat' as const },
  { label: 'Resolved (Apr)', value: '8', valueColor: 'var(--green)', delta: 'avg: 18hrs to resolve', deltaType: 'up' as const },
  { label: 'Dispute Rate', value: '1.4%', valueColor: 'var(--amber)', delta: '↓ from 2.1% Mar', deltaType: 'up' as const },
  { label: 'Escrow at Risk', value: '592K', valueColor: 'var(--amber)', delta: 'UGX in disputed orders', deltaType: 'flat' as const },
];

export interface DisputeCard {
  id: string;
  disputeId: string;
  title: string;
  meta: string;
  status: string;
  statusColor: 'red' | 'green';
  timeLabel: string;
  orderValue: string;
  issueType: string;
  escrowStatus: string;
  escrowColor?: string;
  resolved?: boolean;
  resolution?: string;
  refundAmount?: string;
}

export const disputeCards: DisputeCard[] = [
  {
    id: 'D019',
    disputeId: '#D-019',
    title: 'Quality Rejection — Watermelon delivery',
    meta: 'The Lawns Restaurant vs Otim James · Order #AGC-843',
    status: 'OPEN',
    statusColor: 'red',
    timeLabel: 'Opened 38min ago',
    orderValue: 'UGX 112,000',
    issueType: 'Quality Dispute',
    escrowStatus: 'HELD',
    escrowColor: 'var(--amber)',
  },
  {
    id: 'D018',
    disputeId: '#D-018',
    title: 'Late Delivery — No-show farmer',
    meta: 'Fang Fang Restaurant vs Mugisha Peter · Order #AGC-839',
    status: 'OPEN',
    statusColor: 'red',
    timeLabel: 'Opened 2hrs ago',
    orderValue: 'UGX 480,000',
    issueType: 'Non-Delivery',
    escrowStatus: 'HELD',
    escrowColor: 'var(--amber)',
  },
  {
    id: 'D017',
    disputeId: '#D-017',
    title: 'Short Delivery — Missing 8kg from order',
    meta: 'Café Javas vs Byamukama Moses · Order #AGC-831',
    status: 'RESOLVED',
    statusColor: 'green',
    timeLabel: 'Resolved in 14hrs',
    orderValue: 'UGX 240,000',
    issueType: 'Short Delivery',
    escrowStatus: 'RELEASED',
    resolved: true,
    resolution: 'Partial Refund',
    refundAmount: 'UGX 48,000',
  },
];

export interface DisputeDetail {
  disputeId: string;
  title: string;
  restaurant: string;
  farmer: string;
  orderId: string;
  orderValue: string;
  escrow: string;
  claim: string;
  timeline: { dotColor: 'blue' | 'amber' | 'red'; text: string; time: string }[];
}

export const disputeDetails: Record<string, DisputeDetail> = {
  D019: {
    disputeId: '// DISPUTE #D-019 · OPEN',
    title: 'Quality Rejection — Watermelon',
    restaurant: 'The Lawns Restaurant',
    farmer: 'Otim James',
    orderId: '#AGC-843',
    orderValue: 'UGX 112,000',
    escrow: 'HELD — not released',
    claim: '"Watermelons arrived overripe, 30% unusable"',
    timeline: [
      { dotColor: 'blue', text: '<strong>Order placed</strong> by The Lawns', time: '27 Mar 09:14' },
      { dotColor: 'blue', text: '<strong>Farmer confirmed</strong> — Otim James accepted', time: '27 Mar 11:30' },
      { dotColor: 'amber', text: '<strong>Delivered</strong> — restaurant signed receipt', time: '28 Mar 08:45' },
      { dotColor: 'red', text: '<strong>Dispute opened</strong> — quality rejected on inspection', time: '28 Mar 15:22' },
      { dotColor: 'blue', text: '<strong>Admin notified</strong> — awaiting review', time: '28 Mar 15:22' },
    ],
  },
  D018: {
    disputeId: '// DISPUTE #D-018 · OPEN',
    title: 'Late Delivery — No-show farmer',
    restaurant: 'Fang Fang Restaurant',
    farmer: 'Mugisha Peter',
    orderId: '#AGC-839',
    orderValue: 'UGX 480,000',
    escrow: 'HELD — not released',
    claim: '"Farmer did not show up for scheduled delivery"',
    timeline: [
      { dotColor: 'blue', text: '<strong>Order placed</strong> by Fang Fang', time: '26 Mar 14:00' },
      { dotColor: 'blue', text: '<strong>Farmer confirmed</strong> — Mugisha Peter accepted', time: '26 Mar 16:20' },
      { dotColor: 'red', text: '<strong>Delivery missed</strong> — no-show on scheduled date', time: '28 Mar 10:00' },
      { dotColor: 'red', text: '<strong>Dispute opened</strong> — non-delivery reported', time: '28 Mar 14:30' },
    ],
  },
};
