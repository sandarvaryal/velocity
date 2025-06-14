// import axios from "axios";

// export const handlePrint = async (awbNumberAsNum: string) => {
//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_BACKEND_URL}/api/getShipment/${awbNumberAsNum}`,
//       { withCredentials: true }
//     );

//     const shipmentData = response.data;

//     const invoiceContent = `
//       <div style="font-family: Arial, sans-serif; padding: 20px; width: 600px; border: 2px solid black; border-radius: 10px; box-shadow: 5px 5px 10px rgba(0,0,0,0.1);">
//         <h2 style="text-align: center; margin-bottom: 10px; color: #333;">APEX GLOBAL LOGISTIC PVT LTD</h2>
//         <p style="text-align: center; font-size: 14px; color: #666;">TRACK YOUR SHIPMENT IN: <strong style="color: #000;">APEXFTE.COM</strong></p>
//         <hr style="border-top: 2px solid #000; margin: 10px 0;">
//         <p><strong>AWB NUMBER:</strong> <span style="color: #0056b3;">${shipmentData.awbNumber || ""}</span></p>
//         <p><strong>Destination:</strong> ${shipmentData.destination || ""}</p>
//         <hr style="border-top: 1px dashed #ccc;">
//         <div>
//           <h3 style="margin-bottom: 5px; color: #444;">Shipper</h3>
//           <p><strong>Name:</strong> ${shipmentData.shipper?.name || ""}</p>
//           <p><strong>Address:</strong> ${shipmentData.shipper?.address || ""}</p>
//           <p><strong>Phone:</strong> ${shipmentData.shipper?.phone || ""}</p>
//         </div>
//         <div style="margin-top: 15px;">
//           <h3 style="margin-bottom: 5px; color: #444;">Consignee</h3>
//           <p><strong>Name:</strong> ${shipmentData.consignee?.name || ""}</p>
//           <p><strong>Address:</strong> ${shipmentData.consignee?.address || ""}</p>
//           <p><strong>Phone:</strong> ${shipmentData.consignee?.phone || ""}</p>
//         </div>
//         <hr style="border-top: 1px dashed #ccc;">
//         <p><strong>Description of Goods:</strong> ${shipmentData.goods || ""}</p>
//         <p><strong>Shipment Value:</strong> <span style="color: #d9534f;">${shipmentData.value || ""}</span></p>
//         <p><strong>Payment Method:</strong> ${shipmentData.payment || ""}</p>
//         <p><strong>Booking Date:</strong> ${shipmentData.bookingDate || ""}</p>
//         <hr style="border-top: 2px solid #000; margin: 10px 0;">
//         <p style="text-align: right;"><strong>Signature:</strong> <span style="border-bottom: 1px solid #000; padding-right: 50px;">_______________</span></p>
//       </div>
//     `;

//     const iframe = document.createElement("iframe");
//     iframe.style.position = "absolute";
//     iframe.style.width = "0px";
//     iframe.style.height = "0px";
//     iframe.style.border = "none";
//     document.body.appendChild(iframe);

//     const iframeDoc = iframe.contentWindow?.document;
//     if (iframeDoc) {
//       iframeDoc.open();
//       iframeDoc.write(invoiceContent);
//       iframeDoc.close();

//       iframe.contentWindow?.focus();
//       iframe.contentWindow?.print();

//       document.body.removeChild(iframe);
//     }
//   } catch (err) {
//     console.log("Error fetching shipment data: ", err);
//   }
// };

import axios from "axios";
import QRCode from "qrcode";

