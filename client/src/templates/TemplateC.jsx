import React from "react";

const TemplateC = ({ bill }) => {
  const {
    companyName = "",
    companyAddress = "",
    companyEmail = "",
    companyGST = "",
    customerName = "",
    customerAddress = "",
    customerEmail = "",
    items = [],
  } = bill;

  const totalAmount = items.reduce(
    (sum, item) => sum + (parseFloat(item.qty || 0) * parseFloat(item.price || 0)),
    0
  );

  return (
    <div className="bg-white border border-gray-200 p-8 rounded-md shadow-md w-full text-gray-700">
      {/* Company Info */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-700">{companyName}</h1>
        <p>{companyAddress}</p>
        <p>Email: {companyEmail}</p>
        {companyGST && <p>GST: {companyGST}</p>}
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Bill To:</h2>
        <p>{customerName}</p>
        <p>{customerEmail}</p>
        {customerAddress && <p>{customerAddress}</p>}
      </div>

      {/* Item Table */}
      <table className="min-w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-100 text-sm text-gray-600">
            <th className="border p-2">Item</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Unit</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="text-sm">
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1">{item.qty}</td>
              <td className="border px-2 py-1">{item.unit}</td>
              <td className="border px-2 py-1">₹{item.price}</td>
              <td className="border px-2 py-1">
                ₹{(parseFloat(item.qty || 0) * parseFloat(item.price || 0)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Amount */}
      <div className="text-right text-lg font-semibold text-blue-800">
        Total Amount: ₹{totalAmount.toFixed(2)}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        This is a computer-generated invoice.
      </p>
    </div>
  );
};

export default TemplateC;
