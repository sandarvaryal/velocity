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
];

export default api;
