import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

//const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ButtonBar = ({ previewRef, bill }) => {
  // PRINT
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=900");
    const printContent = previewRef.current?.innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>Bill</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <div>${printContent}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // DOWNLOAD PDF
  const handleDownload = async () => {
    const input = previewRef.current;

    if (!input) {
      alert("Bill preview not found.");
      return;
    }

    try {
      const canvas = await html2canvas(input, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      //const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
      pdf.save("bill.pdf");
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Failed to download PDF.");
    }
  };

  // SEND EMAIL
 const handleSendEmail = async () => {
  if (!previewRef.current) return;

  if (!bill?.customerEmail) {
    alert("Customer email is missing!");
    return;
  }

  try {
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    const pdfBlob = pdf.output("blob");

    const formData = new FormData();
    formData.append("email", bill.customerEmail);
    // ✅ Use the correct field name expected by Multer
    formData.append("billPdf", new File([pdfBlob], "bill.pdf", { type: "application/pdf" }));

    const res = await fetch("http://localhost:5000/send-bill", {
      method: "POST",
      body: formData,
    });

    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      const text = await res.text();
      console.error("Non-OK Response:", text);
      alert("Failed to send email.");
      return;
    }

    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      alert(data.message || "Email sent successfully!");
    } else {
      alert("Unexpected response from server.");
    }
  } catch (error) {
    console.error("Email Error:", error);
    alert("Failed to send email. See console for details.");
  }
};




  return (
    <div className="flex gap-4 mt-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handlePrint}
      >
        Print
      </button>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleDownload}
      >
        Download PDF
      </button>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSendEmail}
      >
        Send Email
      </button>
    </div>
  );
};

export default ButtonBar;
