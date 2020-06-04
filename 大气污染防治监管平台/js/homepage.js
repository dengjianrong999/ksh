var vmData = {
	// 执法监察情况
	enforce: [{
		name: '荔湾区',
		prises: '6',
		strength: '96',
		frequency: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		strength: '96',
		frequency: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		strength: '96',
		frequency: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		strength: '96',
		frequency: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		strength: '96',
		frequency: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		strength: '96',
		frequency: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		strength: '96',
		frequency: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		strength: '96',
		frequency: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		strength: '96',
		frequency: '13',
	}, {
		name: '荔湾区',
		prises: '6',
		strength: '96',
		frequency: '13',
	}],
	// 地图树形
	treesList:[
		{
			name:"空气质量站点",
			num:52,
			img:"images/kongizhan.png"
		},
		{
			name:"烟气排放监测",
			num:52,
			img:"images/yanqi.png"
		},
		{
			name:"油烟在线监测",
			num:52,
			img:"images/youyan.png"
		},
		{
			name:"加油站油气回收监控",
			num:52,
			img:"images/jiayouzhan.png"
		},
		{
			name:"VOC在线监测",
			num:52,
			img:"images/VOC.png"
		},
		{
			name:"扬尘在线监测",
			num:52,
			img:"images/yangchen.png"
		},
		{
			name:"机动车遥感在线监测",
			num:52,
			img:"images/yaoganjiance.png"
		}
	],
	// 地图选中的值
	SelectData:["空气质量站点"],
	map:null,
};

var vm = new Vue({
	el: "#whole",
	data: vmData,
	mounted() {
		this.scrollBar() // 判断是否应加滚动条
		this.vehicleChart() // 机动车排放监管
		this.dustChart() // 扬尘监管巡查问题
		this.standardChart() // 优良天数达标情况
		this.initmap()
	},
	watch: {},
	methods: {
		// echarts字体大小
		'fontSize': function (a) {
			let windowWidth = document.body.clientWidth;
			return (size = 20 * (windowWidth / 1920) * a);
		},
		// 判断是否应加滚动条
		'scrollBar': function () {
			// 水环境实时数据
			var enforceTheads = document.querySelector('.enforceTheads')
			var enforceTbodys = document.querySelector('.enforceTbodys')
			var enforceTbodysUl = document.querySelector('.enforceTbodys ul')
			enforceTbodys.clientHeight < enforceTbodysUl.clientHeight ? enforceTheads.style.paddingRight = '8px' : '';
		},
		// 机动车排放监管
		'vehicleChart': function () {
			var myChart = echarts.init(document.getElementById('vehicleChart'));
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: ["#82c91e", "#82bee4"],
				legend: {
					data: ['合格车辆'],
					itemWidth: this.fontSize(1.25),
					itemHeight: this.fontSize(0.7),
					textStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				xAxis: {
					name: '万辆',
					nameTextStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					axisLabel: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				yAxis: {
					data: ['检测车辆'],
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					axisLabel: {
						color: '#bbe7ff',
						fontSize: this.fontSize(0.8),
					},
				},
				series: [{
					name: '合格车辆',
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(1.9),
					data: [20],
					label: {
						normal: {
							distance: this.fontSize(0.75),
							show: true,
							position: ["93%", '-90%'],
							formatter: function (p) {
								var nums = p.value / option.series[1].data
								nums = nums.toFixed(2) * 100 + '%'
								return '合格率' + nums
							},
							color: '#fff'
						}
					},
					z: 2,
				}, {
					name: '检测总数',
					type: 'bar',
					barGap: '-100%',
					barWidth: this.fontSize(1.9),
					data: [24],
					label: {
						normal: {
							distance: this.fontSize(0.75),
							show: true,
							position: ["95%", '-90%'],
							formatter: '检测总数',
							color: '#fff'
						}
					},
					z: 1,
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		},
		// 扬尘监管巡查问题
		'dustChart': function () {
			var myChart = echarts.init(document.getElementById('dustChart'));
			var indicatorData = [{
				text: '工地路面100%硬底化',
				max: 100,
			}, {
				text: '施工现场100%围蔽',
				max: 100,
			}, {
				text: '暂不开发的场地100%绿化',
				max: 100,
			}, {
				text: '土地砂土100%覆盖',
				max: 100,
			}, {
				text: '出工地车辆100%冲净车轮本身',
				max: 100,
			}, {
				text: '拆除工程100%洒水压尘',
				max: 100,
			}]
			var seriesData = [83, 30, 159, 48, 47, 3]

			var seriesDataValue = []
			var sum = seriesData.reduce(function (prev, cur, index, seriesData) {
				return prev + cur;
			})
			for (var i = 0; i < seriesData.length; i++) {
				var nums = seriesData[i] / sum
				seriesDataValue.push(
					nums = nums.toFixed(2) * 100
				)
			}
			var option = {
				tooltip: {},
				radar: [{
					indicator: indicatorData,
					center: ['50%', '50%'],
					radius: this.fontSize(3.2),
					startAngle: 90,
					splitNumber: 4,
					shape: 'circle',
					name: {
						formatter: function (value) {
							var a = ''
							for (var i = 0; i < indicatorData.length; i++) {
								if (value == indicatorData[i].text) {
									a = seriesData[i] + '个  ' + option.series[0].data[0].value[i]
								}
							}
							return value + '\n' + a + '%'
						},
						textStyle: {
							color: '#bbe7ff',
							fontSize: this.fontSize(0.7),
						}
					},
					splitArea: {
						areaStyle: {
							color: [],
						}
					},
					axisLine: {
						lineStyle: {
							color: '#79b4db',
							type: 'dashed'

						}
					},
					splitLine: {
						lineStyle: {
							color: '#79b4db',
							type: 'dashed'
						}
					}
				}],
				series: [{
					name: '雷达图',
					type: 'radar',
					symbol: 'none',
					emphasis: {
						lineStyle: {
							width: 4
						}
					},
					data: [{
						value: seriesDataValue,
						areaStyle: {
							color: 'rgba(130,201,30, 0.4)'
						},
						lineStyle: {
							color: 'rgba(130,201,30, 1)'
						}
					}]
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		},
		// 优良天数达标情况
		'standardChart': function () {
			var myChart = echarts.init(document.getElementById('standardChart'));
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: ["#1da7ff", "#82c91e"],
				legend: {
					data: ['2019年', '2020年'],
					itemWidth: this.fontSize(1.25),
					itemHeight: this.fontSize(0.7),
					textStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				xAxis: {
					name: '月',
					nameTextStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
					axisLine: {
						lineStyle: {
							color: '#013be8'
						}
					},
					axisLabel: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				yAxis: {
					name: '天',
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
							color: '#013be8'
						}
					},
					axisLabel: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				series: [{
					name: '2019年',
					type: 'bar',
					barGap: 0,
					markLine: {
						silent: true,
						data: [{
							name: '达标线',
							type: 'median',
							symbolSize: 0,
							yAxis: 24,
							lineStyle: {
								color: '#ff962a',
								type: 'dashed'
							},
							label: {
								formatter: '达标线'
							},
						}]
					},
					barWidth: this.fontSize(0.4),
					data: [24, 25, 18, 24, 25, 18, 24, 25, 18, 24, 25, 18]
				}, {
					name: '2020年',
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(0.4),
					data: [10, 10, 20, 10, 10, 20, 10, 10, 20, 10, 10, 20]
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
						"#82c91e",
						"#1da7ff",
						"#f15214",
						"#9390cf",
						"#f67f56",
					];
					return {
						color: "#1283fb",
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
