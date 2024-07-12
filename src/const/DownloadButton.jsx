// src/DownloadButton.js
import React from "react";
import { Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DownloadButton = () => {
  const downloadPage = () => {
    const input = document.body;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const imgWidth = 595.28;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 841.89;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= 841.89;
      }
      pdf.save("download.pdf");
    });
  };

  return (
    <Button variant="dark" onClick={downloadPage}>
      Download Page
    </Button>
  );
};

export default DownloadButton;