export const handlePrint = async (awbNumberAsNum: string) => {
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
    const qrLink = `https://thevelocitycourier.com/tracking/${shipmentData.awbNumber}`;
    const qrSVGString = await QRCode.toString(qrLink, { type: "svg" });

    const invoiceContent = `
    <div style="width: 800px; font-family: Arial, sans-serif; border: 2px solid black; padding: 20px; line-height: 1.5;">

    <!-- HEADER -->
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center;">
      <img src="/vello.png" alt="Velocity Logo" style="height: 125px; margin-right: 10px;">

        <div>
          <h2 style="margin: 0; font-size: 30px;">Velocity Courier Pvt. Ltd.</h2>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Track your shipment in:</strong> https://thevelocitycourier.com/tracking/${shipmentData.awbNumber}</p>
        </div>
      </div>
      <div style="text-align: right;">
        <p style="margin: 0; font-size: 20px;"><strong>AWB NUMBER</strong></p>
        <h3 style="margin: 5px 0; font-size: 26px;">${shipmentData.awbNumber || ""}</h3>
        
      </div>
    </div>
  
    <hr style="border-top: 2px solid #000; margin: 15px 0;">
  
    <!-- ACCOUNT & DESTINATION    -->
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px; border: 1px solid black;"><strong>ORIGIN:</strong> [NP] NEPAL</td>
        <td style="padding: 10px; border: 1px solid black;"><strong>DESTINATION:</strong> ${shipmentData.consignee.country || ""}</td>
      </tr>
    </table>
 
   
  
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td style="padding: 10px; border: 1px solid black;"><strong>NO OF BOXES:</strong> ${shipmentData.Boxes.length || ""}</td>
        <td style="padding: 10px; border: 1px solid black;"><strong>ACTUAL WEIGHT:</strong> ${shipmentData.totalActualWeightKg || ""}</td>
        <td style="padding: 10px; border: 1px solid black;"><strong>CHARGEABLE WEIGHT:</strong>${shipmentData.totalChargeableWeightKg || ""}</td>
        <td style="padding: 10px; border: 1px solid black;"><strong>VOLUMETRIC WEIGHT:</strong> ${shipmentData.totalVolumetricWeightKg || ""}</td>
        <td style="padding: 10px; border: 1px solid black;"><strong>INVOICE TOTAL:</strong> USD ${shipmentData.invoiceTotal || ""} Only.</td>
      </tr>
    </table>
  
    <hr style="border-top: 1px dashed #ccc; margin: 15px 0;">
  
    <!-- SHIPPER & CONSIGNEE -->
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 50%; padding: 10px; border: 1px solid black; vertical-align: top;">
          <h3 style="margin-bottom: 5px; font-size: 16px;">SHIPPER</h3>
          <p><strong>Name: </strong>${shipmentData.consignor?.name || ""}</p>
          <p><strong>Country: </strong>${shipmentData.consignor?.country || ""} ${shipmentData.consignor?.country || ""}</p>
          <p><strong>State: </strong>${shipmentData.consignor?.state || ""}</p>
          <p><strong>City: </strong>${shipmentData.consignor?.city || ""}</p>
          <p><strong>Address1: </strong>${shipmentData.consignor?.address1 || ""}</p>
          <p><strong>Address2: </strong>${shipmentData.consignor?.address2 || ""}</p>
          <p><strong>Postal Code: </strong>${shipmentData.consignor?.zip || ""}</p>
          <p><strong>Phone:</strong> ${shipmentData.consignor?.phoneNumber || ""}</p>
          <p><strong>Email:</strong> ${shipmentData.consignor?.email || ""}</p>
        </td>
        <td style="width: 50%; padding: 10px; border: 1px solid black; vertical-align: top;">
          <h3 style="margin-bottom: 5px; font-size: 16px;">RECEIVER</h3>
          <p><strong>Name: </strong>${shipmentData.consignee?.name || ""}</p>
          <p><strong>Country: </strong>${shipmentData.consignee?.country || ""}</p>
          <p><strong>State: </strong>${shipmentData.consignee?.state || ""}</p>
          <p><strong>City: </strong>${shipmentData.consignee?.city || ""}</p>
          <p><strong>Address1: </strong>${shipmentData.consignee?.address1 || ""}</p>
          <p><strong>Address2: </strong>${shipmentData.consignee?.address2 || ""}</p>\
          <p><strong>Postal Code: </strong>${shipmentData.consignee?.zip || ""}</p>
          <p><strong>Phone:</strong> ${shipmentData.consignee?.phoneNumber || ""}</p>
          <p><strong>Email:</strong> ${shipmentData.consignee?.email || ""}</p>
        </td>
      </tr>
    </table>
  
    <hr style="border-top: 1px dashed #ccc; margin: 15px 0;">
  
    <!-- GOODS & PAYMENT -->
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px; border: 1px solid black;"><strong>DESCRIPTION OF GOODS:</strong>${shipmentData.contentDescriptions || ""}</td>
         
      </tr>
    </table>
  
    <hr style="border-top: 2px solid #000; margin: 15px 0;">
  
    <!-- SIGNATURE & INSURANCE -->
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 50%; padding: 10px; border: 1px solid black; vertical-align: top;">
          <h4 style="margin-bottom: 5px;">Shipper Agreement</h4>
          <p style="font-size: 12px;">Shipper agrees to Velocity Courier Pvt Ltd. Standard terms and conditions apply.</p>
          <p><strong>Shipper’s Signature:</strong> </p>
          <p style="margin-top: 50px;">_______________ </p>
        </td>
        <td style="width: 25%; padding: 10px; border: 1px solid black; vertical-align: top;">
         <div style="display: flex, flex-direction: column">
          <p><strong>Booking Date:</strong> <br> ${getReadableData(shipmentData.date) || ""}</p>
          <div style={height: 10px}> 
           <p style="text-align: center;"><strong> Scan here to track your shipment:</strong> </p> 
          ${qrSVGString}
          <div/>
        </td>
        <td style="width: 25%; padding: 10px; border: 1px solid black; vertical-align: top;">
          <h4 style="margin-bottom: 5px;">Received in Good Condition</h4>
          <p>Name: </p>
          <p style="margin-top: 20px;"> _______________</p>
          <p>Sign: </p>
          <p style="margin-top: 50px;"> _______________</p>
        </td>
      </tr>
    </table>
  
    <hr style="border-top: 2px solid #000; margin: 15px 0;">
    <p style="text-align: right; font-size: 14px;"><strong>Shipper’s Copy</strong></p>
  </div>
    `;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(invoiceContent);
      iframeDoc.close();

      iframe.contentWindow?.focus();
      setTimeout(() => {
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }, 10);

      // document.body.removeChild(iframe);
    }
  } catch (err) {
    console.log("Error fetching shipment data: ", err);
  }
};
