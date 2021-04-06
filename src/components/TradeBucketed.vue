<template>
  <div class="trade-bucketed">
    <h4>Quotation history
      <span class="trade-bucketed__selected" v-if="selectedSymbol">({{ selectedSymbol }})</span>
    </h4>
    <table class="trade-bucketed__table" v-if="items.length">
      <tr>
        <th class="w-25">Time</th>
        <th class="w-15">Price open</th>
        <th class="w-15">Price close</th>
        <th class="w-15">Max price</th>
        <th class="w-15">Min price</th>
        <th class="w-15">Volume</th>
      </tr>
      <tr v-for="item in items" :key="item.timestamp">
        <td class="w-25">{{ item.timestamp | formatTime }}</td>
        <td class="w-15">{{ item.open }}</td>
        <td class="w-15">{{ item.close }}</td>
        <td class="w-15">{{ item.high }}</td>
        <td class="w-15">{{ item.low }}</td>
        <td class="w-15">{{ item.volume }}</td>
      </tr>
    </table>
    <div v-else>Please select instrument</div>
  </div>
</template>

<script>
import { getTradeBucketed, updateTradeBucketed } from '../services/TradeBuckedService'
export default {
  name: 'TradeBucketed',
  data() {
    return {
      items: [],
      updateTradeBucketed: updateTradeBucketed(),
      lastSelectedSymbol: null,
    }
  },
  props: {
    selectedSymbol: {
      type: String,
    }
  },
  methods: {
    async getAndSubscribeData() {
      try {
        this.items = await getTradeBucketed(this.selectedSymbol)
        this.updateTradeBucketed
          .subscribe(this.selectedSymbol, this.updateItems)
      } catch (err) {
        console.log(err)
      }
    },
    unsubscribeData() {
      this.updateTradeBucketed
        .unsubscribe(this.lastSelectedSymbol, this.updateItems)
    },
    updateItems(data) {
       const lengthInsertData = data.length
       const items = [ ...this.items ]
       items.unshift(...data)
       items.splice(-1, lengthInsertData)
       this.items = items
     }
  },
  watch: {
    selectedSymbol() {
      if (this.lastSelectedSymbol) {
        this.unsubscribeData()
      }
      this.lastSelectedSymbol = this.selectedSymbol
      this.getAndSubscribeData()
    }
  }
}
</script>
