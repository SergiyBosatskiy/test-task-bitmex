<template>
  <div id="app">
    <div class="container">
      <active-instrument
        :selectedSymbol="selectedSymbol"
        @select-symbol="selectSymbol"
      />
      <trade-bucketed
        :selectedSymbol="selectedSymbol"
      />
      <new-order-form
        :selectedSymbol="selectedSymbol"
        @update-order-history="getHistoryOrderItems"
      />
    </div>
    <history-order
      :historyOrderItems="historyOrderItems"
    />
  </div>
</template>

<script>
import HistoryOrder from './components/HistoryOrder'
import ActiveInstrument from './components/ActiveInstrument'
import NewOrderForm from './components/NewOrderForm'
import TradeBucketed from './components/TradeBucketed'
import { getHistoryOrder } from './services/HistoryOrderService'

export default {
  name: 'App',
  components: {
    HistoryOrder,
    ActiveInstrument,
    NewOrderForm,
    TradeBucketed,
  },
  data() {
    return {
      selectedSymbol: null,
      historyOrderItems: [],
    }
  },
  mounted() {
    this.getHistoryOrderItems()
  },
  methods: {
    selectSymbol(symbol) {
      this.selectedSymbol = symbol
    },
    async getHistoryOrderItems() {
      try {
        this.historyOrderItems = await getHistoryOrder()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
