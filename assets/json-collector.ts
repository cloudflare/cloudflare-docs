import * as get_started from "data/learning-paths/get-started.json";
import * as optimize_site_speed from "data/learning-paths/optimize-site-speed.json";
import * as application_security from "data/learning-paths/application-security.json";
import * as replace_vpn from "data/learning-paths/replace-vpn.json";
import * as dns_filtering from "data/learning-paths/dns-filtering.json";
import * as load_balancing from "data/learning-paths/load-balancing.json";
import * as workers from "data/learning-paths/workers.json";
import * as prevent_ddos_attacks from "data/learning-paths/prevent-ddos-attacks.json";
import * as get_started_free from "data/learning-paths/get-started-free.json";
import * as cybersafe from "data/learning-paths/cybersafe.json";
import * as zero_trust_web_access from "data/learning-paths/zero-trust-web-access.json";
import * as defense_in_depth from "data/learning-paths/defense-in-depth.json";

let learning_paths = [
  get_started_free,
  load_balancing,
  prevent_ddos_attacks,
  workers,
  get_started,
  replace_vpn,
  dns_filtering,
  optimize_site_speed,
  application_security,
  cybersafe,
  zero_trust_web_access,
  defense_in_depth
];

export { learning_paths };
