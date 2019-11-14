import L from "leaflet";

const icon = require("../../assets/img/markers/marker-icon.png");
const iconRetina = require("../../assets/img/markers/marker-icon-2x.png");
const iconShadow = require("../../assets/img/markers/marker-shadow.png");

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow
});
