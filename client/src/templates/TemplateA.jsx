import React from "react";

const TemplateA = ({ bill }) => {
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
    <div className="p-6 border border-gray-300 rounded-lg text-sm text-gray-800 space-y-6">
      {/* Company Info */}
      <div className="text-center border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-600">{companyName}</h1>
        <p>{companyAddress}</p>
        <p>Email: {companyEmail}</p>
        {companyGST && <p>GST: {companyGST}</p>}
      </div>

      {/* Customer Info */}
      <div className="border p-4 rounded-md bg-blue-50">
        <h2 className="font-semibold text-blue-600 mb-2">Billed To:</h2>
        <p><strong>Name:</strong> {customerName}</p>
        <p><strong>Address:</strong> {customerAddress}</p>
        <p><strong>Email:</strong> {customerEmail}</p>
      </div>

      {/* Item Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-blue-50">
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.qty}</td>
                <td className="p-2 border">{item.unit}</td>
                <td className="p-2 border">₹{item.price}</td>
                <td className="p-2 border">
                  ₹{parseFloat(item.qty || 0) * parseFloat(item.price || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="text-right text-lg font-bold text-blue-700 mt-4">
        Total Amount: ₹{totalAmount.toFixed(2)}
      </div>
    </div>
  );
};

export default TemplateA;
