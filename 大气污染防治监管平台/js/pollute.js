var vmData = {
	//污染物排放量统计
	sewageIndex: 1,
	sewageData2019: [200, 200, 200, 200, 200],
	sewageData2020: [94, 292, 531, 702, 200],
	// 区域排放统计
	regionIndex: 1,
	regionData2019: [200, 200, 200, 200, 200],
	regionData2020: [94, 292, 531, 702, 200],
	// 废气排放大户
	wastegas: [{
		name: '广东粤华发电有限责任公司',
		blowoff: '97122.77',
	}, {
		name: '广东粤华发电有限责任公司',
		blowoff: '97122.77',
	}, {
		name: '广东粤华发电有限责任公司',
		blowoff: '97122.77',
	}, {
		name: '广东粤华发电有限责任公司',
		blowoff: '97122.77',
	}, {
		name: '广东粤华发电有限责任公司',
		blowoff: '97122.77',
	}, {
		name: '广东粤华发电有限责任公司',
		blowoff: '97122.77',
	}, {
		name: '广东粤华发电有限责任公司',
		blowoff: '97122.77',
	}],
	map:null,
		// 地图树形
		treesList:[
			{
				name:"重点排污单位",
			},
			{
				name:"锅炉企业",
			},
			{
				name:"垃圾焚烧处理厂",
			},
		],
		// 地图选中的值
		SelectData:["重点排污单位"],
};

