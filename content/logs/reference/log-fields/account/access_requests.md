# Access Requests

The descriptions below detail the fields available for `access_requests`.

{{<table-wrap>}}

| Field | Value | Type |
| -- | -- | -- |
| Action | What type of record is this <br />Possible values are <em>login</em> \| <em>logout</em> | string |
| Allowed | If request was allowed or denied | bool |
| AppDomain | The domain of the Application that Access is protecting | string |
| AppType | The type of the Application that Access is protecting | string |
| AppUUID | Access Application UUID | string |
| Connection | Identity Provider used for the login | string |
| Country | Request's country of origin | string |
| CreatedAt | The date and time the corresponding access request was made (for example, '2021-07-27T00:01:07Z') |  int or string |
| Email | Email of the user who logged in | string |
| IPAddress |  The IP address of the client | string |
| PurposeJustificationPrompt | Justification given by the client when accessing the application | string |
| PurposeJustificationResponse | Source IP of the network session | string |
| RayID | Identifier of the request | string |
| TemporaryAccessApprovers | List of approvers for this access request | array[string] |
| TemporaryAccessDuration | Approved duration for this access request | int |
| UserUID | UID of the user who logged in | string |

{{</table-wrap>}}
