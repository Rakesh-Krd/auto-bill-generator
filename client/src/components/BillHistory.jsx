import React, { useEffect, useState } from "react";
import API from "../utils/api";

const BillHistory = ({ onClose }) => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await API.get("/bill/history");
        setBills(res.data);
      } catch (err) {
        console.error("Failed to fetch bill history", err);
        alert("Failed to fetch history");
      }
    };

    fetchBills();
  }, []);

const filteredBills = bills.filter((bill) =>
  bill.customerName?.toLowerCase().includes(search.toLowerCase()) ||
  bill.customerEmail?.toLowerCase().includes(search.toLowerCase())
);


  return (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh] animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">Bill History</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-3 py-1 rounded transition duration-300"
          >
            Close
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by customer email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredBills.length === 1 ? (
          <p className="text-gray-600">No bills found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300">
              <thead className="bg-blue-100 sticky top-0 z-10">
                <tr>
                  <th className="p-2 text-left border">Customer Name</th>
                  <th className="p-2 text-left border">Email</th>
                  <th className="p-2 text-left border">Template</th>
                  <th className="p-2 text-left border">Total (₹)</th>
                  <th className="p-2 text-left border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill, index) => (
                  <React.Fragment key={bill._id}>
                    <tr className="hover:bg-blue-50 transition cursor-pointer">
                      <td className="p-2 border">{bill.customerName}</td>
                      <td className="p-2 border">{bill.customerEmail}</td>
                      <td className="p-2 border capitalize">{bill.template}</td>
                      <td className="p-2 border font-medium">₹{bill.totalAmount}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() =>
                            setExpandedRow(index === expandedRow ? null : index)
                          }
                          className="text-blue-600 hover:underline"
                        >
                          {expandedRow === index ? "Hide Items" : "View Items"}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr className="animate-fade-in">
                        <td colSpan="5" className="p-3 bg-gray-50 border-t">
                          <ul className="list-disc list-inside space-y-1">
                            {bill.items?.map((item, idx) => (
                              <li
                                key={idx}
                                className="hover:text-blue-700 hover:scale-[1.02] transition duration-200"
                              >
                                <span className="font-semibold">{item.name}</span>{" "}
                                — Qty: {item.quantity}, ₹{item.price} each
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillHistory;
