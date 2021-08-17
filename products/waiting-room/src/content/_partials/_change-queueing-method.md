Though you can change your [queueing method](/reference/queueing-methods), it may affect it may affect users if your waiting room is actively queueing:

- **From FIFO to Random**: Users will no longer be ordered based on their cookie timestamp, which may affect the displayed wait time.
- **From Random to FIFO**: Current users will receive new cookies and be randomly sorted into a FIFO queue. Any new users will be added to the end of the FIFO queue.

<Aside type="note">

If you change the queueing method from FIFO > Random > FIFO, users will be ordered by their original entry time.

</Aside>