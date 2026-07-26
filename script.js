/**
 * script.js
 * إدارة النموذج والربط اللحظي ورسم الخطوط والنصوص
 */

document.addEventListener("DOMContentLoaded", () => {
  initApp();

  document.getElementById("addServiceBtn").addEventListener("click", () => addServiceRow());
  document.getElementById("printBtn").addEventListener("click", printInvoice);
  document.getElementById("pdfBtn").addEventListener("click", generatePDF);
  document.getElementById("pngBtn").addEventListener("click", generatePNG);
  document.getElementById("newInvoiceBtn").addEventListener("click", startNewInvoice);

  document.getElementById("invoiceForm").addEventListener("input", renderInvoice);
});

function initApp() {
  const customTemplate = localStorage.getItem("invoice_template");
  if (customTemplate) {
    document.getElementById("templateImg").src = customTemplate;
  }

  // تعبئة تاريخ اليوم
  const today = new Date();
  const dateString = today.getFullYear() + "/" + 
                    String(today.getMonth() + 1).padStart(2, '0') + "/" + 
                    String(today.getDate()).padStart(2, '0');
  document.getElementById("invoiceDate").value = dateString;

  // رقم الفاتورة المتسلسل
  let lastInvoiceNum = localStorage.getItem("last_invoice_number") || "0193";
  let nextNum = String(parseInt(lastInvoiceNum, 10) + 1).padStart(4, '0');
  document.getElementById("invoiceNumber").value = nextNum;

  // إضافة خدمة افتراضية أولى (تم تعديل حقل أيام العمل ليقبل نص)
  addServiceRow("خدمة ضيافة", "طاولة استقبال مع 10 اصناف من المشروبات الحارة مع قهوجي مباشر", "٢/٢٧ صفر", 1000);
  
  renderInvoice();
}

// دالة إضافة صف خدمة (حقل أيام العمل نوعه text الآن)
function addServiceRow(item = "", desc = "", days = "٢/٢٧ صفر", price = 0) {
  const container = document.getElementById("servicesContainer");
  const id = Date.now() + Math.random();
  
  const serviceDiv = document.createElement("div");
  serviceDiv.className = "service-item-form";
  serviceDiv.dataset.id = id;
  
  serviceDiv.innerHTML = `
    <button type="button" class="remove-service-btn" onclick="removeServiceRow(${id})">&times;</button>
    <div class="form-row">
      <div class="form-group">
        <label>الصنف:</label>
        <input type="text" class="srv-item" value="${item}" placeholder="مثال: خدمة ضيافة">
      </div>
      <div class="form-group">
        <label>السعر:</label>
        <input type="number" class="srv-price" value="${price}" min="0" step="0.01">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex: 2;">
        <label>الوصف:</label>
        <input type="text" class="srv-desc" value="${desc}" placeholder="وصف الخدمة المقدمة">
      </div>
      <div class="form-group" style="flex: 1;">
        <label>أيام العمل / التاريخ:</label>
        <input type="text" class="srv-days" value="${days}" placeholder="مثال: ٢/٢٧ صفر">
      </div>
    </div>
  `;
  
  container.appendChild(serviceDiv);
  renderInvoice();
}

function removeServiceRow(id) {
  const row = document.querySelector(`.service-item-form[data-id="${id}"]`);
  if (row) {
    row.remove();
    renderInvoice();
  }
}

