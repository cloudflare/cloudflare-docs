import * as get_started from "./json/get-started.json";
import * as optimize_site_speed from "./json/optimize-site-speed.json";
import * as application_security from "./json/application-security.json";
import * as partners_integrations from "./json/technology-partner-integrations.json";

let learning_paths = [
  get_started["default"],
  optimize_site_speed["default"],
  application_security["default"],
  partners_integrations["default"],
];

export { learning_paths };