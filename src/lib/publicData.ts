// ─── LANDING PAGE DATA ───

export const tickerItems = [
  { icon: '🍍', text: 'Pineapples from Kayunga' },
  { icon: '🥛', text: 'Fresh Milk from Mbarara' },
  { icon: '🥩', text: 'Goat Meat from Luwero' },
  { icon: '🥬', text: 'Kale from Wakiso' },
  { icon: '🥭', text: 'Mangoes from Mukono' },
  { icon: '🐓', text: 'Chicken from Nakaseke' },
];

export const chainNodes = [
  { label: '🧑‍🌾 Farmer', sub: 'Earns UGX 800/L', type: 'farmer' as const },
  { label: 'Village Broker', sub: '+10%', type: 'bad' as const },
  { label: 'Wholesaler', sub: '+20%', type: 'bad' as const },
  { label: 'Middleman', sub: '+30%', type: 'bad' as const },
  { label: '🍽 Restaurant', sub: 'Pays UGX 3,500/L', type: 'restaurant' as const },
];

export const howItWorksSteps = [
  { num: '01', icon: '👨‍🌾', title: 'Farmer registers & lists produce', desc: 'Farmers create verified profiles, list their produce with real-time pricing and stock, and publish their harvest calendar so restaurants can plan ahead.' },
  { num: '02', icon: '🔍', title: 'Restaurant browses & orders', desc: 'Restaurants search verified farmers by produce, location, and rating. They place direct purchase orders with delivery date and quantity — no phone tag, no brokers.' },
  { num: '03', icon: '🔒', title: 'Escrow payment via MoMo', desc: 'Restaurants pay via MTN MoMo or Airtel Money. Funds are held in escrow by Tunda Gula and released to the farmer only after delivery is confirmed — protecting both parties.' },
  { num: '04', icon: '🚚', title: 'Deliver, confirm, repeat', desc: 'Farmer delivers directly to the restaurant. The restaurant confirms receipt, triggers payment release, and both sides rate each other — building a trust record over time.' },
];

export const farmerCTAFeatures = [
  'Verified digital farm profile',
  'Direct orders from 90+ restaurants',
  'Harvest calendar so buyers plan around you',
  'MTN MoMo & Airtel Money payments',
  'From UGX 100,000/year — less than one sale',
];

export const restaurantCTAFeatures = [
  'Browse 200+ verified farms',
  'Filter by produce, district & rating',
  'Escrow-protected payments',
  'Harvest calendars for menu planning',
  'Recurring order scheduling',
];

export const impactNumbers = [
  { value: '284', label: 'Verified farmers\non the platform' },
  { value: '91', label: 'Restaurants &\nfood businesses' },
  { value: '+40%', label: 'Average income increase\nfor registered farmers' },
  { value: '74M', label: 'UGX in farm-direct\ntrade this month' },
];

export const testimonials = [
  {
    initials: 'KJ',
    name: 'Kato Joseph',
    role: 'Fruit farmer · Kayunga District',
    text: 'Before Tunda Gula I was selling pineapples to a broker for UGX 3,500 per crate. Now I sell directly to Kati Kati at UGX 5,500. Same fruit. Double the return. I have already recovered my registration fee ten times over.',
    avatarBg: 'linear-gradient(135deg, #22C55E, #15803D)',
  },
  {
    initials: 'SK',
    name: 'Sarah Kamya',
    role: 'Head Chef · Kati Kati Restaurant, Kampala',
    text: 'Our food procurement costs dropped by 28% in the first month. The harvest calendar feature is brilliant — I can plan my menu two weeks out knowing exactly when produce arrives. We have already set up three recurring orders.',
    avatarBg: 'linear-gradient(135deg, #E67E22, #8B4513)',
  },
  {
    initials: 'JO',
    name: 'James Okullo',
    role: 'Procurement Manager · Serena Hotel Kampala',
    text: 'The escrow payment system gave me confidence. I was sceptical about trusting a new platform, but knowing my money is protected until delivery is confirmed made it easy to commit. The farmers I have found here are exceptional.',
    avatarBg: 'linear-gradient(135deg, #8E44AD, #4A235A)',
  },
];

