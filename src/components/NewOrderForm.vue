<template>
  <div>
    <h4>New Order</h4>
    <input
      :disabled="isDisabledForm"
      type="number"
      min="0"
      v-model.number="volume"
    />
    <button
      @click="createOrder('Buy')"
      :disabled="isDisabledForm">Buy</button>
    <button
      @click="createOrder('Sell')"
      :disabled="isDisabledForm">Sell</button>
  </div>
</template>

<script>
import { createNewOrder } from '../services/NewOrderFormService'

export default {
  name: 'NewOrderForm',
  props: {
    selectedSymbol: String,
  },
  data() {
    return {
      volume: 1
    }
  },
  computed: {
    isDisabledForm() {
      return !this.selectedSymbol
    }
  },
  methods: {
    async createOrder(side) {
      try {
        if (this.volume >= 0) {
          await createNewOrder({
            ordType: 'Market',
            symbol: this.selectedSymbol,
            orderQty: this.volume,
            side,
          })
          this.$emit('update-order-history')
        }
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>
