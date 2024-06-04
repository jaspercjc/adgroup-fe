import "./assets/quasar.scss";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import { Notify, Dialog, Ripple } from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
	config: { animations: "all", notify: {} },
	plugins: { Notify, Dialog, Ripple },
};
