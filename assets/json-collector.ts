import * as get_started from "./json/get-started.json";
import * as optimize_site_speed from "./json/optimize-site-speed.json";
import * as application_security from "./json/application-security.json";
import * as replace_vpn from "./json/replace-vpn.json";
import * as learn_bots from "./data/learning-paths/learn_bots.json";
import * as load_balancing from "./data/learning-paths/load-balancing.json";

let learning_paths = [
  get_started["default"],
  optimize_site_speed["default"],
  application_security["default"],
  replace_vpn["default"],
  learn_bots,
  load_balancing
];

export { learning_paths };