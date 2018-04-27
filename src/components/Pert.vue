<template>
  <div class="pert">
    <div id="chart"></div>
    <div class="top-options">
      <router-link to="/" class="uk-button uk-button-default uk-button-small">
				<span class="uk-margin-small-right" uk-icon="chevron-left"></span>Go back</router-link>
    </div>
    <div class="right-options">
      <button @click="zoomIn" class="uk-button uk-button-default uk-button-small" type="button">
        <span uk-icon="plus"></span></button>
      <button @click="zoomOut" class="uk-button uk-button-default uk-button-small" type="button">
        <span uk-icon="minus"></span></button>
    </div>
    <div class="bottom-options">
      <button class="uk-button uk-button-default uk-button-small" type="button">
        <span class="uk-margin-small-right" uk-icon="download"></span>Exports</button>
      <div uk-dropdown>
          <ul class="uk-nav uk-dropdown-nav">
              <li class="uk-nav-header">Save as</li>
              <li><a @click="saveAsPng">Png</a></li>
              <li><a @click="saveAsJpg">Jpg</a></li>
              <li><a @click="saveAsPdf">Pdf</a></li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import anychart from 'anychart';

export default {
  name: "pert",
  props: {
    tasks: Array
  },
  data() {
    return {
      chart: anychart.pert(),
      horizontalSpacing: 6
    }
  },
  methods: {
    saveAsPng() {
      this.chart.saveAsPng({
        "width": 500,
        "height": 360,
        "quality": 0.3,
        "filename": "Pert PNG"
      });
    },
    saveAsJpg() {
      this.chart.saveAsJpg({
        "width": 500,
        "height": 360,
        "quality": 0.3,
        "forceTransparentWhite": false,
        "filename": "Pert JPG"
      });
    },
    saveAsPdf() {
      this.chart.saveAsPdf({
        "filename": "Pert PDF"
      });
    },
    zoomIn() {
      this.horizontalSpacing++;
      this.chart.horizontalSpacing(this.horizontalSpacing + '%');
    },
    zoomOut() {
      this.horizontalSpacing--;
      this.chart.horizontalSpacing(this.horizontalSpacing + '%');
    }
  },
  mounted() {
    // set chart data
    this.chart.data(this.tasks, "asTable");

    this.chart.milestones().labels().fontSize(10);
    // this.chart.verticalSpacing(80);
    this.chart.horizontalSpacing(this.horizontalSpacing + '%');
    this.chart.milestones().size(30);

    // get project duration
    const duration = this.chart.getStat("pertChartProjectDuration");

    // set the chart title to show the duration
    this.chart.title("The duration equals " + duration);

    // set the container id for the chart
    this.chart.container("chart");

    this.chart.criticalPath({milestones: {fill: "#FF4040", selectFill: "#92000A"}});
    
    // disable context menu
    this.chart.contextMenu(false);

    // initiate drawing the chart
    this.chart.draw();

    this.$nextTick(() => {
      var credits = document.querySelector(".anychart-credits");
      credits.style.display = 'none';
    });
  }
};
</script>

<style scoped>
#chart {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 20px;
}

.top-options,
.bottom-options,
.right-options {
  position: absolute;
}

.top-options {
  top: 10px;
  left: 10px;
}

.right-options {
  right: 10px;
  bottom: 10px;
}

.bottom-options {
  bottom: 10px;
  left: 10px;
}
</style>
