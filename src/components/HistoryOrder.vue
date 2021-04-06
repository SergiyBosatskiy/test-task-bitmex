<template>
  <div>
    <h4>Order History</h4>
    <table class="history-order__table">
      <tr>
        <th>Time</th>
        <th>Symbol</th>
        <th>Side</th>
        <th>Price</th>
        <th>Volume</th>
        <th>Status</th>
        <th>ID</th>
      </tr>
      <tr v-for="item in historyOrderItems" :key="item.orderID">
        <td>{{ item.timestamp | formatTime }}</td>
        <td>{{ item.symbol }}</td>
        <td>{{ item.side }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.orderQty }}</td>
        <td>{{ item.ordStatus }}</td>
        <td>{{ item.orderID }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HistoryOrder',
  props: {
    historyOrderItems: {
      type: Array,
      default: () => []
    }
  }
}
</script>