export const footerPlatformLinks = ['Browse Marketplace', 'Register as Farmer', 'How It Works', 'Pricing'];
export const footerCompanyLinks = ['About Us', 'Mission', 'Blog', 'Careers'];
export const footerSupportLinks = ['Help Centre', 'Dispute Policy', 'Privacy Policy', 'Contact Us'];
export const footerMomoBadges = ['📱 MTN MoMo', '📲 Airtel Money', '🏦 Bank Transfer', '🇺🇬 Uganda-built'];


// ─── HOW IT WORKS PAGE DATA ───

export const hiwTimelineSteps = [
  {
    num: 1,
    icon: '👨‍🌾',
    title: 'Farmer registers & builds a profile',
    desc: 'Farmers sign up with their name, phone number, farm location, and produce categories. Our team verifies the farm within 48 hours using submitted documents — National ID, land title, and any relevant certifications like dairy permits or UNBS standards.',
    note: '<strong>What farmers create:</strong> A public-facing digital storefront showing their produce, pricing, stock levels, harvest calendar, and reviews from previous restaurant buyers. It is their market stall — live 24/7.',
  },
  {
    num: 2,
    icon: '🔍',
    title: 'Restaurant browses the marketplace',
    desc: 'Restaurant procurement managers log in and search verified farmers by produce type, district, price range, and rating. They can view full farm profiles including bios, harvest calendars, past reviews from other restaurants, and on-time delivery rates.',
    note: '<strong>Trust is built in:</strong> Only verified, document-checked farmers appear in the marketplace. Each farmer has a public order history and star rating from confirmed restaurant buyers.',
  },
  {
    num: 3,
    icon: '📦',
    title: 'Order placed — payment held in escrow',
    desc: 'The restaurant selects the produce, quantity, and delivery date, then places the order directly with the farmer. Payment is made via MTN MoMo or Airtel Money and held in Tunda Gula\'s secure escrow — the farmer sees the order confirmed but does not receive payment yet.',
    note: '<strong>Why escrow?</strong> It protects both sides. The farmer knows payment is guaranteed and committed. The restaurant knows their money is only released when delivery is confirmed. No trust required — the system provides it.',
  },
  {
    num: 4,
    icon: '✅',
    title: 'Delivery confirmed — farmer paid instantly',
    desc: 'The farmer delivers on the agreed date. The restaurant confirms the delivery on the platform — or raises a dispute if there is a quality issue. On confirmation, the escrow releases payment instantly to the farmer\'s mobile money wallet. Both parties rate each other.',
    note: '<strong>Disputes:</strong> If a restaurant rejects a delivery on quality grounds, Tunda Gula\'s admin team reviews both parties\' evidence and mediates a fair resolution within 24 hours.',
  },
];

export const whoFarmerFeatures = [
  'You grow fruits, vegetables, dairy, meat, or poultry',
  'You want direct relationships with food businesses',
  'You have a smartphone or know someone who does',
  'You use MTN MoMo or Airtel Money',
];

export const whoRestaurantFeatures = [
  'Restaurants, hotels, cafés, and food courts',
  'You buy produce at least weekly',
  'You want to know where your food comes from',
  'You want to reduce food costs without reducing quality',
];


// ─── PRICING PAGE DATA ───

export interface PlanFeature {
  text: string;
  disabled?: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  featured?: boolean;
  features: PlanFeature[];
  btnText: string;
}

export const farmerPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'First 3 months',
    features: [
      { text: 'Basic farm profile' },
      { text: 'Up to 5 produce listings' },
      { text: 'Receive direct orders' },
      { text: 'Mobile money payments' },
      { text: 'Priority search ranking', disabled: true },
      { text: 'Harvest calendar', disabled: true },
      { text: 'Tunda Gula Verified badge', disabled: true },
    ],
    btnText: 'Get Started Free',
  },
  {
    name: 'Standard',
    price: 'UGX 100K',
    period: 'Per year · ~UGX 8,300/month',
    featured: true,
    features: [
      { text: 'Full verified profile' },
      { text: 'Unlimited produce listings' },
      { text: 'Harvest calendar' },
      { text: 'Priority search ranking' },
      { text: 'Tunda Gula Verified badge' },
      { text: 'Order analytics' },
      { text: '24hr customer support' },
    ],
    btnText: 'Register My Farm →',
  },
  {
    name: 'Cooperative',
    price: 'UGX 300K',
    period: 'Per year · For SACCOs & groups',
    features: [
      { text: 'Everything in Standard' },
      { text: 'Up to 20 member farmers' },
      { text: 'Group profile & branding' },
      { text: 'Bulk order aggregation' },
      { text: 'Dedicated account manager' },
      { text: 'Revenue reporting' },
      { text: 'Reduced transaction fee (2%)' },
    ],
    btnText: 'Contact Us',
  },
];

