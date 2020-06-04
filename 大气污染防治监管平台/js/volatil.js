var vmData = {
	// 监督检查执行情况
	supervise: [{
		name: '荔湾区',
		prises: '6',
		stopover: '96',
		inspect: '13',
		unqual: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		stopover: '96',
		inspect: '13',
		unqual: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		stopover: '96',
		inspect: '13',
		unqual: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		stopover: '96',
		inspect: '13',
		unqual: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		stopover: '96',
		inspect: '13',
		unqual: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		stopover: '96',
		inspect: '13',
		unqual: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		stopover: '96',
		inspect: '13',
		unqual: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		stopover: '96',
		inspect: '13',
		unqual: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		stopover: '96',
		inspect: '13',
		unqual: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		stopover: '96',
		inspect: '13',
		unqual: '13',
	}],
	// 地图树形
	treesList: [
		{
			name: "VOC排放企业",
			img: "images/vocpaifang.png"
		},
		{
			name: "加油站",
			img: "images/jiayouzhan1.png"
		},
		{
			name: "储油库",
			img: "images/chuyouku.png"
		},
	],
	map: null,
};

var vm = new Vue({
	el: "#whole",
	data: vmData,
	mounted() {
		this.scrollBar()// 判断是否应加滚动条
		this.dynamicChart() // VOC排放监测动态
		this.policeChart() // VOC排放速率超标报警
		this.oilingChart() // 加油站储油库分布
		this.associatChart() // 油气回收在线监测
		this.initmap()
	},
	watch: {},
	methods: {
		// 判断是否应加滚动条
		'scrollBar': function () {
			var superviseTheads = document.querySelector('.superviseTheads')
			var superviseTbodys = document.querySelector('.superviseTbodys')
			var superviseTbodysUl = document.querySelector('.superviseTbodys ul')
			superviseTbodys.clientHeight < superviseTbodysUl.clientHeight ? superviseTheads.style.paddingRight = '8px' : '';
		},
		// echarts字体大小
		'fontSize': function (a) {
			let windowWidth = document.body.clientWidth;
			return (size = 20 * (windowWidth / 1920) * a);
		},
		// VOC排放监测动态
		'dynamicChart': function () {
			var myChart = echarts.init(document.getElementById('dynamicChart'));
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: "#f39800",
				xAxis: {
					data: ["20:00", "24:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00", "04:00", "08:00", "12:00",
						"16:00"
					],
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						rotate: 45,
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				yAxis: {
					type: 'value',
					name: '吨',
					nameTextStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					splitLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						color: '#fff',
						fontSize: this.fontSize(.7),
					},
				},
				series: [{
					type: 'line',
					barWidth: this.fontSize(0.3),
					data: [20, 15, 12, 18, 20, 15, 12, 18, 20, 15, 12, 18],
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		},
		// VOC排放速率超标报警
		'policeChart': function () {
			var myChart = echarts.init(document.getElementById('policeChart'));
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				visualMap: {
					type: 'piecewise',
					show: false,
					pieces: [{
						min: 41,
						max: 50,
						color: '#ff0000'
					},
					{
						min: 31,
						max: 40,
						color: '#ff962a'
					},
					{
						min: 11,
						max: 30,
						color: '#1da7ff'
					},
					{
						min: 0,
						max: 10,
						color: '#6bcd07'
					}
					]
				},
				xAxis: {
					data: ["番禺区", "花都区", "从化区", "增城区", "黄埔区", "南沙区", "白云区", "海珠区", "天河区", "荔湾区", "越秀区"],
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					axisLabel: {
						rotate: 45,
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				yAxis: {
					type: 'value',
					name: '吨',
					nameTextStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					splitLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						color: '#fff',
						fontSize: this.fontSize(.7),
					},
				},
				series: [{
					type: 'bar',
					barWidth: this.fontSize(0.3),
					data: [50, 40, 30, 20, 10],
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		},
		// 加油站储油库分布
		'oilingChart': function () {
			var myChart = echarts.init(document.getElementById('oilingChart'));
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: ["#82c91e", "#1da7ff"],
				legend: {
					data: ['加油站', '储油库'],
					itemWidth: this.fontSize(1.25),
					itemHeight: this.fontSize(0.7),
					textStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				xAxis: {
					data: ["番禺区", "花都区", "从化区", "增城区", "黄埔区", "南沙区", "白云区", "海珠区", "天河区", "荔湾区", "越秀区"],
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					axisLabel: {
						rotate: 45,
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				yAxis: {
					type: 'value',
					name: '个',
					nameTextStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					splitLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						color: '#fff',
						fontSize: this.fontSize(.7),
					},
				},
				series: [{
					name: '加油站',
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}, {
					name: '储油库',
					type: 'bar',
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		},
		// 油气回收在线监测
		'associatChart': function () {
			var myChart = echarts.init(document.getElementById('associatChart'));
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: ["#6bcd07", "#1da7ff", "#f7ce29", "#e70000"],
				legend: {
					data: ['轻度警告', '重度警告', '7天轻度警告', '7天重度警告'],
					itemWidth: this.fontSize(1.25),
					itemHeight: this.fontSize(0.7),
					textStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				xAxis: {
					data: ["番禺区", "花都区", "从化区", "增城区", "黄埔区", "南沙区", "白云区", "海珠区", "天河区", "荔湾区", "越秀区"],
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					axisLabel: {
						rotate: 45,
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				yAxis: {
					type: 'value',
					name: '次',
					nameTextStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					splitLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						color: '#fff',
						fontSize: this.fontSize(.7),
					},
				},
				series: [{
					name: '轻度警告',
					type: 'bar',
					stack: 'order',
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}, {
					name: '重度警告',
					type: 'bar',
					stack: 'order',
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}, {
					name: '7天轻度警告',
					type: 'bar',
					stack: 'order',
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}, {
					name: '7天重度警告',
					type: 'bar',
					stack: 'order',
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		},
		initmap() {
			let that = this;
			var normalm = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
				maxZoom: 18,
				minZoom: 5
			});
			that.map = L.map("maps", {
				center: [23.103239, 113.450761],
				zoom: 9,
				layers: [normalm],
				zoomControl: false
			});

			var i = -1;

			L.geoJSON(gz, {
				style: function (feature) {
					i++;
					colorList = [
						"#1da7ff",
						"#1da7ff",
						"#1da7ff",
						"#1da7ff",
						"#1da7ff",
					];
					return {
						color: "#fff",
						fillColor: colorList[i++ % 5],
						fillOpacity: .3,
						stroke: true,
						opacity: 0.5,
						weight: 2
					};
				},
				onEachFeature: function (feature, layer) {
					var myLayer = new L.layerGroup();
					myLayer.addTo(that.map);
					var myIcon = L.divIcon({
						html: feature.properties.name,
						className: "my-div-icon",
						iconSize: 30
					});
					L.marker([feature.properties.center[1], feature.properties.center[0]], { icon: myIcon }).addTo(myLayer);
				}
			}).addTo(that.map);
		}

	}
})
