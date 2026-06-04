"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addListing } from '../../../actions';
import { useData } from '../../../../DataContext';
import Link from 'next/link';
import '../../../../styles/listings.css';

export default function AddListingPage() {
  const router = useRouter();
  const { refreshData } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      await addListing(data);
      await refreshData();
      router.push('/dashboard/listings');
    } catch (err) {
      console.error(err);
      alert("Failed to add listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="listings-page">
      <div className="listings-header">
        <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
          <Link href="/dashboard/listings" className="btn-secondary" style={{padding:'8px 12px', border:'none'}}>
            ← Back
          </Link>
          <h1>Post New Produce</h1>
        </div>
      </div>

      <div className="product-card" style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
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
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Link href="/dashboard/listings" className="btn-secondary">Cancel</Link>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'List Produce'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
