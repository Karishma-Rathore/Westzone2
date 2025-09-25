'use client';
import EditProduct from './editProduct'; 
import React from 'react';
export default function Page({ params }) {
  const { id } = React.use(params); 

  return <EditProduct id={id} />;
}
