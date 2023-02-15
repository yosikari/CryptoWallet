<template>
    <Line :data="getData" :options="options" />
</template>

<script lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Plugin,
    Filler
} from 'chart.js'
import { Line, Bar } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
)

export default {
    name: 'App',
    components: {
        Line,
        Bar
    },
    props: {
        dataLine: {
            type: Array,
            required: true,
        },
        labelName: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            data: null,
            options: {
                responsive: true,
            }
        }
    },
    computed: {
        getData() {
            return this.data = {
                labels: this.getDataLabels,
                datasets: [
                    {
                        label: this.labelName,
                        fill: true,
                        backgroundColor: '#6262d977',
                        borderColor: '#6262D9',
                        pointRadius: 0,
                        lineTension: 0.2,
                        data: this.dataLine.map(value => value.y),
                    }
                ]
            }
        },
        getDataLabels() {
            return this.dataLine.map(value => {
                const date = new Date(value.x * 1000)
                return `${date.getDate() + 1}.${date.getMonth() + 1}`
            })
        },
    },
}
</script>
