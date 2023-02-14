<template>
  <div class="about">
    <h1>This is an about page</h1>

    <h2 v-if="rate">1$ = {{ rate }} BTC</h2>

    <Bar :data="data" :options="options" />

    <button @click="test">test</button>
    <button @click="setTest">setTest</button>


  </div>
</template>

<script>
import { bitcoinService } from '@/services/bitcoin.service.js'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  data() {
    return {
      rate: null,
      avgBlock: [],
      marketHistory: [],

      marketHistoryTime: [],
      marketHistoryValue: [],

      data: {
        labels: this.marketHistoryTime ||[1,2,3],
        datasets: [{ data: this.marketHistoryValue || [10,20,30] }]
      },
      options: {
        responsive: true
      }
    }
  },
  async created() {
    this.rate = await bitcoinService.getRate()
    this.marketHistory = await bitcoinService.getMarketPriceHistory()
    this.avgBlock = await bitcoinService.getAvgBlockSize()



    // this.marketHistory.forEach(prop => {
    //   this.marketHistoryTime.push(prop.x)
    //   this.marketHistoryValue.push(prop.y)
    // })
  },
  computed: {
  },
  methods: {
    test() {
      console.log(this.data)
    },
    setTest() {
      this.marketHistoryTime = []
      this.marketHistoryValue = []
      this.marketHistory.forEach(prop => {
        this.marketHistoryTime.push(prop.x)
        this.marketHistoryValue.push(prop.y)
      })
      console.log(this.marketHistoryValue)
    }
  },
  components: {
    Bar
  },
}
</script>