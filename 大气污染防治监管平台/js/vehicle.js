var vmData = {
	// 监测总量排名
	monitorIndex: 1,
	monitorData: [50, 40, 30, 20, 10],
	// 非道路移动机械备案情况
	roadIndex: 1,
	roadData: [50, 40, 30, 20, 10],
	// 实时监控
	realtime: [{
		plate: '湘B5SL55',
		result: '合格',
		times: '2020-04-19 15:20:22',
		name: '大康',
	}, {
		plate: '湘B5SL55',
		result: '合格',
		times: '2020-04-19 15:20:22',
		name: '大康',
	}, {
		plate: '湘B5SL55',
		result: '不合格',
		times: '2020-04-19 15:20:22',
		name: '大康',
	}, {
		plate: '湘B5SL55',
		result: '合格',
		times: '2020-04-19 15:20:22',
		name: '大康',
	}, {
		plate: '湘B5SL55',
		result: '合格',
		times: '2020-04-19 15:20:22',
		name: '大康',
	}, {
		plate: '湘B5SL55',
		result: '合格',
		times: '2020-04-19 15:20:22',
		name: '大康',
	}, {
		plate: '湘B5SL55',
		result: '合格',
		times: '2020-04-19 15:20:22',
		name: '大康',
	}],
	// 超标监测信息
	quota: [{
		plate: '湘B5SL55',
		name: '科丰路',
		times: '2020-04-19 15:20:22',
		term: 'NO、林格曼黑度',
	}, {
		plate: '湘B5SL55',
		name: '科丰路',
		times: '2020-04-19 15:20:22',
		term: 'NO、林格曼黑度',
	}, {
		plate: '湘B5SL55',
		name: '科丰路',
		times: '2020-04-19 15:20:22',
		term: 'NO、林格曼黑度',
	}, {
		plate: '湘B5SL55',
		name: '科丰路',
		times: '2020-04-19 15:20:22',
		term: 'NO、林格曼黑度',
	}, {
		plate: '湘B5SL55',
		name: '科丰路',
		times: '2020-04-19 15:20:22',
		term: 'NO、林格曼黑度',
	}, {
		plate: '湘B5SL55',
		name: '科丰路',
		times: '2020-04-19 15:20:22',
		term: 'NO、林格曼黑度',
	}, {
		plate: '湘B5SL55',
		name: '科丰路',
		times: '2020-04-19 15:20:22',
		term: 'NO、林格曼黑度',
	}],
	map:null,
};

