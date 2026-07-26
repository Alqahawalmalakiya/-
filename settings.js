/**
 * settings.js
 */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("companyName").value = localStorage.getItem("company_name") || "ضيافة القهوة الملكية للحفلات";
  document.getElementById("companyPhone").value = localStorage.getItem("company_phone") || "+966536895975";
  
  const savedTemplate = localStorage.getItem("invoice_template");
  if (savedTemplate) {
    document.getElementById("templateUrl").value = savedTemplate;
  }
  
  document.getElementById("lastInvoiceNum").value = localStorage.getItem("last_invoice_number") || "0193";

  document.getElementById("settingsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    localStorage.setItem("company_name", document.getElementById("companyName").value);
    localStorage.setItem("company_phone", document.getElementById("companyPhone").value);
    localStorage.setItem("invoice_template", document.getElementById("templateUrl").value);
    localStorage.setItem("last_invoice_number", document.getElementById("lastInvoiceNum").value);

    const msg = document.getElementById("saveMsg");
    msg.style.display = "block";
    setTimeout(() => { msg.style.display = "none"; }, 3000);
  });
});