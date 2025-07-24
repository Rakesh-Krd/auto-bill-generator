import React from 'react';

const TemplateB = ({ company, customer, items, total }) => (
  <div className="bg-blue-50 border-2 border-dashed border-blue-500 p-4 text-sm font-mono rounded-lg">
    <div className="mb-2">
      <h2 className="text-blue-900 font-bold text-xl">{company.name}</h2>
      <p>{company.address} | {company.phone}</p>
    </div>

    <div className="mb-4">
      <h4 className="text-blue-800 font-semibold">Bill To:</h4>
      <p>{customer.name} - {customer.phone}</p>
      <p>{customer.address}</p>
    </div>

    <ul className="mb-4">
      {items.map((item, idx) => (
        <li key={idx} className="flex justify-between border-b border-blue-200 py-1">
          <span>{item.description} x {item.quantity}</span>
          <span>₹{(item.quantity * item.price).toFixed(2)}</span>
        </li>
      ))}
    </ul>

    <div className="text-right font-bold text-blue-700">
      Total: ₹{total.toFixed(2)}
    </div>
  </div>
);

export default TemplateB;