// دالة رسم الفاتورة
function renderInvoice() {
  const overlay = document.getElementById("overlayContainer");
  overlay.innerHTML = "";

  const customerName = document.getElementById("customerName").value;
  const invoiceNum = document.getElementById("invoiceNumber").value;
  const invoiceDate = document.getElementById("invoiceDate").value;
  const deposit = parseFloat(document.getElementById("deposit").value) || 0;
  
  const companyPhone = localStorage.getItem("company_phone") || "+966536895975";
  const footerPhone  = "0536895975";

  // رسم أرقام التواصل وبيانات الفاتورة
  drawText(companyPhone, positions.headerPhone);
  drawText(invoiceNum, { ...positions.invoiceNumber, text: positions.invoiceNumber.label + invoiceNum });
  drawText(customerName, { ...positions.customerName, text: positions.customerName.label + customerName });
  drawText(invoiceDate, { ...positions.invoiceDate, text: positions.invoiceDate.label + invoiceDate });

  // رسم الخط العلوي وعناوين الجدول والخط الرمادي
  drawLine(positions.tableTopLine);
  
  drawText(positions.tableHeaders.item.text, { top: positions.tableHeaders.top, ...positions.tableHeaders.item });
  drawText(positions.tableHeaders.description.text, { top: positions.tableHeaders.top, ...positions.tableHeaders.description });
  drawText(positions.tableHeaders.days.text, { top: positions.tableHeaders.top, ...positions.tableHeaders.days });
  drawText(positions.tableHeaders.price.text, { top: positions.tableHeaders.top, ...positions.tableHeaders.price });

  drawLine(positions.tableHeaderLine);

  // معالجة ورسم الخدمات
  let totalAmount = 0;
  const serviceRows = document.querySelectorAll(".service-item-form");
  
  serviceRows.forEach((row, index) => {
    const item = row.querySelector(".srv-item").value;
    const desc = row.querySelector(".srv-desc").value;
    const days = row.querySelector(".srv-days").value;
    const price = parseFloat(row.querySelector(".srv-price").value) || 0;

    totalAmount += price;
    const currentTop = positions.tableStart.top + (index * positions.tableRowHeight);

    drawText(item, { top: currentTop, right: positions.tableHeaders.item.right, width: positions.tableHeaders.item.width, align: positions.tableHeaders.item.align, fontWeight: "bold" });
    drawText(desc, { top: currentTop, right: positions.tableHeaders.description.right, width: positions.tableHeaders.description.width, align: positions.tableHeaders.description.align, lineHeight: "1.4" });
    drawText(days, { top: currentTop, right: positions.tableHeaders.days.right, width: positions.tableHeaders.days.width, align: positions.tableHeaders.days.align });
    drawText("SAR " + price.toLocaleString('en-US'), { top: currentTop, right: positions.tableHeaders.price.right, width: positions.tableHeaders.price.width, align: positions.tableHeaders.price.align, fontWeight: "bold" });
  });

  // رسم الخط السفلي والمبالغ
  drawLine(positions.tableBottomLine);

  const remainingAmount = totalAmount - deposit;

  drawText(positions.total.label, positions.total);
  drawText("SAR " + totalAmount.toLocaleString('en-US'), { top: positions.total.top, right: 180, fontWeight: "bold" });

  drawText(positions.paid.label, positions.paid);
  drawText("SAR " + deposit.toLocaleString('en-US'), { top: positions.paid.top, right: 180, fontWeight: "bold" });

  drawText(positions.remaining.label, positions.remaining);
  drawText("SAR " + remainingAmount.toLocaleString('en-US'), { top: positions.remaining.top, right: 180, fontWeight: "bold" });
  drawText("(الدفع كاش يوم العمل)", positions.remainingNote);

  // رقم التواصل في الأسفل
  drawText(positions.footerContact.label + footerPhone, positions.footerContact);
}

// دالة رسم النصوص
function drawText(text, config) {
  if (!text && text !== 0) return;
  const div = document.createElement("div");
  div.textContent = config.text || text;
  div.style.position = "absolute";
  div.style.top = config.top + "px";
  
  if (config.right !== undefined) div.style.right = config.right + "px";
  if (config.left !== undefined) div.style.left = config.left + "px";
  if (config.width) div.style.width = config.width;
  if (config.fontSize) div.style.fontSize = config.fontSize;
  if (config.color) div.style.color = config.color;
  if (config.fontWeight) div.style.fontWeight = config.fontWeight;
  if (config.align) div.style.textAlign = config.align;
  if (config.lineHeight) div.style.lineHeight = config.lineHeight;
  div.style.wordWrap = "break-word"; 
  
  document.getElementById("overlayContainer").appendChild(div);
}

// دالة رسم الخطوط الأفقية
function drawLine(config) {
  const line = document.createElement("div");
  line.style.position = "absolute";
  line.style.top = config.top + "px";
  if (config.right !== undefined) line.style.right = config.right + "px";
  line.style.width = config.width;
  line.style.height = config.height;
  line.style.backgroundColor = config.background;
  
  document.getElementById("overlayContainer").appendChild(line);
}

function startNewInvoice() {
  if (confirm("هل أنت متأكد من إنشاء فاتورة جديدة؟")) {
    const currentNum = document.getElementById("invoiceNumber").value;
    localStorage.setItem("last_invoice_number", currentNum);
    
    document.getElementById("customerName").value = "";
    document.getElementById("deposit").value = "0";
    document.getElementById("servicesContainer").innerHTML = "";
    
    initApp();
  }
}

function printInvoice() {
  window.print();
}

function generatePDF() {
  const invoiceElement = document.getElementById("invoiceA4");
  const pdfBtn = document.getElementById("pdfBtn");
  const originalText = pdfBtn.textContent;
  
  pdfBtn.textContent = "جاري التحويل...";
  pdfBtn.disabled = true;

  html2canvas(invoiceElement, { scale: 2, useCORS: true }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    const invNum = document.getElementById("invoiceNumber").value || "Invoice";
    pdf.save(`فاتورة_${invNum}.pdf`);

    pdfBtn.textContent = originalText;
    pdfBtn.disabled = false;
  }).catch(err => {
    alert("تنبيه: لتجنب مشاكل سياسات الأمان (CORS)، يرجى تشغيل الملفات على سيرفر محلي أو رفع صورة القالب محلياً.");
    pdfBtn.textContent = originalText;
    pdfBtn.disabled = false;
  });
}

function generatePNG() {
  const invoiceElement = document.getElementById("invoiceA4");
  html2canvas(invoiceElement, { scale: 2, useCORS: true }).then(canvas => {
    const link = document.createElement("a");
    const invNum = document.getElementById("invoiceNumber").value || "Invoice";
    link.download = `فاتورة_${invNum}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}