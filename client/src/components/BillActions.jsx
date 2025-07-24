import React from "react";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BillActions = ({ previewRef }) => {
  const cleanCloneForCanvas = () => {
    const clone = previewRef.current.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = "-9999px"; // Hide the clone off-screen
    clone.style.top = "0";
    clone.style.zIndex = "-1";

    // Remove the heading if it exists
    const heading = clone.querySelector(".bill-preview-heading");
    if (heading) heading.remove();

    return clone;
  };

  const handlePrint = () => {
    const clone = cleanCloneForCanvas();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            body { margin: 0; font-family: sans-serif; }
            .bill-container { padding: 20px; }
          </style>
        </head>
        <body class="bill-container">${clone.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const generatePDFBlob = async () => {
    const clone = cleanCloneForCanvas();
    document.body.appendChild(clone); // Temporarily attach for accurate styles

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    document.body.removeChild(clone);

    const blob = pdf.output("blob");
    return blob;
  };

  const handleDownload = () => {
  const element = previewRef.current;
  const opt = {
    margin: 0.5,
    filename: 'bill.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  };

  html2pdf().set(opt).from(element).save();
};

  const handleShare = async () => {
  const element = previewRef.current;

  const opt = {
    margin: 0.5,
    filename: 'bill.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  };

  const worker = html2pdf().set(opt).from(element);

  const blob = await worker.outputPdf('blob');

  const file = new File([blob], "bill.pdf", { type: "application/pdf" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      title: 'Bill',
      text: 'Here is your bill.',
      files: [file],
    });
  } else {
    alert("Sharing not supported in this browser. Try on mobile Chrome.");
  }
};

  return (
    <div className="flex gap-3 mt-4">
      <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded">
        Print
      </button>
      <button onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded">
        Download
      </button>
      <button onClick={handleShare} className="bg-purple-600 text-white px-4 py-2 rounded">
        Share
      </button>
    </div>
  );
};

export default BillActions;
