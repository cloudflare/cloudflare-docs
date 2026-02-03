## Best Practices

### Authentication & Security
1. **Use Admin Read & Write tokens** for read/write operations
2. **Use Admin Read only tokens** for read-only query engines
3. **Store tokens securely** in environment variables, not code
4. **Rotate tokens regularly** via dashboard
5. **Use catalog-level maintenance** with service tokens for automation

### Performance Optimization
1. **Enable compaction** for all production tables
2. **Choose appropriate target file sizes**:
   - Start with 128 MB for most workloads
   - Tune based on query patterns
3. **Configure snapshot expiration** to match retention requirements
4. **Use partitioning** in table schema for large datasets
5. **Monitor query performance** and adjust compaction settings

### Data Modeling
1. **Use namespaces** to organiz