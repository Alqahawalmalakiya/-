/**
 * coordinates.js
 * ملف الإحداثيات المحدث ليطابق تصميم "ضيافة القهوة الملكية للحفلات"
 */

const positions = {
  // رقم التواصل تحت الشعار مباشرة
  headerPhone: { top: 215, align: "center", width: "100%", fontSize: "14px", fontWeight: "bold", color: "#5a4a42" },
  
  // بيانات الفاتورة (يمين الشاشة تحت الشعار)
  invoiceNumber: { top: 235, right: 60, fontSize: "15px", fontWeight: "bold", color: "#333", label: "رقم الفاتورة: " },
  customerName:  { top: 265, right: 60, fontSize: "15px", fontWeight: "bold", color: "#333", label: "العميل: " },
  invoiceDate:   { top: 295, right: 60, fontSize: "15px", fontWeight: "bold", color: "#333", label: "التاريخ: " },

  // الخط الأفقي العلوي للجدول
  tableTopLine:  { top: 380, right: 50, width: "694px", height: "2px", background: "#8c7a6b" },

  // عناوين أعمدة الجدول
  tableHeaders: {
    top: 395,
    item:        { right: 60,  width: "120px", align: "right", text: "الصنف", fontWeight: "bold", fontSize: "14px" },
    description: { right: 200, width: "260px", align: "center", text: "الوصف", fontWeight: "bold", fontSize: "14px" },
    days:        { right: 480, width: "120px", align: "center", text: "ايام العمل", fontWeight: "bold", fontSize: "14px" },
    price:       { right: 620, width: "110px", align: "left",   text: "السعر", fontWeight: "bold", fontSize: "14px" }
  },

  // الخط الأفقي تحت عناوين الجدول
  tableHeaderLine: { top: 425, right: 50, width: "694px", height: "1px", background: "#aaa" },

  // بداية صفوف الخدمات
  tableStart: { top: 445 },
  tableRowHeight: 55, 

  // الخط الأفقي أسفل الجدول (فوق المجموع)
  tableBottomLine: { top: 580, right: 50, width: "694px", height: "2px", background: "#8c7a6b" },

  // ملخص المبالغ (يمين أسفل الجدول)
  total:     { top: 600, right: 60, fontSize: "14px", fontWeight: "bold", color: "#333", label: "المجموع:" },
  paid:      { top: 625, right: 60, fontSize: "14px", fontWeight: "bold", color: "#333", label: "المبلغ المدفوع:" },
  remaining: { top: 650, right: 60, fontSize: "14px", fontWeight: "bold", color: "#333", label: "المتبقي من المبلغ:" },
  
  // ملاحظة الدفع كاش جنب المتبقي
  remainingNote: { top: 650, right: 250, fontSize: "13px", fontWeight: "bold", color: "#555" },

  // رقم التواصل في تذييل الصفحة
  footerContact: { top: 895, align: "center", width: "100%", fontSize: "14px", fontWeight: "bold", color: "#333", label: "للتواصل: " }
};