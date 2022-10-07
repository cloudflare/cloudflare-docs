import * as get_started from "./json/get-started.json";
import * as optimize_site_speed from "./json/optimize-site-speed.json";
import * as application_security from "./json/application-security.json";
import * as replace_vpn from "./json/replace-vpn.json";

let learning_paths = [
  get_started["default"],
  optimize_site_speed["default"],
  application_security["default"],
  replace_vpn["default"],
];

export { learning_paths };