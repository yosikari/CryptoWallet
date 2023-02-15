<template>
  <div class="statistic">
    <h1>Statistic:</h1>

    <h2 v-if="rate">1$ = {{ rate }} BTC</h2>

    <article>
      <LineChart v-if="avgBlock" :dataLine="avgBlock" labelName="Avg size" />
    </article>

    <article>
      <LineChart v-if="marketHistory" :dataLine="marketHistory" labelName="Market history" />
    </article>

  </div>
</template>

<script>
import { bitcoinService } from '@/services/bitcoin.service.js'
import LineChart from '@/cmps/line-chart.vue'

export default {
  data() {
    return {
      rate: null,
      avgBlock: null,
      marketHistory: null,
    }
  },
  async created() {
    this.rate = await bitcoinService.getRate()
    this.marketHistory = await bitcoinService.getMarketPriceHistory()
    this.avgBlock = await bitcoinService.getAvgBlockSize()
  },
  components: {
    LineChart,
  },
}
</script>