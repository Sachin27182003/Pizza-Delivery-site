const cron = require('node-cron');
const order = require('../Schema/orderSchema'); // Make sure the path is correct

console.log("🟢 Scheduler started...");

//Run every minute
cron.schedule('* * * * *', async () => {
  const now = Date.now();

  try {
    // ⏱ 1 min → PREPARING YOUR ORDER
    await order.updateMany(
      {
        status: 'ORDERED',
        createdAt: { $lt: new Date(now - 1 * 60 * 1000) }
      },
      { $set: { status: 'PREPARING YOUR ORDER' } }
    );

    // ⏱ 11 min → ORDER PREPARED - WAITING FOR DELIVERY BOY
    await order.updateMany(
      {
        status: 'PREPARING YOUR ORDER',
        createdAt: { $lt: new Date(now - 11 * 60 * 1000) }
      },
      { $set: { status: 'ORDER PREPARED - WAITING FOR DELIVERY BOY' } }
    );

    // ⏱ 16 min → OUT FOR DELIVERY
    await order.updateMany(
      {
        status: 'ORDER PREPARED - WAITING FOR DELIVERY BOY',
        createdAt: { $lt: new Date(now - 16 * 60 * 1000) }
      },
      { $set: { status: 'OUT FOR DELIVERY' } }
    );

    // ⏱ 31 min → DELIVERED
    await order.updateMany(
      {
        status: 'OUT FOR DELIVERY',
        createdAt: { $lt: new Date(now - 31 * 60 * 1000) }
      },
      { $set: { status: 'DELIVERED' } }
    );

    console.log('✅ Order status cron executed at', new Date().toLocaleTimeString());
  } catch (err) {
    console.error('❌ Error updating order statuses:', err.message);
  }
});
