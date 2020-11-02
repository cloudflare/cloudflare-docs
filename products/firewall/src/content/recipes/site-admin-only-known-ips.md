# Site administration—Require known IP addresses

If an attack compromises the administrative area of your website, the consequences can be severe. With Firewall Rules, you can protect your site’s administrative area by blocking requests for access to administrative paths that do not come from a known IP address.

The example below limits access to the WordPress administrative area, `/wp-admin/`, by _blocking_ requests that do not originate from a specified set of IP addresses.

To prevent attackers from successfully using a permutation of `/wp-admin/` such as `/wP-AdMiN/`, use the `lower()` [transformation function](https://developers.cloudflare.com/firewall/cf-firewall-language/functions#transformation-functions) to convert the URI path segment to lowercase:

<table>
  <thead>
  <tr>
    <th>Expression</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>not (ip.src in {'{10.20.30.40 192.168.1.0/24}'} and lower(http.request.uri.path) contains "/wp-admin")</code></td>
      <td><em>Block</em></td>
    </tr>
  </tbody>
</table>
