import React from 'react';
import { getProducts, getCampaigns } from '../actions';
import ProductForm from '@/components/ProductForm';
import ProductList from '@/components/ProductList';
import Sidebar from '@/components/Sidebar';

export default async function ProductsPage() {
  const products = await getProducts();
  const campaigns = await getCampaigns();

  return (
    <div className="flex min-h-screen bg-[#050505]">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Product Management</h1>
            <p className="text-gray-400">Add, edit, and track your viral products here.</p>
          </header>

          <ProductForm campaigns={campaigns} />
          <ProductList products={products} />
        </div>
      </main>
    </div>
  );
}
