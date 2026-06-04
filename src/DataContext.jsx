"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getListings, 
  getOrders, 
  getHarvests, 
  getProfile, 
  getNotifications,
  getTransactions,
  getReviews 
} from './app/actions';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [harvests, setHarvests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      const [l, o, h, p, n, t, r] = await Promise.all([
        getListings(),
        getOrders(),
        getHarvests(),
        getProfile(),
        getNotifications(),
        getTransactions(),
        getReviews()
      ]);
      setListings(l || []);
      setOrders(o || []);
      setHarvests(h || []);
      setProfile(p || null);
      setNotifications(n || []);
      setTransactions(t || []);
      setReviews(r || []);
    } catch (error) {
      console.error("Failed to fetch dynamic data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <DataContext.Provider value={{ 
      listings, 
      orders, 
      harvests, 
      profile, 
      notifications,
      transactions,
      reviews,
      loading, 
      refreshData 
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
