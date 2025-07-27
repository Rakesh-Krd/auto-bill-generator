import React from "react";

const TemplateD = ({ bill }) => {
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
    <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md font-sans w-full">
      {/* Header with Two Columns */}
      <div className="flex justify-between mb-6">
        <div className="text-sm text-gray-700">
          <h2 className="text-xl font-bold text-blue-700 mb-2">{companyName}</h2>
          <p>{companyAddress}</p>
          <p>{companyEmail}</p>
          {companyGST && <p>GST: {companyGST}</p>}
        </div>
        <div className="text-sm text-gray-700 text-right">
          <h3 className="font-semibold text-gray-800">Bill To:</h3>
          <p>{customerName}</p>
          <p>{customerEmail}</p>
          {customerAddress && <p>{customerAddress}</p>}
        </div>
      </div>

      {/* Divider Line */}
      <hr className="border-t border-dashed border-gray-400 mb-4" />

      {/* Item Table */}
      <table className="w-full text-sm border border-gray-300 mb-4">
        <thead>
          <tr className="bg-blue-100 text-gray-800">
            <th className="border px-2 py-1">Item</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Unit</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-blue-50 transition">
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
      <div className="text-right text-lg font-bold text-blue-800">
        Grand Total: ₹{totalAmount.toFixed(2)}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-4">
        Thank you for your business!
      </p>
    </div>
  );
};

export default TemplateD;
