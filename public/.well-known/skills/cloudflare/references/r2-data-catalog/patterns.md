## Common Use Cases

### 1. Log Analytics Pipeline

**Scenario:** Ingest and query application logs

```python
from pyiceberg.catalog.rest import RestCatalog
import pyarrow as pa
import pandas as pd

# Setup catalog
catalog = RestCatalog(
    name="logs_catalog",
    warehouse=WAREHOUSE,
    uri=CATALOG_URI,
    token=TOKEN,
)

catalog.create_namespace_if_not_exists("logs")

# Create schema for logs
log_schema = pa.schema([
    ("timestamp", pa.timestamp("ms")),
    ("level", pa.string()),
    ("service", pa.string()),
    ("message", pa.string()),
    ("user_id", pa.int64()),
])

# Create table
logs_table = catalog.create_table(
    ("logs", "application_logs"),
    schema=log_schema,
)

# Append logs incrementally
log_data = pa.table({
    "timestamp": [pd.Timestamp.now(), pd.Timestamp.now()],
    "level": ["ERROR", "INFO"],
    "service": ["auth-service", "api-gateway"],
    "message": ["Failed login attempt", "Request processed"],
    "user_id": [12345, 67890],
})

logs_table.appen