var vm = new Vue({
	el: "#whole",
	data: vmData,
	mounted() {
		this.scrollBar()
		this.protecChart() // 环保监测不合格燃料占比
		this.monitorChart() // 监测总量排名
		this.roadChart() //非道路移动机械备案情况
		this.initmap()
		this.initmapPie('p-right-yy',80,'#1da7ff')//遥测站已开检
		this.initmapPie('p-right-ww',20,'#fad028')//遥测站未开检
		this.initmapPie('p-right-y',68,'#1da7ff')//检测站已开测
		this.initmapPie('p-right-w',32,'#fad028')//检测站未开测
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
			// 实时监控
			var realtimeTheads = document.querySelector('.realtimeTheads')
			var realtimeTbodys = document.querySelector('.realtimeTbodys')
			var realtimeTbodysUl = document.querySelector('.realtimeTbodys ul')
			realtimeTbodys.clientHeight < realtimeTbodysUl.clientHeight ? realtimeTheads.style.paddingRight = '8px' : '';
			// 超标监测信息
			var quotaTheads = document.querySelector('.quotaTheads')
			var quotaTbodys = document.querySelector('.quotaTbodys')
			var quotaTbodysUl = document.querySelector('.quotaTbodys ul')
			quotaTbodys.clientHeight < quotaTbodysUl.clientHeight ? quotaTheads.style.paddingRight = '8px' : '';
		},
		// 环保监测不合格燃料占比
		'protecChart': function() {
			var myChart = echarts.init(document.getElementById('protecChart'));
			var option = {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				color: ["#6bcd07", "#fad028", "#e70000"],
				legend: {
					left: 'center',
					top: 'top',
					itemWidth: this.fontSize(1.25),
					itemHeight: this.fontSize(0.7),
					textStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
					data: ['汽油', '柴油', '其他']
				},
				series: [{
					name: '首检',
					type: 'pie',
					radius: ['35%', '70%'],
					center: ['25%', '60%'],
					roseType: 'radius',
					label: {
						position: 'inside',
						formatter: '{d}%'
					},
					data: [{
						value: 10,
						name: '汽油'
					}, {
						value: 5,
						name: '柴油'
					}, {
						value: 15,
						name: '其他'
					}]
				}, {
					name: '首检',
					type: 'pie',
					radius: ['0', '35%'],
					center: ['25%', '60%'],
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: [
							'{a|{b}}',
							'{b|{c}%}'
						].join('\n'),

						rich: {
							a: {
								fontWeight: 'normal',
								color: '#333',
								fontSize: this.fontSize(0.8),
							},
							b: {
								fontSize: this.fontSize(0.8),
								fontWeight: 'bold',
								color: '#333',
							}
						}
					},
					itemStyle: {
						color: '#fff'
					},
					data: [{
						value: '24.81',
						name: '不合格率'
					}],
					tooltip: {
						formatter: '{a}:</br>{b}:{c}%'
					}
				}, {
					name: '复检',
					type: 'pie',
					radius: ['35%', '70%'],
					center: ['75%', '60%'],
					roseType: 'area',
					label: {
						position: 'inside',
						formatter: '{d}%',
						fontSize: this.fontSize(0.8),
						color: '#fff'
					},
					data: [{
						value: 10,
						name: '汽油'
					}, {
						value: 5,
						name: '柴油'
					}, {
						value: 15,
						name: '其他'
					}]
				}, {
					name: '复检',
					type: 'pie',
					radius: ['0', '35%'],
					center: ['75%', '60%'],
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: [
							'{a|{b}}',
							'{b|{c}%}'
						].join('\n'),

						rich: {
							a: {
								fontWeight: 'normal',
								color: '#333',
								fontSize: this.fontSize(0.8),
							},
							b: {
								fontSize: this.fontSize(0.8),
								fontWeight: 'bold',
								color: '#333',
							}
						}
					},
					itemStyle: {
						color: '#fff'
					},
					data: [{
						value: '6.53',
						name: '不合格率'
					}],
					tooltip: {
						formatter: '{a}:</br>{b}:{c}%'
					}
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
		// 监测总量排名
		'monitor': function(index) {
			this.monitorIndex = index
			if (index == 1) {
				this.monitorData = [50, 40, 30, 20, 10]
			} else if (index == 2) {
				this.monitorData = [10, 20, 30, 40, 50]
			}
			this.monitorChart()
		},
		'monitorChart': function() {
			var myChart = echarts.init(document.getElementById('monitorChart'));
			var option = {
				tooltip: {},
				grid: {
					right: 0,
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: ["#1da7ff"],
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
					name: '千辆',
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
					barWidth: this.fontSize(0.8),
					data: this.monitorData,
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
		// 非道路移动机械备案情况
		'roadBtu': function(index) {
			this.roadIndex = index
			if (index == 1) {
				this.roadData = [50, 40, 30, 20, 10]
			} else if (index == 2) {
				this.roadData = [10, 20, 30, 40, 50]
			}
			this.roadChart()
		},
		'roadChart': function() {
			var myChart = echarts.init(document.getElementById('roadChart'));
			var option = {
				tooltip: {},
				grid: {
					top: this.fontSize(1.5),
					right: 0,
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: ["#1da7ff"],
				xAxis: {
					data: ["国1", "国2", "国3", "国4", "国5", "电动"],
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
					name: '台',
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
					barGap: 0,
					barWidth: this.fontSize(.8),
					data: this.roadData,
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
						iconSize: 30
					});
					L.marker([feature.properties.center[1], feature.properties.center[0]], { icon: myIcon }).addTo(myLayer);
				}
			}).addTo(that.map);
		},
		initmapPie(id,num,color){
			var myChart = echarts.init(document.getElementById(id));
			option = {
				color: ['#666'], 
				title: {
					text: num+'%',
					x: 'center',
					y: 'center',
					textStyle: {
						fontWeight: 'normal',
						color: '#fff',
						fontSize: this.fontSize(.8)
					}
				},
				series: [{
					name: 'Line 1',
					type: 'pie',
					clockWise: true,
					radius: ['70%', '90%'],
					itemStyle: {
						normal: {
							label: {
								show: false
							},
							labelLine: {
								show: false
							}
						}
					},
					hoverAnimation: false, 
					data: [{
						value: num,
						itemStyle: {
							color:color,
						}
					}, {
						value: 100-num
					}]
				}]
			}
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});

		}
		
	}
})
