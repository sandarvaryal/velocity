import ExcelJS from "exceljs";
import axios from "axios";
import { saveAs } from "file-saver";
import { toWords } from "number-to-words";

export const handleDownloadExcel = async (awbNumberAsNum: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/getShipment/${awbNumberAsNum}`,
      { withCredentials: true }
    );
    const shipmentData = response.data;
    const getReadableData = (string: string): string => {
      const date = new Date(string);
      const formattedDate = date.toLocaleString("en-US", {
        timeZone: "Asia/Kathmandu",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return formattedDate;
    };

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Shipment Invoice");

    const headerStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, size: 12, color: { argb: "FFFFFFFF" } },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4F81BD" },
      },
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thick" },
        bottom: { style: "thick" },
        left: { style: "thick" },
        right: { style: "thick" },
      },
    };

    const topHeaderStyle: Partial<ExcelJS.Style> = {
      font: {
        name: "Times New Roman",
        bold: true,
        size: 11,
        color: { argb: "FF000000" },
      },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" },
      },
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        left: { style: "thick" },
        right: { style: "thick" },
      },
    };

    const dataStyle: Partial<ExcelJS.Style> = {
      font: { size: 11 },
      border: {
        left: { style: "thick" },
        right: { style: "thick" },
      },
    };

    const footerStyle: Partial<ExcelJS.Style> = {
      font: { size: 11, bold: true },
      alignment: { horizontal: "left", vertical: "middle" },
      border: {
        top: { style: "thick" },
        bottom: { style: "thick" },
        left: { style: "thick" },
        right: { style: "thick" },
      },
    };

    worksheet.columns = [
      { header: "A", key: "a", width: 15 },
      { header: "B", key: "b", width: 10 },
      { header: "C", key: "c", width: 35 },
      { header: "D", key: "d", width: 15 },
      { header: "E", key: "e", width: 10 },
      { header: "F", key: "f", width: 20 },
      { header: "G", key: "g", width: 15 },
    ];

    const imageUrl = "/nexus-logo.png";
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const imageId = workbook.addImage({
      buffer: imageBuffer,
      extension: "png",
    });

    worksheet.addImage(imageId, {
      tl: { col: 0.9, row: 0.9 },
      ext: { width: 100, height: 90 },
      editAs: "absolute",
    });

    const topRow1 = worksheet.addRow(["NEXUS EXPORT TRADE PVT LTD"]);
    topRow1.getCell(1).style = {
      font: {
        name: "Times New Roman",
        bold: true,
        size: 16,
        color: { argb: "FF000000" },
      },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" },
      },
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thick" },

        left: { style: "thick" },
        right: { style: "thick" },
      },
    };
    topRow1.height = 25;
    const topRow2 = worksheet.addRow(["NAYA BAZAR 16, KATHMANDU, NEPAL"]);
    topRow2.getCell(1).style = topHeaderStyle;
    const topRow3 = worksheet.addRow([
      "OFFICE NO: 01-4977771 PHONE: +977-9846760771 / 9869049690",
    ]);
    topRow3.getCell(1).style = topHeaderStyle;
    const topRow4 = worksheet.addRow(["INVOICE"]);
    topRow4.getCell(1).style = {
      font: {
        name: "Times New Roman",
        bold: true,
        size: 14,
        color: { argb: "FF000000" },
      },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" },
      },
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        bottom: { style: "thick" },
        left: { style: "thick" },
        right: { style: "thick" },
      },
    };

    const extra0 = worksheet.addRow(["", "", "", "", "", "", ""]);
    extra0.getCell(1).style = dataStyle;
    extra0.getCell(4).style = dataStyle;

    worksheet.mergeCells("A2:G2");
    worksheet.mergeCells("A3:G3");
    worksheet.mergeCells("A4:G4");
    worksheet.mergeCells("A5:G5");

    const actualDate = worksheet.addRow([
      `INVOICE DATE: ${getReadableData(shipmentData.date)}`,
      "",
      "",
      `ACTUAL WEIGHT: ${shipmentData.totalActualWeightKg}`,
      "",
      "",
      "",
    ]);
    actualDate.getCell(1).style = dataStyle;
    actualDate.getCell(4).style = dataStyle;
    const invoiceNo = worksheet.addRow([
      `INVOICE NO: ${shipmentData.awbNumber}`,
      "",
      "",
      `TOTAL PIECES: ${shipmentData.Boxes.length}`,
      "",
      "",
      "",
    ]);
    invoiceNo.getCell(1).style = dataStyle;
    invoiceNo.getCell(4).style = dataStyle;
    const extra1 = worksheet.addRow(["", "", "", "", "", "", ""]);
    extra1.getCell(1).style = dataStyle;
    extra1.getCell(4).style = dataStyle;

    const headerRow = worksheet.addRow([
      "Sender",
      "",
      "",
      "Receiver",
      "",
      "",
      "",
    ]);
    headerRow.getCell(1).style = headerStyle;
    headerRow.getCell(4).style = headerStyle;

    worksheet.mergeCells("A6:C6");
    worksheet.mergeCells("D6:G6");
    worksheet.mergeCells("A7:C7");
    worksheet.mergeCells("D7:G7");
    worksheet.mergeCells("A8:C8");
    worksheet.mergeCells("D8:G8");
    worksheet.mergeCells("A9:C9");
    worksheet.mergeCells("D9:G9");
    worksheet.mergeCells("A10:C10");
    worksheet.mergeCells("D10:G10");

    const fields = [
      [
        `COMPANY: ${shipmentData.consignor.company}`,
        "",
        "",
        `COMPANY: ${shipmentData.consignee.company}`,
        "",
        "",
        "",
      ],
      [
        `NAME: ${shipmentData.consignor.name}`,
        "",
        "",
        `NAME: ${shipmentData.consignee.name}`,
        "",
        "",
        "",
      ],
      [
        `ADDRESS: ${shipmentData.consignor.address1}${shipmentData.consignor.address2 ? ", " + shipmentData.consignor.address2 : ""}`,
        "",
        "",
        `ADDRESS: ${shipmentData.consignee.address1}${shipmentData.consignee.address2 ? ", " + shipmentData.consignee.address2 : ""}`,
        "",
        "",
        "",
      ],
      [
        `ZIP CODE: ${shipmentData.consignor.zip}`,
        "",
        "",
        `ZIP CODE: ${shipmentData.consignee.zip}`,
        "",
        "",
        "",
      ],
      [
        `CITY/STATE: ${shipmentData.consignor.city}, ${shipmentData.consignor.state}`,
        "",
        "",
        `CITY/STATE: ${shipmentData.consignee.city}, ${shipmentData.consignee.state}`,
        "",
        "",
        "",
      ],
      [
        `COUNTRY: ${shipmentData.consignor.country}`,
        "",
        "",
        `COUNTRY: ${shipmentData.consignee.country}`,
        "",
        "",
        "",
      ],
      [
        `PHONE: ${shipmentData.consignor.phoneNumber}`,
        "",
        "",
        `PHONE: ${shipmentData.consignee.phoneNumber}`,
        "",
        "",
        "",
      ],
      [
        `EMAIL: ${shipmentData.consignor.email}`,
        "",
        "",
        `EMAIL: ${shipmentData.consignee.email}`,
        "",
        "",
        "",
      ],
    ];

    fields.forEach((rowData) => {
      const row = worksheet.addRow(rowData);
      row.getCell(1).style = dataStyle;
      row.getCell(4).style = dataStyle;
      worksheet.mergeCells(`A${row.number}:C${row.number}`);
      worksheet.mergeCells(`D${row.number}:G${row.number}`);
    });

    const extra = worksheet.addRow(["", "", "", "", "", "", ""]);
    extra.getCell(1).style = dataStyle;
    extra.getCell(4).style = dataStyle;
    worksheet.mergeCells(`A19:C19`);
    worksheet.mergeCells(`D19:G19`);

    worksheet.addRow(["Box Contents"]).eachCell((cell) => {
      cell.style = headerStyle;
    });
    worksheet.mergeCells(`A${worksheet.rowCount}:G${worksheet.rowCount}`);

    const boxHeaderRow = worksheet.addRow([
      "BOXES",
      "SN. NO",
      "DESCRIPTION",
      "HS CODE",
      "QUANTITY",
      "UNIT RATE",
      "AMOUNT (USD)",
    ]);
    boxHeaderRow.eachCell((cell) => {
      cell.style = headerStyle;
    });

    shipmentData.Boxes.forEach((box: any, boxIndex: number) => {
      const contentCount = box.BoxesContent.length;
      box.BoxesContent.forEach((content: any, contentIndex: number) => {
        const row = worksheet.addRow([
          contentIndex === 0 ? `BOX - ${boxIndex + 1}` : "",
          contentIndex + 1,
          content.description,
          content.HsCode || "",
          content.quantity || "",
          content.unitRate || "",
          content.total || "",
        ]);

        const isFirstRow = contentIndex === 0;
        const isLastRow = contentIndex === contentCount - 1;
        const rowStyle: Partial<ExcelJS.Style> = {
          font: { size: 11 },
          border: {
            left: { style: "thick" },
            right: { style: "thick" },
            ...(isFirstRow ? { top: { style: "thin" } } : {}),
            ...(isLastRow ? { bottom: { style: "thin" } } : {}),
          },
          alignment: { horizontal: "left", vertical: "middle" },
        };

        row.eachCell((cell) => {
          cell.style = rowStyle;
        });
        row.getCell(2).style = {
          font: { size: 11 },
          border: {
            left: { style: "thick" },
            right: { style: "thick" },
            ...(isFirstRow ? { top: { style: "thin" } } : {}),
            ...(isLastRow ? { bottom: { style: "thin" } } : {}),
          },
          alignment: { horizontal: "center", vertical: "middle" },
        };
        row.getCell(4).style = {
          font: { size: 11 },
          border: {
            left: { style: "thick" },
            right: { style: "thick" },
            ...(isFirstRow ? { top: { style: "thin" } } : {}),
            ...(isLastRow ? { bottom: { style: "thin" } } : {}),
          },
          alignment: { horizontal: "center", vertical: "middle" },
        };
        row.getCell(5).style = {
          font: { size: 11 },
          border: {
            left: { style: "thick" },
            right: { style: "thick" },
            ...(isFirstRow ? { top: { style: "thin" } } : {}),
            ...(isLastRow ? { bottom: { style: "thin" } } : {}),
          },
          alignment: { horizontal: "center", vertical: "middle" },
        };
        row.getCell(6).style = {
          font: { size: 11 },
          border: {
            left: { style: "thick" },
            right: { style: "thick" },
            ...(isFirstRow ? { top: { style: "thin" } } : {}),
            ...(isLastRow ? { bottom: { style: "thin" } } : {}),
          },
          alignment: { horizontal: "center", vertical: "middle" },
        };
        row.getCell(7).style = {
          font: { size: 11 },
          border: {
            left: { style: "thick" },
            right: { style: "thick" },
            ...(isFirstRow ? { top: { style: "thin" } } : {}),
            ...(isLastRow ? { bottom: { style: "thin" } } : {}),
          },
          alignment: { horizontal: "center", vertical: "middle" },
        };
      });
    });

    const totalQuantity = shipmentData.Boxes.reduce((sum: number, box: any) => {
      return (
        sum +
        box.BoxesContent.reduce((boxSum: number, content: any) => {
          return boxSum + (parseFloat(content.quantity) || 0);
        }, 0)
      );
    }, 0);
    const footerRow1 = worksheet.addRow([
      "Total Quantity",
      "",
      "",
      "",
      totalQuantity,
      "Grand Total",
      `${shipmentData.invoiceTotal}`,
    ]);
    footerRow1.getCell(1).style = {
      font: { size: 11, bold: true },
      alignment: { horizontal: "left", vertical: "middle" },
      border: {
        top: { style: "thick" },
        bottom: { style: "thick" },
        left: { style: "thick" },
        right: { style: "thick" },
      },
    };
    footerRow1.getCell(5).style = {
      alignment: { horizontal: "center", vertical: "middle" },
      font: { size: 11 },
      border: {
        top: { style: "thick" },
        left: { style: "thick" },
        right: { style: "thick" },
      },
    };
    footerRow1.getCell(7).style = {
      alignment: { horizontal: "center", vertical: "middle" },
      font: { size: 11 },
      border: {
        top: { style: "thick" },
        left: { style: "thick" },
        right: { style: "thick" },
      },
    };
    footerRow1.getCell(6).style = footerStyle;

    worksheet.mergeCells(`A${footerRow1.number}:D${footerRow1.number}`);

    const footerRow2 = worksheet.addRow([
      `AMOUNT IN WORDS: USD ${toWords(shipmentData.invoiceTotal).toUpperCase()} Only.`,
      "",
      "",
      "",
      "",
      `TOTAL: `,
      `${shipmentData.invoiceTotal}`,
    ]);
    footerRow2.getCell(1).style = footerStyle;
    footerRow2.getCell(6).style = footerStyle;
    footerRow2.getCell(7).style = {
      font: { size: 11, bold: true },
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thick" },
        bottom: { style: "thick" },
        left: { style: "thick" },
        right: { style: "thick" },
      },
    };
    worksheet.mergeCells(`A${footerRow2.number}:E${footerRow2.number}`);
    // worksheet.mergeCells(`F${footerRow2.number}:G${footerRow2.number}`);

    const footerRow3 = worksheet.addRow([
      "NOTES",
      "",
      "",
      "SIGNATURE / STAMP",
      "",
      "",
      "",
    ]);
    footerRow3.getCell(1).style = footerStyle;
    footerRow3.getCell(4).style = footerStyle;
    worksheet.mergeCells(`A${footerRow3.number}:C${footerRow3.number}`);
    worksheet.mergeCells(`D${footerRow3.number}:G${footerRow3.number}`);

    const footerRow4 = worksheet.addRow([
      "We hereby confirm and declare that the goods mentioned above are manufactured in Nepal, and we affirm that all other details and descriptions provided are accurate and truthful to the best of our knowledge",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
    footerRow4.getCell(1).style = {
      font: { size: 11, bold: true },
      alignment: { horizontal: "left", vertical: "middle", wrapText: true },
      border: {
        top: { style: "thick" },
        bottom: { style: "thick" },
        left: { style: "thick" },
        right: { style: "thick" },
      },
    };
    footerRow4.getCell(4).style = footerStyle;
    worksheet.mergeCells(`A${footerRow4.number}:C${footerRow4.number}`);
    worksheet.mergeCells(`D${footerRow4.number}:G${footerRow4.number}`);
    footerRow4.height = 125;

    const updatedBuffer = await workbook.xlsx.writeBuffer();
    const fileName = `Shipment_${awbNumberAsNum}_Invoice.xlsx`;
    saveAs(
      new Blob([updatedBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      fileName
    );
  } catch (err) {
    console.error("Error creating Excel file:", err);
  }
};
