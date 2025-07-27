import React from "react";

const TemplateE = ({ bill }) => {
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
    <div className="bg-white p-6 rounded-lg shadow-xl w-full font-sans border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-blue-700 uppercase">INVOICE</h1>
        <p className="text-gray-500 mt-1 text-sm">Thank you for shopping with us!</p>
      </div>

      {/* Company & Customer Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
        <div>
          <h2 className="font-bold text-blue-600 mb-1">From</h2>
          <p>{companyName}</p>
          <p>{companyAddress}</p>
          <p>{companyEmail}</p>
          {companyGST && <p>GST: {companyGST}</p>}
        </div>
        <div>
          <h2 className="font-bold text-blue-600 mb-1">To</h2>
          <p>{customerName}</p>
          <p>{customerAddress}</p>
          <p>{customerEmail}</p>
        </div>
      </div>

      {/* Item Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300 mb-6">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="border px-3 py-2">Item</th>
              <th className="border px-3 py-2">Qty</th>
              <th className="border px-3 py-2">Unit</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-blue-50 transition">
                <td className="border px-3 py-1">{item.name}</td>
                <td className="border px-3 py-1">{item.qty}</td>
                <td className="border px-3 py-1">{item.unit}</td>
                <td className="border px-3 py-1">₹{item.price}</td>
                <td className="border px-3 py-1">
                  ₹{(parseFloat(item.qty || 0) * parseFloat(item.price || 0)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="flex justify-end">
        <div className="text-right text-lg font-bold text-blue-700">
          Total: ₹{totalAmount.toFixed(2)}
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-6">
        If you have any questions about this invoice, please contact us.
      </p>
    </div>
  );
};

export default TemplateE;
