"use client";

import React from 'react';
import { useData } from '../../../DataContext';

export default function ReviewsPage() {
  const { reviews, profile, loading } = useData();

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>Loading reviews...</div>;

  return (
    <div className="reviews-container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px'}}>
        <div>
          <h2 style={{fontSize: '24px', fontWeight: '800'}}>Customer Reviews</h2>
          <p style={{color: 'var(--text-soft)', marginTop: '5px'}}>What restaurants and buyers are saying about your produce.</p>
        </div>
        <div className="box" style={{padding: '15px 25px', textAlign: 'center', background: 'var(--leaf)', color: 'white'}}>
          <div style={{fontSize: '32px', fontWeight: '800'}}>{profile?.rating}</div>
          <div style={{fontSize: '12px'}}>Average Rating</div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '20px'}}>
        {reviews.map((review: any) => (
          <div key={review.id} className="box" style={{padding: '25px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'}}>
                  {review.customer_name.substring(0, 1)}
                </div>
                <div>
                  <div style={{fontWeight: '700'}}>{review.customer_name}</div>
                  <div style={{fontSize: '12px', color: 'var(--text-soft)'}}>{new Date(review.date).toLocaleDateString()}</div>
                </div>
              </div>
              <div style={{color: '#ffc107', fontSize: '18px'}}>
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
            </div>
            <p style={{lineHeight: '1.6', color: '#444', fontStyle: 'italic'}}>"{review.comment}"</p>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="box" style={{padding: '60px', textAlign: 'center', color: 'var(--text-soft)'}}>
            No reviews yet. Complete more orders to build your reputation!
          </div>
        )}
      </div>
    </div>
  );
}
