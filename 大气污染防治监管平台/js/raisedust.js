var vmData = {
	map:null,
		// 地图树形
		treesList:[
			{
				name:"巡查正常",
				img:"images/xuncha-zhengchang.png"
			},
			{
				name:"巡查有问题",
				img:"images/xuncha-youwenti.png"
			},
			{
				name:"竣工",
				img:"images/jungong.png"
			},
			{
				name:"未巡查",
				img:"images/weixuncha.png"
			},
		],
		// 地图选中的值
		SelectData:["巡查正常"],
};

var vm = new Vue({
	el: "#whole",
	data: vmData,
	mounted() {
		this.construChart() // 加油站储油库分布
		this.completeChart() //工地巡查完成情况
		this.worksiteChart() //全市工地巡查情况
		this.monitorChart() //在线监控情况
		this.onlineChart() //在线监测报警情况
		this.networkChart() //各区在线监测联网率
		this.initmap()
	},
	watch: {},
	methods: {
		// echarts字体大小
		'fontSize': function(a) {
			let windowWidth = document.body.clientWidth;
			return (size = 20 * (windowWidth / 1920) * a);
		},
		// 加油站储油库分布
		'construChart': function() {
			var myChart = echarts.init(document.getElementById('construChart'));
			var option = {
				tooltip: {},
				grid: {
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				color: ["#1da7ff", "#82c91e", "#fad028", "#e70000"],
				legend: {
					data: ['住建', '水务', '交通', '搅拌站'],
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
					name: '住建',
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}, {
					name: '水务',
					type: 'bar',
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}, {
					name: '交通',
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}, {
					name: '搅拌站',
					type: 'bar',
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
		//工地巡查完成情况
		'completeChart': function() {
			var myChart = echarts.init(document.getElementById('completeChart'));
			var option = {
				grid: {
					top: this.fontSize(1),
					right: this.fontSize(2),
					bottom: '0',
					left: '0',
					containLabel: true,
				},
				xAxis: {
					data: ['在建工地', '巡查工地', '发现问题', '6个100%问题', '已整改工地'],
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						rotate: 30,
						textStyle: {
							color: '#fff',
							fontSize: this.fontSize(0.7)
						}
					}
				},
				yAxis: {
					show: false
				},
				series: [{
					type: 'pictorialBar',
					symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
					label: {
						show: true,
						position: 'top',
						color: '#fff',
						formatter: '{c}个',
						fontWeight: 'bolder',
						fontSize: this.fontSize(0.7),
					},
					itemStyle: {
						normal: {
							color: '#82c91e'
						},
						emphasis: {
							opacity: 1
						}
					},
					data: [123, 60, 25, 18, 12],
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
		// 全市工地巡查情况
		'worksiteChart': function() {
			var myChart = echarts.init(document.getElementById('worksiteChart'));
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
					data: ['在建工地数', '巡查工地数'],
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
					name: '在建工地数',
					type: 'bar',
					barGap: 0,
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}, {
					name: '巡查工地数',
					type: 'bar',
					barWidth: this.fontSize(0.4),
					data: [50, 40, 30, 20, 10],
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
		// 在线监控情况
		'monitorChart': function() {
			var myChart = echarts.init(document.getElementById('monitorChart'));
			var option = {
				title: {
					text: '在线监测联网率',
					bottom: 0,
					left:'center',
					textStyle: {
						fontWeight: 'bold',
						fontSize: this.fontSize(1.2),
						color: "#bbe7ff"
					}
				},
				series: [{
					name: '在线监控',
					type: 'gauge',
					radius: '80%',
					splitNumber: 10,
					min: 0,
					max: 1700,
					title: {
						offsetCenter: [0, '-30%'],
						textStyle: {
							fontWeight: 'bold',
							fontSize: this.fontSize(0.9),
							color: "#bbe7ff"
						}
					},
					detail: {
						formatter: function(p) {
							var nums = p / 1700
							nums = nums.toFixed(2)
							return nums + '%'
						},
						offsetCenter: [0, '70%'],
						fontSize: this.fontSize(0.9),
						fontWeight: 'bold',
					},
					axisLine: {
						lineStyle: {
							width: this.fontSize(0.5),
							color: [
								[0.2, '#82c91e'],
								[0.8, '#1da7ff'],
								[1, '#f39800']
							]
						}
					},
					splitLine: {
						length: this.fontSize(1.1),
						lineStyle: {
							width: this.fontSize(0.075),
							color: 'auto',
						}
					},
					axisTick: {
						show: true,
						splitNumber: 5,
						length: this.fontSize(0.9),
						lineStyle: {
							color: 'auto',
						}
					},
					axisLabel: {
						fontSize: this.fontSize(0.5)
					},
					data: [{
						value: 50,
						name: '纳入率'
					}]
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
		// 在线监测报警情况
		'onlineChart': function() {
			var myChart = echarts.init(document.getElementById('onlineChart'));
			var option = {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				color: ['#1da7ff', '#82c91e', '#ff962a'],
				legend: {
					orient: 'vertical',
					left: this.fontSize(.75),
					itemGap: this.fontSize(1),
					data: ['缺失次数', 'PM2.5超标次数', 'PM10超标次数'],
					itemWidth: this.fontSize(1.25),
					itemHeight: this.fontSize(0.7),
					textStyle: {
						color: '#ffffff',
						fontSize: this.fontSize(0.7),
					},
				},
				series: [{
					name: '在线监测报警',
					type: 'pie',
					radius: ['50%', '70%'],
					center: ['65%', '50%'],
					avoidLabelOverlap: true,
					label: {
						show: true,
						position: 'outside',
						formatter: [
							'{a|{c}次}',
							'{b|{d}%}'
						].join('\n'),
						rich: {
							a: {
								color: '#fff',
								fontSize: this.fontSize(0.7),
							},
							b: {
								color: '#fff',
								fontSize: this.fontSize(0.8),
							},
						}
					},
					emphasis: {
						label: {
							show: true,
							fontSize: this.fontSize(0.8),
						}
					},
					data: [{
						value: 335,
						name: '缺失次数'
					}, {
						value: 310,
						name: 'PM2.5超标次数'
					}, {
						value: 234,
						name: 'PM10超标次数'
					}]
				}]
			};
			myChart.setOption(option);
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		},
		// 各区在线监测联网率
		'networkChart': function() {
			var myChart = echarts.init(document.getElementById('networkChart'));
			var option = {
				tooltip: {},
				grid: {
					top: this.fontSize(1.6),
					right: this.fontSize(2),
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
					min: 0,
					max: 100,
					name: '%',
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
					barWidth: this.fontSize(0.6),
					data: [50, 40, 30, 20, 10],
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
		}
	}
})
