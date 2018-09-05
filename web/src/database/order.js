
function Order() {
  
}

Order.prototype = {

  saveOrders: function (db, orders) {
    const orderTable = db.getSchema().table('orders');
    var rows = [];
    for (var i = 0; i < orders.length; i++) {
      var order = orders[i];
      order.amount = order.amount.toString();
      order.filled_amount = order.filled_amount.toString();
      rows.push(orderTable.createRow({
        'order_id': order.order_id,
        'order_type': order.order_type,
        'quote_asset_id': order.quote_asset_id,
        'base_asset_id': order.base_asset_id,
        'amount': order.amount,
        'filled_amount': order.filled_amount,
        'side': order.side,
        'price': order.price,
        'state': order.state,
        'created_at': order.created_at
      }));
    }
    return db.insertOrReplace().into(orderTable).values(rows);
  },

  fetchOrders: function (callback) {
    const orderTable = this.db.getSchema().table('orders');
    this.db.select().from(orderTable).exec().then(function(rows) {
      callback(rows);
    });
  }

};

export default Order;