var vm = new Vue({
	el: "#whole",
	data: vmData,
	mounted() {
		this.scrollBar()
		this.networkChart() // 在线监测设备联网情况
		this.faultChart() // 企业超标缺数处理
		this.boilerChart() // 锅炉整治情况
		this.sewageChart() //污染物排放量统计
		this.regionChart() //区域排放统计
		this.initmap() // map
	},
	watch: {},
	methods: {
		// echarts字体大小
		'fontSize': function(a) {
			let windowWidth = document.body.clientWidth;
			return (size = 20 * (windowWidth / 1920) * a);
		},
		// 判断是否应加滚动条
		'scrollBar': function() {
			// 水环境实时数据
			var wasteTheads = document.querySelector('.wasteTheads')
			var wasteTbodys = document.querySelector('.wasteTbodys')
			var wasteTbodysUl = document.querySelector('.wasteTbodys ul')
			wasteTbodys.clientHeight < wasteTbodysUl.clientHeight ? wasteTheads.style.paddingRight = '8px' : '';
		},
		// 在线监测设备联网情况
		'networkChart': function() {
			var myChart = echarts.init(document.getElementById('networkChart'));
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: ["#1da7ff", "#f7ce29", "#e70000", "#82c91e"],
				legend: {
					data: ['在线数', '停产停运数', '掉线数', '传输率'],
					itemWidth: this.fontSize(1.25),
					itemHeight: this.fontSize(0.7),
					textStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				xAxis: {
					data: ["越秀区", "荔湾区", "海珠区", "天河区", "白云区", "黄埔区", "番禺区", "花都区", "南沙区", "增城区", "从化区"],
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
				yAxis: [{
					type: 'value',
					scale: true,
					name: '个',
					nameTextStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					min: 0,
					axisTick: {
						length: 5
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
					boundaryGap: [0.2, 0.2]
				}, {
					type: 'value',
					scale: true,
					name: '%',
					nameTextStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisTick: {
						length: 5
					},
					axisLabel: {
						color: '#fff',
						fontSize: this.fontSize(.7),
					},
					max: 100,
					min: 0,
					boundaryGap: [0.2, 0.2]
				}],
				series: [{
					name: '在线数',
					type: 'bar',
					barGap: 0,
					yAxisIndex: 0,
					barWidth: this.fontSize(0.3),
					data: [20, 20, 20, 20],
				}, {
					name: '停产停运数',
					type: 'bar',
					barGap: 0,
					yAxisIndex: 0,
					barWidth: this.fontSize(0.3),
					data: [20, 20, 20, 20],
				}, {
					name: '掉线数',
					type: 'bar',
					barGap: 0,
					yAxisIndex: 0,
					barWidth: this.fontSize(0.3),
					data: [20, 20, 20, 20],
				}, {
					name: '传输率',
					type: 'line',
					barGap: 0,
					yAxisIndex: 1,
					barWidth: this.fontSize(0.3),
					data: [25, 25, 25, 25],
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
		// 企业超标缺数处理
		'faultChart': function() {
			var myChart = echarts.init(document.getElementById('faultChart'));
			var seriesData1 = [1400, 1200, 1000, 900];
			var seriesData2 = [2000, 2000, 2000, 2000];
			var seriesData3 = [200, 100, 500, 1600];
			var seriesData4 = [1000, 1500, 800, 1700];
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: ["#1da7ff", "#82bee4", "#6bcd07", "#b4ddd7"],
				legend: {
					data: ['超标次数', '超标已处理', '数据缺失', '缺失已处理'],
					itemWidth: this.fontSize(1.25),
					itemHeight: this.fontSize(0.7),
					textStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				xAxis: [{
					type: 'category',
					data: ["氮氧化物", "二氧化硫", "烟尘", "气流量"],
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				}, {
					type: 'category',
					data: ["氮氧化物", "二氧化硫", "烟尘", "气流量"],
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false
					},
					splitArea: {
						show: false
					},
					splitLine: {
						show: false
					},
				}],
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
					name: '超标已处理',
					type: 'bar',
					zlevel: 2,
					barGap:'100%',
					xAxisIndex:0,
					barWidth: this.fontSize(0.6),
					data: seriesData1,
				}, {
					name: '超标次数',
					type: 'bar',
					zlevel: 1,
					barGap:'100%',
					xAxisIndex:1,
					barWidth: this.fontSize(0.6),
					data: seriesData2,
					label: {
						normal: {
							distance: this.fontSize(0.75),
							show: true,
							position: 'top',
							formatter: function(p) {
								for (var i = 0; i < option.xAxis[0].data.length; i++) {
									if (p.name == option.xAxis[0].data[i]) {
										var nums = seriesData1[i] / p.value * 100
									}
								}
								return nums = nums.toFixed(2) + '%'
							},
							color: '#fff',
							fontSize: this.fontSize(0.7),
						}
					},
				}, {
					name: '缺失已处理',
					type: 'bar',
					zlevel: 2,
					barGap:'100%',
					xAxisIndex:0,
					barWidth: this.fontSize(0.6),
					data: seriesData3,
				}, {
					name: '数据缺失',
					type: 'bar',
					zlevel: 1,
					barGap:'100%',
					xAxisIndex:1,
					barWidth: this.fontSize(0.6),
					data: seriesData4,
					label: {
						normal: {
							distance: this.fontSize(0.75),
							show: true,
							position: 'top',
							formatter: function(p) {
								for (var i = 0; i < option.xAxis[0].data.length; i++) {
									if (p.name == option.xAxis[0].data[i]) {
										var nums = seriesData3[i] / p.value * 100
									}
								}
								return nums = nums.toFixed(2) + '%'
							},
							color: '#fff',
							fontSize: this.fontSize(0.7),
						}
					},
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
		// 锅炉整治情况
		'boilerChart': function() {
			var myChart = echarts.init(document.getElementById('boilerChart'));
			var option = {
				tooltip: {},
				grid: {
					top: this.fontSize(1),
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: ["#82bee4", "#6bcd07"],
				xAxis: {
					name: '台',
					nameTextStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				yAxis: [{
					data: ["燃煤", "生物质", "柴油", "天然气", "其他清洁能源"],
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						color: '#fff',
						fontSize: this.fontSize(.7),
					},
				}],
				series: [{
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(0.6),
					data: [2000, 2000, 2000, 2000, 2000],
					tooltip: {
						show: false
					},
					silent: true,
				}, {
					type: 'bar',
					barGap: '-100%',
					label: {
						normal: {
							distance: this.fontSize(0.75),
							show: true,
							position: ["95%", '-90%'],
							formatter: '{c}台',
							color: '#fff',
							fontSize: this.fontSize(0.7),
						}
					},
					barWidth: this.fontSize(0.6),
					data: [94, 292, 531, 702, 200],
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
		// 切换
		'sewage': function(index) {
			this.sewageIndex = index
			if (index == 1) {
				this.sewageData2019 = [200, 200, 200, 200, 200];
				this.sewageData2020 = [94, 292, 531, 702, 200];
			} else if (index == 2) {
				this.sewageData2019 = [300, 300, 300, 300, 300];
				this.sewageData2020 = [194, 392, 431, 802, 300];
			}
			this.sewageChart()
		},
		// 污染物排放量统计
		'sewageChart': function() {
			var myChart = echarts.init(document.getElementById('sewageChart'));
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				legend: {
					data: ['2019年', '2020年'],
					itemWidth: this.fontSize(1.25),
					itemHeight: this.fontSize(0.7),
					textStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				color: ["#1da7ff", "#82c91e"],
				xAxis: {
					name: '月',
					nameTextStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				yAxis: {
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
					name: '2019年',
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(0.4),
					data: this.sewageData2019,
				}, {
					name: '2020年',
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(0.4),
					data: this.sewageData2020,
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},

		// 切换
		'region': function(index) {
			this.regionIndex = index
			if (index == 1) {
				this.regionData2019 = [200, 200, 200, 200, 200];
				this.regionData2020 = [94, 292, 531, 702, 200];
			} else if (index == 2) {
				this.regionData2019 = [300, 300, 300, 300, 300];
				this.regionData2020 = [194, 392, 431, 802, 300];
			}
			this.regionChart()
		},
		// 区域排放统计
		'regionChart': function() {
			var myChart = echarts.init(document.getElementById('regionChart'));
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				legend: {
					data: ['2019年同期累计', '2020年累计'],
					itemWidth: this.fontSize(1.25),
					itemHeight: this.fontSize(0.7),
					textStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				color: ["#1da7ff", "#82c91e"],
				xAxis: {
					data: ["越秀区", "荔湾区", "海珠区", "天河区", "白云区", "黄埔区", "番禺区", "花都区", "南沙区", "增城区", "从化区"],
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					splitLine: {
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
					name: '2019年同期累计',
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(0.4),
					data: this.regionData2019,
				}, {
					name: '2020年累计',
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(0.4),
					data: this.regionData2020,
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
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
						iconSize:30
					});
					L.marker([feature.properties.center[1],feature.properties.center[0]], {icon:myIcon}).addTo(myLayer);
				 }
			}).addTo(that.map);
		}
		
	}
})
