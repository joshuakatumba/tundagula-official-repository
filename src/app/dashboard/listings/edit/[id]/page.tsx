"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getListingById, updateListing } from '../../../../actions';
import { useData } from '../../../../../DataContext';
import Link from 'next/link';
import '../../../../../styles/listings.css';

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const { refreshData } = useData();
  
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await getListingById(id);
        if (data) {
          setItem(data);
        } else {
          router.push('/dashboard/listings');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      await updateListing(id, data);
      await refreshData();
      router.push('/dashboard/listings');
    } catch (err) {
      console.error(err);
      alert("Failed to update listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="listings-page"><p>Loading listing...</p></div>;
  if (!item) return null;

  return (
    <div className="listings-page">
      <div className="listings-header edit-listing-header">
        <div className="edit-listing-title-row">
          <Link href="/dashboard/listings" className="btn-secondary edit-back-btn">
            ← Back
          </Link>
          <h1>Modify Listing</h1>
        </div>
      </div>

      <div className="product-card edit-listing-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full">
              <label>Produce Name</label>
              <input name="title" defaultValue={item.title} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" defaultValue={item.category}>
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
              <select name="status" defaultValue={item.status}>
                <option>Active</option>
                <option>Low Stock</option>
                <option>Paused</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price (UGX)</label>
              <input name="price" defaultValue={item.price} required />
            </div>
            <div className="form-group">
              <label>Current Stock</label>
              <input name="stock" defaultValue={item.stock} />
            </div>
            <div className="form-group">
              <label>Min. Quantity</label>
              <input name="min_qty" defaultValue={item.min_qty} />
            </div>
            <div className="form-group">
              <label>Delivery Method</label>
              <select name="delivery_method" defaultValue={item.delivery_method}>
                <option>Farmer Delivery</option>
                <option>Farm Pickup</option>
                <option>Third-party Courier</option>
              </select>
            </div>
            <div className="form-group">
              <label>Icon (Emoji)</label>
              <input name="icon" defaultValue={item.icon} />
            </div>
          </div>
          
          <div className="edit-listing-actions">
            <Link href="/dashboard/listings" className="btn-secondary">Cancel</Link>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Syncing...' : 'Update Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
