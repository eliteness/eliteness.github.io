
function $(_) {return document.getElementById(_);}

document.addEventListener('DOMContentLoaded', function() {
    dexstats();
});


async function dexstats() {

	llama = await (await fetch("https://api.llama.fi/protocol/guru-network-dao")).json();

	llama1 = await (await fetch("https://api.llama.fi/protocol/guru-network")).json();
	llama2 = await (await fetch("https://api.llama.fi/protocol/guru-network-dao")).json();
	let tvl = (llama.currentChainTvls.Fantom).toLocaleString(undefined, {maximumFractionDigits:0});
	//$("topstat-tvl").innerHTML = "$" + tvl;



	echart1 = echarts.init(document.getElementById('chart1'),'dark');


// Sample raw data
const rawData = llama.tokensInUsd;

// Extract unique tokens
const tokensSet = new Set();
rawData.forEach(data => {
    Object.keys(data.tokens).forEach(token => tokensSet.add(token));
});
const tokens = Array.from(tokensSet);

// Transform data into series format
const seriesData = tokens.map(token => ({
    name: token,
    type: 'line',
    stack: 'total',
    smooth: true,
    lineStyle: { width: 0 },
    showSymbol: false,
    label: { position: 'top' },
    areaStyle: { opacity: 1 },
    emphasis: { focus: 'series' },
    data: rawData.map(data => ({
        name: new Date(data.date * 1000).toLocaleDateString(),
        value: Math.ceil(data.tokens[token]) || 0
    }))
}));



// ECharts option object


option = {
  //color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: { text: ('$' + tvl + ' of Assets Locked in eLOCKS'), textStyle: { color: '#fff' } },
  darkMode: true,
  backgroundColor: 'transparent',
  toolbox: { feature: { saveAsImage: {} } },
  grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
  tooltip: {
    trigger: 'axis',
    axisPointer: {},
  },
  legend: {
    data: tokens,
    bottom: 0 ,
    type: 'scroll',
    textStyle: { color: '#fff' },
    itemStyle: {
    /*	color: inherit,
    	opacity: inherit,
    	borderColor: inherit,
    	borderWidth: auto,
    	borderCap: inherit,
    	borderJoin: inherit,
    	borderDashOffset: inherit,
    	borderMiterLimit: inherit
    */
    }
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: rawData.map(data => new Date(data.date * 1000).toLocaleDateString())
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: seriesData
};


	echartOption1 = option;
	echart1.setOption(echartOption1);

	return;

}