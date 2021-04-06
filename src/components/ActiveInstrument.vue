<template>
  <div>
    <h4>Instrument</h4>
    <table class="instrument__table">
      <tr>
        <th>Symbol</th>
        <th>Price</th>
      </tr>
      <tr
        v-for="item in items"
        class="selectable-row"
        :class="isActive(item.symbol)"
        :key="item.symbol"
        @click="selectSymbol(item.symbol)"
      >
        <td>{{ item.symbol }}</td>
        <td>{{ item.lastPrice }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getActiveInstrument, updateActiveInstrument } from '../services/ActiveInstrumentService'

export default {
  name: 'ActiveInstrument',
  data() {
    return {
      items: []
    }
  },
  props: {
    selectedSymbol: String,
  },
  async mounted() {
    try {
      this.items = await getActiveInstrument()
      updateActiveInstrument()
        .subscribe(this.updateItems)
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    selectSymbol(symbol) {
      this.$emit('select-symbol', symbol)
    },
    updateItems(data) {
      data.forEach(item => {
        if (typeof item.markPrice !== 'undefined') {
          const findSybol = this.items.find(({ symbol }) => symbol === item.symbol)
          if (findSybol) {
            findSybol.lastPrice = item.markPrice
          }
        }
      })
    },
    isActive(symbol) {
      return {
        active: symbol === this.selectedSymbol
      }
    }
  }
}
</script>
