import getShipment from "./getShipment";
import getShipments from "./getShipments";
import bookShipment from "./bookShipment";
import editShipment from "./editShipmentDetails";
import deleteShipment from "./deleteShipment";
import getInfoBy from "./getInfoBy";
import getDashboard from "./getDashboard";
import getTracking from "./getTracking";
import editVerification from "./editVerification";
import editDeparture from "./editDeparture";
import editDelivered from "./editDelivered";
import awbExists from "./awbExists";
import getBlog from "./getBlog";
import postBlog from "./postBlog";
import uploadImage from "./uploadImage";
import getPreData from "./getPreData";

const api = [
  getShipment,
  getShipments,
  bookShipment,
  editShipment,
  deleteShipment,
  getInfoBy,
  getDashboard,
  getTracking,
  editVerification,
  editDeparture,
  editDelivered,
  awbExists,
  getBlog,
  postBlog,
  uploadImage,
  getPreData,
];

export default api;
