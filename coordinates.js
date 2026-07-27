/**
 * coordinates.js
 * ملف الإحداثيات المحدث ليطابق تصميم "ضيافة القهوة الملكية للحفلات"
 */

const positions = {
  headerPhone: { top: 215, align: "center", width: "100%", fontSize: "14px", fontWeight: "bold", color: "#5a4a42" },

  invoiceNumber: { top: 235, right: 60, fontSize: "15px", fontWeight: "bold", color: "#333", label: "رقم الفاتورة: " },
  customerName:  { top: 265, right: 60, fontSize: "15px", fontWeight: "bold", color: "#333", label: "العميل: " },
  invoiceDate:   { top: 295, right: 60, fontSize: "15px", fontWeight: "bold", color: "#333", label: "التاريخ: " },

  tableTopLine:  { top: 380, right: 50, width: "694px", height: "2px", background: "#8c7a6b" },

  tableHeaders: {
    top: 395,
    item:        { right: 60,  width: "120px", align: "right", text: "الصنف", fontWeight: "bold", fontSize: "14px" },
    description: { right: 200, width: "260px", align: "center", text: "الوصف", fontWeight: "bold", fontSize: "14px" },
    days:        { right: 480, width: "120px", align: "center", text: "ايام العمل", fontWeight: "bold", fontSize: "14px" },
    price:       { right: 620, width: "110px", align: "left",   text: "السعر", fontWeight: "bold", fontSize: "14px" }
  },

  tableHeaderLine: { top: 425, right: 50, width: "694px", height: "1px", background: "#aaa" },

  tableStart: { top: 445 },
  tableRowHeight: 55,

  tableBottomLine: { top: 580, right: 50, width: "694px", height: "2px", background: "#8c7a6b" },

  total:     { top: 600, right: 60, fontSize: "14px", fontWeight: "bold", color: "#333", label: "المجموع:" },
  paid:      { top: 625, right: 60, fontSize: "14px", fontWeight: "bold", color: "#333", label: "المبلغ المدفوع:" },
  remaining: { top: 650, right: 60, fontSize: "14px", fontWeight: "bold", color: "#333", label: "المتبقي من المبلغ:" },

  remainingNote: { top: 650, right: 250, fontSize: "13px", fontWeight: "bold", color: "#555" },

  footerContact: { top: 895, align: "center", width: "100%", fontSize: "14px", fontWeight: "bold", color: "#333", label: "للتواصل: " }
};