"use client";

import React, { useState, useMemo } from 'react';
import { useData } from '../../../DataContext';
import { addListing, updateListing, updateListingStatus } from '../../actions';
import '../../../styles/listings.css';

export default function ListingsPage() {
  const { listings, loading, refreshData } = useData();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Most recent');
  
  // Client-side hydration fix
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => { setIsClient(true); }, []);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deletingItem, setDeletingItem] = useState<any>(null);
  const [statsItem, setStatsItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Helper to show status message
  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Stats Calculation
  const stats = useMemo(() => {
    const active = listings.filter((l: any) => l.status === 'Active').length;
    const lowStock = listings.filter((l: any) => l.status === 'Low Stock').length;
    
    // Revenue simulation
    const revenue = "UGX 842K"; 
    const ordersThisMonth = listings.reduce((acc: number, l: any) => acc + (l.orders_count || 0), 0);

    return {
      total: listings.length,
      categories: new Set(listings.map((l: any) => l.category)).size,
      active,
      lowStock,
      ordersThisMonth,
      revenue
    };
  }, [listings]);

  // Filtering & Sorting
  const filteredListings = useMemo(() => {
    let result = [...listings];
    
    if (filter !== 'All') {
      result = result.filter(l => l.status === filter);
    }

    if (search) {
      result = result.filter(l => 
        l.title.toLowerCase().includes(search.toLowerCase()) || 
        l.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sort === 'Most recent') result.sort((a, b) => b.id - a.id);
    if (sort === 'Price: Low to High') {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return priceA - priceB;
      });
    }

    return result;
  }, [listings, filter, search, sort]);

  // Handler for adding a listing
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      await addListing(data);
      setShowAddModal(false);
      notify("Listing published successfully!");
      await refreshData();
    } catch (err) {
      console.error(err);
      alert("Failed to add listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for updating a listing
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      await updateListing(editingItem.id, data);
      setEditingItem(null);
      notify("Changes saved successfully!");
      await refreshData();
    } catch (err) {
      console.error(err);
      alert("Failed to update listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for deleting a listing
  const handleDelete = async () => {
    if (!deletingItem) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/listings/${deletingItem.id}`, {
        method: 'DELETE'
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result?.error || 'Delete request failed');
      }

      notify(`${deletingItem.title} deleted successfully`);
      setDeletingItem(null);
      await refreshData();
    } catch (err: any) {
      console.error(err);
      notify("Failed to delete listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for toggling status (Pause/Activate)
  const toggleStatus = async (item: any) => {
    try {
      const newStatus = item.status === 'Active' ? 'Paused' : 'Active';
      await updateListingStatus(item.id, newStatus);
      notify(`Status updated to ${newStatus}`);
      await refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  // If not hydrated yet, don't render to avoid mismatch
  if (!isClient) return null;

  return (
    <div className="listings-page">
      {/* STATUS TOAST */}
      {statusMessage && (
        <div className="status-message">
          <span>✨</span> {statusMessage}
        </div>
      )}

      {/* MODALS - Rendered at top level for stacking reliability */}
      
      {showAddModal && (
        <div className="modal-overlay" style={{display:'flex', zIndex: 10001}} onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Post New Produce</h3>
              <button onClick={() => setShowAddModal(false)} style={{border:'none', background:'none', fontSize:'24px', cursor:'pointer'}}>×</button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full">
                    <label>Produce Name</label>
                    <input name="title" placeholder="e.g. Organic Cavendish Bananas" required />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category">
                      <option>Fruits</option>
                      <option>Vegetables</option>
                      <option>Grains & Cereals</option>
                      <option>Tubers & Roots</option>
                      <option>Poultry & Eggs</option>
                      <option>Dairy Products</option>
                      <option>Honey & Bee Products</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Icon (Emoji)</label>
                    <input name="icon" placeholder="e.g. 🍌" defaultValue="🥬" />
                  </div>
                  <div className="form-group">
                    <label>Price (UGX)</label>
                    <input name="price" placeholder="e.g. 5,000/kg" required />
                  </div>
                  <div className="form-group">
                    <label>Available Stock</label>
                    <input name="stock" placeholder="e.g. 500 kg" />
                  </div>
                  <div className="form-group">
                    <label>Minimum Order</label>
                    <input name="min_qty" placeholder="e.g. 10kg" />
                  </div>
                  <div className="form-group">
                    <label>Delivery Policy</label>
                    <select name="delivery_method">
                      <option>Farmer Delivery</option>
                      <option>Farm Pickup</option>
                      <option>Third-party Courier</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Publishing...' : 'List Produce'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="modal-overlay" style={{display:'flex', zIndex: 10002}} onClick={(e) => e.target === e.currentTarget && setEditingItem(null)}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Modify Listing</h3>
              <button onClick={() => setEditingItem(null)} style={{border:'none', background:'none', fontSize:'24px', cursor:'pointer'}}>×</button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full">
                    <label>Produce Name</label>
                    <input name="title" defaultValue={editingItem.title} required />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" defaultValue={editingItem.category}>
                      <option>Fruits</option>
                      <option>Vegetables</option>
                      <option>Grains & Cereals</option>
                      <option>Tubers & Roots</option>
                      <option>Poultry & Eggs</option>
                      <option>Dairy Products</option>
                      <option>Honey & Bee Products</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Listing Status</label>
                    <select name="status" defaultValue={editingItem.status}>
                      <option>Active</option>
                      <option>Low Stock</option>
                      <option>Paused</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input name="price" defaultValue={editingItem.price} required />
                  </div>
                  <div className="form-group">
                    <label>Current Stock</label>
                    <input name="stock" defaultValue={editingItem.stock} />
                  </div>
                  <div className="form-group">
                    <label>Min. Quantity</label>
                    <input name="min_qty" defaultValue={editingItem.min_qty} />
                  </div>
                  <div className="form-group">
                    <label>Delivery Method</label>
                    <select name="delivery_method" defaultValue={editingItem.delivery_method}>
                      <option>Farmer Delivery</option>
                      <option>Farm Pickup</option>
                      <option>Third-party Courier</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Icon</label>
                    <input name="icon" defaultValue={editingItem.icon} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setEditingItem(null)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Syncing...' : 'Update Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {statsItem && (
        <div className="modal-overlay" style={{display:'flex', zIndex: 10003}} onClick={(e) => e.target === e.currentTarget && setStatsItem(null)}>
          <div className="modal-content" style={{maxWidth:'460px'}}>
            <div className="modal-header">
              <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <span style={{fontSize:'24px'}}>{statsItem.icon}</span>
                <div style={{display:'flex', flexDirection:'column'}}>
                  <h3 style={{margin:0}}>{statsItem.title}</h3>
                  <span style={{fontSize:'10px', color:'var(--text-soft-public)', fontWeight:800, textTransform:'uppercase'}}>Performance Insight</span>
                </div>
              </div>
              <button onClick={() => setStatsItem(null)} style={{border:'none', background:'none', fontSize:'24px', cursor:'pointer'}}>×</button>
            </div>
            <div className="modal-body">
              <div className="stats-grid">
                <div className="stat-box">
                  <label>Total Revenue</label>
                  <div className="value">UGX {(statsItem.orders_count || 0) * 125000}</div>
                  <div className="trend up">↑ 12% this week</div>
                </div>
                <div className="stat-box">
                  <label>Total Orders</label>
                  <div className="value">{statsItem.orders_count || 0}</div>
                  <div className="trend up">↑ 2 from Mar</div>
                </div>
                <div className="stat-box">
                  <label>Market Views</label>
                  <div className="value">{(statsItem.id * 142) % 300 + 120}</div>
                </div>
                <div className="stat-box">
                  <label>Conversion</label>
                  <div className="value">{(((statsItem.orders_count || 1) / ((statsItem.id * 142) % 300 + 120)) * 100).toFixed(1)}%</div>
                </div>
              </div>

              <div className="chart-container">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
                  <span style={{fontSize:'12px', fontWeight:800, color:'var(--ink)', textTransform:'uppercase'}}>7-Day Demand Trend</span>
                  <span style={{fontSize:'10px', color:'var(--leaf)', fontWeight:700}}>High Interest</span>
                </div>
                <div className="chart-bars">
                   {[40, 65, 30, 85, 55, 95, 75].map((h, i) => (
                     <div key={i} className="chart-bar-wrap">
                       <div className="chart-bar" style={{height:`${h}%`}}></div>
                       <span className="chart-label">{['M','T','W','T','F','S','S'][i]}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" style={{flex:1}} onClick={() => setStatsItem(null)}>Back to Overview</button>
            </div>
          </div>
        </div>
      )}

      {deletingItem && (
        <div className="modal-overlay" style={{display:'flex', zIndex: 10004}} onClick={(e) => e.target === e.currentTarget && setDeletingItem(null)}>
          <div className="modal-content" style={{maxWidth:'400px', textAlign:'center'}}>
            <div className="modal-header" style={{justifyContent:'center', borderBottom:'none', paddingBottom:0}}>
              <div style={{width:'60px', height:'60px', background:'#fee2e2', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#ef4444', fontSize:'30px', marginBottom:'16px'}}>⚠️</div>
            </div>
            <div className="modal-body" style={{paddingTop:0}}>
              <h3 style={{fontFamily:'var(--serif)', fontSize:'22px', marginBottom:'12px'}}>Permanently Delete?</h3>
              <p style={{fontSize:'14px', color:'var(--text-soft-public)', lineHeight:1.5}}>
                Are you sure you want to remove <b>{deletingItem.title}</b> from your inventory? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer" style={{flexDirection:'column', borderTop:'none'}}>
              <button className="btn-submit" style={{background:'#ef4444', width:'100%'}} onClick={handleDelete} disabled={isSubmitting}>
                {isSubmitting ? 'Deleting...' : 'Yes, Delete Listing'}
              </button>
              <button className="btn-secondary" style={{width:'100%', border:'none'}} onClick={() => setDeletingItem(null)}>Keep Listing</button>
            </div>
          </div>
        </div>
      )}

      <div className="listings-header">
        <h1>My Listings</h1>
        <div className="header-actions">
          <button className="btn-export">Export</button>
          <button className="btn-add" onClick={() => setShowAddModal(true)}>
            + Add New Listing
          </button>
        </div>
      </div>

      <div className="listings-stats">
        <div className="ls-stat-card">
          <div className="ls-stat-label">Total Listings</div>
          <div className="ls-stat-value">{stats.total}</div>
          <div className="ls-stat-sub">across <span>{stats.categories} categories</span></div>
        </div>
        <div className="ls-stat-card">
          <div className="ls-stat-label">Active</div>
          <div className="ls-stat-value">{stats.active}</div>
          <div className="ls-stat-sub">receiving orders</div>
        </div>
        <div className="ls-stat-card">
          <div className="ls-stat-label">Orders This Month</div>
          <div className="ls-stat-value">{stats.ordersThisMonth}</div>
          <div className="ls-stat-sub up">↑ 3 vs last month</div>
        </div>
        <div className="ls-stat-card">
          <div className="ls-stat-label">Revenue From Listings</div>
          <div className="ls-stat-value">{stats.revenue}</div>
          <div className="ls-stat-sub">April 2026</div>
        </div>
      </div>

      <div className="listings-controls">
        <div className="filter-tabs">
          {['All', 'Active', 'Inactive', 'Low Stock'].map(tab => (
            <button 
              key={tab} 
              className={`filter-tab ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab} <span>({listings.filter((l:any) => tab === 'All' || l.status === tab).length})</span>
            </button>
          ))}
        </div>
        <div className="control-right">
          <div className="search-input-wrap">
            <i>🔍</i>
            <input 
              placeholder="Search listings..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Most recent</option>
            <option>Price: Low to High</option>
            <option>Rating: High to Low</option>
          </select>
        </div>
      </div>

      {loading && <div style={{opacity: 0.5, pointerEvents: 'none'}}>
        {/* Semi-transparent overlay during background refresh */}
      </div>}

      <div className="listings-grid">
        {filteredListings.map((item: any, idx: number) => (
          <div 
            key={item.id} 
            className="product-card"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="card-top">
              <div className="order-count">{item.orders_count || 0} orders</div>
              <span className={`status-badge ${item.status?.toLowerCase().replace(' ', '-')}`}>
                {item.status}
              </span>
            </div>
            <div className="card-image">{item.icon}</div>
            <div className="card-info">
              <div className="p-category">{item.category}</div>
              <div className="p-title">{item.title}</div>
              <div className="p-price">{item.price}</div>
              <div className="p-stock">
                In stock: <span className={item.status === 'Low Stock' ? 'low' : ''}>{item.stock}</span>
              </div>
              <div className="card-chips">
                <div className="chip">Min. {item.min_qty || '1 unit'}</div>
                <div className="chip">{item.delivery_method || 'Pickup only'}</div>
                <div className="chip rating-chip">⭐ {item.rating || '5.0'}</div>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn" onClick={() => setEditingItem(item)}>Edit</button>
              <button className="action-btn" onClick={() => setStatsItem(item)}>Stats</button>
              <button 
                className={`action-btn ${item.status === 'Paused' ? 'activate' : ''}`}
                onClick={() => toggleStatus(item)}
              >
                {item.status === 'Paused' ? 'Activate' : 'Pause'}
              </button>
              <button className="action-btn delete" onClick={() => setDeletingItem(item)}>Delete</button>
            </div>
          </div>
        ))}

        <div className="product-card add-card" onClick={() => setShowAddModal(true)}>
          <div className="add-icon">+</div>
          <div className="add-text">
            <b>Add New Listing</b>
            <p>Post a new produce item for restaurants to discover</p>
          </div>
        </div>
      </div>
    </div>
  );
}