export const restaurantFeatures = [
  { icon: '🛒', text: 'Browse 200+ verified farms for free' },
  { icon: '🔒', text: 'Escrow-protected payments on every order' },
  { icon: '📱', text: 'Pay via MTN MoMo or Airtel Money' },
  { icon: '📊', text: 'Spend analytics (Premium plan)' },
  { icon: '🔄', text: 'Recurring order scheduling' },
];

export const faqItems = [
  { q: 'Is the annual fee refundable?', a: 'We offer a full refund within the first 30 days if you are not satisfied. After 30 days, fees are non-refundable but your account remains active for the full year.' },
  { q: 'Who pays the 3% transaction fee?', a: 'The 3% fee is charged to the restaurant on each order. Farmers receive 100% of their listed price. We believe farmers should not have their earnings reduced further — the restaurant benefits from the platform and pays the service fee.' },
  { q: 'What happens after my free trial ends?', a: 'After 3 months, your profile switches to a limited read-only state. You will still appear in search results but cannot accept new orders until you upgrade to Standard. We will notify you 2 weeks before your trial ends.' },
  { q: 'Can I pay the annual fee in instalments?', a: 'Yes. We offer quarterly payment of UGX 27,000 for the Standard plan. Contact our support team to set this up via MTN MoMo auto-deduction.' },
  { q: 'Are there NGO or grant-funded access options?', a: 'Yes. We work with development organisations including USAID, GIZ, and Mastercard Foundation partners to subsidise farmer registrations in target communities. Contact partnerships@tundagula.ug to discuss bulk onboarding programs.' },
];


// ─── ABOUT PAGE DATA ───

export const values = [
  { icon: '⚖️', name: 'Fairness in the value chain', desc: 'We believe the people who grow food deserve a fair share of what it sells for. Every feature we build is designed to put more value back in the hands of farmers.' },
  { icon: '🔍', name: 'Radical transparency', desc: 'Farmers see exactly who is buying and at what price. Restaurants see exactly who is growing and what their track record is. No hidden margins. No information asymmetry.' },
  { icon: '🔒', name: 'Trust by design', desc: "We don't ask farmers and restaurants to trust strangers. We build trust into the system through verification, escrow, reviews, and dispute resolution. Technology as an institutional guarantee." },
  { icon: '🇺🇬', name: 'Uganda-first thinking', desc: "Every product decision is made with Uganda's context in mind — mobile money, rural connectivity, district geography, local produce, and language. We are not a foreign platform adapted for Uganda. We are Ugandan." },
  { icon: '🌱', name: 'Long-term farmer welfare', desc: 'We measure success not just by GMV but by how much more farmers earn on our platform versus the traditional system. Farmer income growth is our north star metric.' },
  { icon: '📲', name: 'Accessibility over sophistication', desc: 'The best technology for Uganda is technology that works. USSD fallback, SMS notifications, offline-capable features, and agent-assisted onboarding are not afterthoughts — they are core product requirements.' },
];

export const teamMembers = [
  { initials: 'DO', name: 'David Onyango', role: 'Co-founder & CEO', gradient: 'linear-gradient(135deg, #22C55E, #15803D)' },
  { initials: 'AM', name: 'Aisha Mukasa', role: 'Co-founder & CTO', gradient: 'linear-gradient(135deg, #4F6EF7, #1E40AF)' },
  { initials: 'RK', name: 'Robert Kiggundu', role: 'Head of Farmer Relations', gradient: 'linear-gradient(135deg, #D4A843, #8B6A1A)' },
  { initials: 'NO', name: 'Norah Opio', role: 'Head of Restaurant Partnerships', gradient: 'linear-gradient(135deg, #A855F7, #6B21A8)' },
];
