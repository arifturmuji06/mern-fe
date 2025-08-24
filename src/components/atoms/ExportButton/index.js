import React from "react";
import axios from "axios";
import AtomButton from "../AtomButton";

// const API_URL = "http://localhost:4000/v1/export";
const API_URL = "https://remunerasi-api.onrender.com/v1/export";

const ExportButton = ({ tahun, periode, tipe, format = "pdf" }) => {
  const downloadFile = async (url, filename) => {
    try {
      const res = await axios({
        url,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const blob = new Blob([res.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Gagal download file:", err);
      alert("Gagal download file");
    }
  };

  const handleExport = () => {
    let url = "";
    let filename = "";

    if (tipe === "anggaran") {
      url = `${API_URL}/anggaran/${format}?tahun=${tahun}`;
      filename = `summary-anggaran-${tahun}.${
        format === "pdf" ? "pdf" : "xlsx"
      }`;
    } else if (tipe === "remunerasi") {
      url = `${API_URL}/remunerasi/${format}?periode=${periode}`;
      filename = `remunerasi-${periode}.${format === "pdf" ? "pdf" : "xlsx"}`;
    }

    downloadFile(url, filename);
  };

  return (
    <AtomButton
      label={`Export`}
      variant={"primary"}
      onClick={handleExport}
      icon={"Download"}
      iconPosition="start"
    />
  );
};

export default ExportButton;
