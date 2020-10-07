# Video access control

Video Access Control allow you to define Rules to have finer-grained control over your content than signed URL tokens alone. They are primarily aimed at making tokens conditionally valid based on user information. Access Rules are specified on token payloads as the `accessRules` property containing an array of `Rule` objects.

If you're not already familiar with signed URLs, it's recommended to <a href="/stream/security/signed-urls/">start here.</a>

## Rules

A Rule has two components. The `action` is taken if the conditions associated with the `type` matches. Each `type` has an associated field that should be filled, see the <a href="#schema">schema</a> or <a href="#examples">examples</a> for details.

These Rule types are available

- `any` - Match all requests. May be used as a wildcard to apply a default action after other rules.
- `ip.src` - Match specific IPv4 or IPV6 addresses or CIDRs.
- `ip.geoip.country` - Match specific 2-letter country codes in [ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search) format.

These Rule actions are available

- `allow` - View is considered valid.
- `block` - View is considered invalid and a 401 or 403 is returned.

Access Rules are evaluated first-to-last. If a Rule matches, the associated `action` is applied and no further rules are evaluated.

## Schema

A valid Rule object conforms to this type signature:

```
{
	action: "allow" | "block";
	type: "any";
} | {
	action: "allow" | "block";
	type: "ip.src";
	ip: (IPv4CidrRange | IPv6CidrRange | IPv4 | IPv6)[];
} | {
	action: "allow" | "block";
	type: "ip.geoip.country";
	country: string[];
}
```

In the future, Rule types or actions may be added. If you have other types of rules or actions you need for your video application, please contact Cloudflare support.

### Examples

#### Allow only views from specific CIDRs

```
...
"accessRules": [
	{
		"type": "ip.src",
		"action": "allow",
		"ip": ["93.184.216.0/24", "2400:cb00::/32"],
	},
	{
		"type": "any",
		"action": "block",
	}
]
```

The first rule is an IP rule matching on CIDRs, `93.184.216.0/24` and `2400:cb00::/32`. When that rule matches, the `allow` action will abort rule evaluation and consider the view valid.

If the first rule doesn't match, the second rule of `any` will match all remaining requests and block those views.

#### Block views from a specific country

```
...
"accessRules": [
	{
		"type": "ip.geoip.country",
		"action": "block",
		"country": ["US", "DE", "MX"],
	},
]
```

The first rule matches on country, `US`, `DE`, and `MX` here. When that rule matches, the `block` action will have the token considered invalid.

If the first rule doesn't match, there are no further rules to evaluate. The behavior in this situation is to consider the token valid.

#### Allow only views from specific country or IPs

```
...
"accessRules": [
	{
		"type": "ip.geoip.country",
		"country": ["US", "MX"],
		"action": "allow",
	},
	{
		"type": "ip.src",
		"ip": ["93.184.216.0/24", "2400:cb00::/32"],
		"action": "allow",
	},
	{
		"type": "any",
		"action": "block",
	},
]
```

The first rule matches on country, `US` and `MX` here. When that rule matches, the `allow` action will have the token considered valid. If it doesn't match we continue evaluating rules

The second rule is an IP rule matching on CIDRs, `93.184.216.0/24` and `2400:cb00::/32`. When that rule matches, the `allow` action will consider the rule valid.

If the first two rules don't match, the final rule of `any` will match all remaining requests and block those views.

## Usage Notes

### Maximum Rule Count

A token may have at most 5 members in the `accessRules` array.

Note that most Rule types take arrays as arguments. For example, a rule of type `ip.src` can specify multiple IP addresses or CIDRs.

If you require more than 5 rules, please contact Cloudflare support.

### ip.src

It is recommended to include both IPv4 and IPv6 variants in a rule if possible. Having only a single variant in a rule means that rule will ignore the other variant. For example, an IPv4-based rule will never be applicable to a viewer connecting from an IPv6 address.

CIDRs should be preferred over specific IP addresses. Some devices, such as mobile, may change their IP over the course of a view. Video Access Control are evaluated continuously while a video is being viewed. As a result, overly strict IP rules may disrupt playback.
