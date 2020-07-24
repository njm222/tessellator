<template>
  <div>
    <h2>User Distribution</h2>
    <GChart
      :settings="{ packages: ['geochart'] }"
      type="GeoChart"
      :data="this.chartData"
      :options="this.chartOptions"
      class="map"
    />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { GChart } from 'vue-google-charts'
import { firebaseRef } from '@/services/firebase-utils'

@Component({
  components: { GChart }
})
export default class UserGeoChart extends Vue {
  data () {
    return {
      chartData: [],
      chartOptions: {
        chart: {
          title: 'sample title',
          subtitle: 'sample subtitle'
        },
        geochartVersion: 11,
        keepAspectRatio: true,
        backgroundColor: '',
        datalessRegionColor: '#01161E',
        defaultColor: '#42b983',
        colorAxis: {
          colors: ['#EF476F', '#FFC43D', '#42B983']
        },
        legend: 'none'
      }
    }
  }

  beforeMount () {
    this.loadMapData()
  }

  loadMapData () {
    this.chartData = [['Country', 'Users']]
    const userCountryCountRef = firebaseRef.firebase.firestore().collection('aggregateUserData').doc('userCountryCount')
    userCountryCountRef.get().then((snapshot) => {
      const data = snapshot.data()
      if (data) {
        Object.entries(data).forEach(item => {
          this.chartData.push(item)
        })
        const orderedData = Object.keys(data).sort((a, b) => {
          return data[b] - data[a]
        })
        this.chartOptions.colorAxis.maxValue = data[orderedData[1]] * 1.3
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.map {
  width: 70%;
  margin: 0 15%;
}
</style>
