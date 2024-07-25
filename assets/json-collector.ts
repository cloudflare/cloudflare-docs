import * as get_started from "data/learning-paths/get-started.json";
import * as application_security from "data/learning-paths/application-security.json";
import * as replace_vpn from "data/learning-paths/replace-vpn.json";
import * as load_balancing from "data/learning-paths/load-balancing.json";
import * as workers from "data/learning-paths/workers.json";
import * as prevent_ddos_attacks from "data/learning-paths/prevent-ddos-attacks.json";
import * as get_started_free from "data/learning-paths/get-started-free.json";
import * as cybersafe from "data/learning-paths/cybersafe.json";
import * as zero_trust_web_access from "data/learning-paths/zero-trust-web-access.json";
import * as secure_internet_traffic from "data/learning-paths/secure-internet-traffic.json";

export type LearningPath = {
  title: string;
  path: string;
  priority: number;
  description: string;
  products: string[];
  product_group: string;
  additional_groups?: string[];
}

let learning_paths: LearningPath[] = [
  get_started_free,
  load_balancing,
  prevent_ddos_attacks,
  workers,
  get_started,
  replace_vpn,
  application_security,
  cybersafe,
  zero_trust_web_access,
  secure_internet_traffic
];

export { learning_paths };
