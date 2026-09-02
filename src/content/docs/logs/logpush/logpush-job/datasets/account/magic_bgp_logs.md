---
# Code generator. DO NOT EDIT.

title: Magic BGP Logs
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `magic_bgp_logs`.

## Direction

Type: `string`

Direction of the event relative to Cloudflare. Possible values are <em>to_cloudflare</em> \| <em>from_cloudflare</em>, or empty for non-message events.

## EventData

Type: `object`

Payload describing the event. Schema depends on `EventKind`.<br /><em>open_message</em> carries `peer_asn`, `cloudflare_asn`, `bgp_id`, `hold_time`, and `capabilities`.<br /><em>update_message</em> carries `announced`, `as_path`, and `origin`.<br /><em>notification_message</em> carries `code`, `subcode`, and `reason`.<br /><em>route_refresh_message</em> carries `afi` and `safi`.<br /><em>bgp_state_transition</em> carries `from_state`, `to_state`, and `event`.<br /><em>tcp_handshake_failed</em> carries `reason`, `message`, `src`, and `dst`.<br /><em>stale_path_timer_expired</em> carries `purged_route_count`.<br /><em>session_config_changed</em> carries `disabled` and the changed fields.<br /><em>filter_config_changed</em> carries `import` and `export` filter change flags.<br /><em>redistribute_config_changed</em> carries a single boolean.

## EventKind

Type: `string`

BGP event type. Possible values are <em>open_message</em> \| <em>update_message</em> \| <em>notification_message</em> \| <em>route_refresh_message</em> \| <em>bgp_state_transition</em> \| <em>tcp_handshake_failed</em> \| <em>stale_path_timer_expired</em> \| <em>session_config_changed</em> \| <em>filter_config_changed</em> \| <em>redistribute_config_changed</em>.

## EventTimestamp

Type: `int or string`

Timestamp of when the event occurred.

## TunnelID

Type: `string`

UUID (hex, no hyphens) of the IPsec / GRE tunnel the event belongs to.

## TunnelName

Type: `string`

Name of the IPsec / GRE tunnel the event belongs to.
