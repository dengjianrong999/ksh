var vmData = {
	airIndex: 0, // 地图默认AQI
    areaIndex: 0, // 点位或区域
    map:null,
};

var vm = new Vue({
	el: "#whole",
	data: vmData,
	mounted() {
		this.initPrimaryPollutant() //首要污染物占比雷达图
		this.initairLevel() // 每月空气质量等级
		this.initPM() // 每月空气质量等级
		this.initCityRanking() // 全市空气站点排名
		this.initairChange() // 空气质量历史变化
		this.initmap()

	},
	watch: {},
	methods: {
		fontSize(a) {
			let windowWidth = document.body.clientWidth;
			return (size = 20 * (windowWidth / 1920) * a);
		},
		//首要污染物占比雷达图
		initPrimaryPollutant() {
			var PriPollutant = echarts.init(document.getElementById('primary-pollutant'))
			var itemData = [{
					name: '广州市',
					value: [9191.44, 9429, 9429, 9023, 9885, 9020]
				}, {
					name: '荔湾西村',
					value: [8590.67, 4628, 4019, 609, 637, 355]
				}, {
					name: '海珠宝岗',
					value: [1048.68, 290, 290, 0, 80, 0]
				}, {
					name: '越秀公元前',
					value: [518.71, 123, 22, 345, 250, 0]
				}, {
					name: '天河体育西',
					value: [3095.83, 2028, 1874, 154, 263, 370]
				}, {
					name: '越秀麓湖',
					value: [2151.04, 1094, 955, 139, 154, 2560]
				},
				{
					name: '海珠赤岗',
					value: [2151.04, 1094, 955, 139, 154, 2560]
				},
				{
					name: '黄埔大沙地',
					value: [2151.04, 1094, 955, 139, 154, 2560]
				},
				{
					name: '番禺市桥',
					value: [2151.04, 1094, 955, 139, 154, 2560]
				},
				{
					name: '花都新华',
					value: [2151.04, 1094, 955, 139, 154, 2560]
				},
				{
					name: '黄埔镇龙',
					value: [2151.04, 1094, 955, 139, 154, 2560]
				},
				{
					name: '帽峰山',
					value: [2151.04, 1094, 955, 139, 154, 2560]
				},
			]
			var arr = []
			for (var i = 0; i < itemData.length; i++) {
				arr.push({
					name: itemData[i].name,
					value: itemData[i].value,
					areaStyle: {
						normal: {
							// 单项区域填充样式
							color: {
								type: 'linear',
								x: 0, //右
								y: 0, //下
								x2: 1, //左
								y2: 1, //上
								colorStops: [{
										offset: 1,
										color: 'rgba(0,0,0,0)'
									},
									{
										offset: 1,
										color: '#00c2ff'
									}
								],
								globalCoord: false
							},
							opacity: 1 // 区域透明度
						}
					},
					symbolSize: 2.5, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
					label: {
						// 单个拐点文本的样式设置
						normal: {
							show: false // 单个拐点文本的样式设置。[ default: false ]
						}
					},
					itemStyle: {
						normal: {
							//图形悬浮效果
							// borderColor: '#00c2ff',
							// borderWidth: 2.5
						}
					},
					lineStyle: {
						normal: {
							// opacity: 0.5 // 图形透明度
						}
					}
				})
			}
			option = {
				color: ['#6bcd07', '#1da7ff', '#fad028', '#82bee4', '#e7a701', '#15e8fb', '#e70000', '#f46b06', '#d2f102',
					'#82d1ff', '#cd0bea', '#dad0ff'
				],
				tooltip: {
					show: true,
					renderMode: 'html'
				},
				legend: {
					show: true,
					type: "scroll",
					top: 5,
					left: 5,
					itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
					itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
					itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
					orient: 'vertical',
					textStyle: {
						fontSize: this.fontSize(.7),
						color: '#ade3ff'
					},
					data: ['广州市', '荔湾西村', '海珠宝岗', '越秀公园前', '天河体育西', '越秀麓湖', '海珠赤岗', '黄埔大沙地', '番禺市桥', '花都新华', '黄埔镇龙', '帽峰山']
				},
				radar: [{
					indicator: [{
							text: 'PM2.5'
						},
						{
							text: 'PM10'
						},
						{
							text: 'CO'
						},
						{
							text: 'NO2'
						},
						{
							text: 'O3'
						},
						{
							text: 'SO2'
						}
					],

					textStyle: {
						color: 'red'
					},
					center: ['60%', '50%'],
					radius: 80,
					startAngle: 90,
					splitNumber: 4,
					nameGap: 5,
					orient: 'horizontal', // 图例列表的布局朝向,默认'horizontal'为横向,'vertical'为纵向.
					name: {
						formatter: '{value}',
						textStyle: {
							fontSize: this.fontSize(.7), //外圈标签字体大小
							color: '#fff' //外圈标签字体颜色
						}
					},
					splitArea: {
						// 坐标轴在 grid 区域中的分隔区域，默认不显示。
						show: true,
						areaStyle: {
							// 分隔区域的样式设置。
							color: 'rgba(0,0,0,0)' // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
						}
					},
					// axisLabel:{//展示刻度
					//     show: true
					// },
					axisLine: {
						//指向外圈文本的分隔线样式
						lineStyle: {
							color: '#013bc8'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#013bc8', // 分隔线颜色
							width: 1 // 分隔线线宽
						}
					}
				}],
				series: [{
					name: '雷达图',
					type: 'radar',
					itemStyle: {
						emphasis: {
							lineStyle: {
								width: 4
							}
						}
					},
					data: arr
				}]
			}
			PriPollutant.setOption(option)
			window.addEventListener("resize", function() {
				PriPollutant.resize();
			});
		},
		// 每月空气质量等级
		initairLevel() {
			var airLevel = echarts.init(document.getElementById('air-level'))
			option = {
				grid: {
					left: "3%",
					top: "5%",
					right: "3%",
					bottom: 0,
					containLabel: true
				},
				color: ["#78135f",
					"#b90f1a",
					"#c6611f",
					"#b9941b",
					"#56b31f",
				],
				legend: {
					show: false,
					icon: "rect",
					data: ['优', '良', '轻度', '中度', '重度', '严重']
				},
				tooltip: {
					trigger: "axis",
					formatter: function(params) {
						var str = "";
						for (var i = 0; i < params.length; i++) {
							if (params[i].seriesName !== "") {
								str +=
									params[i].name +
									":" +
									params[i].seriesName +
									params[i].value +
									"<br/>";
							}
						}
						return str;
					}
				},
				xAxis: [{
					type: "category",
					data: ["1月", "2月", "3月", "4月", "5月", "6月"],
					// axisPointer: {
					//     type: "shadow"
					// },
					axisLabel: {
						textStyle: {
							color: '#fff',
							fontSize: this.fontSize(.7),
						}
					},
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: false
					}
				}],
				yAxis: [{
					type: "value",
					name: "",
					nameTextStyle: {
						color: '#fff',
						fontSize: this.fontSize(.7),
					},
					axisLabel: {
						show: false,
					},
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: false,
					}
				}, ],
				series: [{
					name: '优',
					type: 'bar',
					stack: 'air',
					barWidth: this.fontSize(1.9),
					data: ['28', '28', '28', '28', '28', '28', '29', '27', '28', '29', '30', '29'],

				}, {
					name: '良',
					type: 'bar',
					stack: 'air',
					barWidth: this.fontSize(1.9),
					data: ['20', '25', '23', '21', '24', '23', '24', '25', '25', '23', '24', '26'],
				}, {
					name: '轻度',
					type: 'bar',
					stack: 'air',
					barWidth: this.fontSize(1.9),
					data: ['20', '25', '23', '21', '24', '23', '24', '25', '25', '23', '24', '26'],
				}, {
					name: '中度',
					type: 'bar',
					stack: 'air',
					barWidth: this.fontSize(1.9),
					data: ['20', '25', '23', '21', '24', '23', '24', '25', '25', '23', '24', '26'],
				}, {
					name: '重度',
					type: 'bar',
					stack: 'air',
					barWidth: this.fontSize(1.9),
					data: ['20', '25', '23', '21', '24', '23', '24', '25', '25', '23', '24', '26'],
				}, {
					name: '严重',
					type: 'bar',
					stack: 'air',
					barWidth: this.fontSize(1.9),
					data: ['20', '25', '23', '21', '24', '23', '24', '25', '25', '23', '24', '26'],
				}]
			};
			airLevel.setOption(option)
			window.addEventListener("resize", function() {
				airLevel.resize();
			});
		},
		// PM2.5达标情况
		initPM() {
			var pmechart = echarts.init(document.getElementById('pm-standard'))
			option = {
				color: ["#ff962a", '#82c91e'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						lineStyle: {
							color: '#ddd'
						}
					},
					backgroundColor: 'rgba(255,255,255,1)',
					padding: [5, 10],
					textStyle: {
						color: '#7588E4',
					},
					extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
				},
				grid: {
					left: '3%',
					right: '8%',
					bottom: '0%',
					top: '20%',
					containLabel: true
				},
				legend: {
					textStyle: {
						color: '#fff'
					},
					right: 20,
					orient: 'vertical',
					data: ['2019年', '2020年']
				},
				xAxis: {
					name: "月",
					nameTextStyle: {
						color: "#fff"
					},
					type: 'category',
					data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
					boundaryGap: false,
					splitLine: {
						show: true,
						interval: 'auto',
						lineStyle: {
							color: ['#013bc8']
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						margin: 10,
						textStyle: {
							color: '#fff',
							fontSize: this.fontSize(.7),
						}
					}
				},
				yAxis: {
					name: "μg/m³",
					nameTextStyle: {
						color: "#fff"
					},
					type: 'value',
					splitLine: {
						lineStyle: {
							color: ['#013bc8']
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						margin: 10,
						textStyle: {
							color: '#fff',
							fontSize: this.fontSize(.7),
						}
					}
				},
				series: [{
						name: '2019年',
						type: 'line',
						smooth: true,
						showSymbol: false,
						itemStyle: {
							color: '#ff962a',
						},
						markLine: {
							silent: true,
							data: [{
								name: '达标线',
								type: 'median',
								symbolSize: 0,
								yAxis: 30,
								lineStyle: {
									color: '#ff962a',
									type: 'dashed'
								},
								label: {
									formatter: '达标线'
								},
							}]
						},

						data: ['28', '28', '28', '28', '28', '28', '29', '27', '28', '29', '30', '29'],

					},
					{
						name: '2020年',
						type: 'line',
						itemStyle: {
							color: '#82c91e',
						},
						smooth: true,
						showSymbol: false,
						symbol: 'circle',
						data: ['20', '25', '23', '21', '24', '23', '24', '25', '25', '23', '24', '26'],
					}
				]
			};
			pmechart.setOption(option)
			window.addEventListener("resize", function() {
				pmechart.resize();
			});
		},
		// 全市空气站点排名
		initCityRanking() {
			var airRanking = echarts.init(document.getElementById('airRanking'))
			option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '0%',
					top: '5%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ["荔湾西村", "海珠宝岗", "越秀公园前", "天河体育西", "越秀麓湖", "海珠赤沙", "海珠赤沙", "番禺市桥", "花都新华", "黄埔镇龙"],
					splitLine: {
						show: true,
						lineStyle: {
							color: ['#013bc8']
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						margin: 10,
						rotate: 45,
						textStyle: {
							color: '#fff',
							fontSize: this.fontSize(.7),
						}
					}
				},
				yAxis: {
					name: "指数",
					nameTextStyle: {
						color: "#fff"
					},
					type: 'value',
					splitLine: {
						lineStyle: {
							color: ['#013bc8']
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						margin: 0,
						textStyle: {
							color: '#fff',
							fontSize: this.fontSize(.7),
						}
					}
				},
				series: [{
					name: '指数',
					type: 'bar',
					barWidth: this.fontSize(1.25),
					itemStyle: {
						//通常情况下：
						normal: {
							//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
							color: function(params) {
								console.log(params.dataIndex)
								var colorList = ['#49005e', '#d40f7a', '#e70000', '#e7a701', '#fad028', '#6bcd07', '#6bcd07', '#6bcd07',
									'#6bcd07', '#6bcd07'
								];
								return colorList[params.dataIndex];
							}
						},
					},
					data: [100, 100, 200, 334, 390, 330, 220, 100, 120, 120]
				}]
			};
			airRanking.setOption(option)
			window.addEventListener("resize", function() {
				airRanking.resize();
			});
		},
		// 空气质量历史变化
		initairChange() {
			var airchange = echarts.init(document.getElementById('airChange'))
			var color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074',
				'#546570', '#c4ccd3'
			];
			option = {
				title: {
					text: '',
					left: 'center'
				},
				tooltip: {
					trigger: 'axis',
					padding: [2, 10],
					textStyle: {
						fontSize: 16
					}
				},
				xAxis: {
					type: 'category',
					splitLine: {
						lineStyle: {
							color: ['#013bc8']
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						margin: 0,
						rotate: 45,
						textStyle: {
							color: '#fff',
							fontSize: this.fontSize(.7),
						}
					},
					data: ["1月1日", "1月2日", "1月3日", "1月4日", "1月5日", "1月6日", "1月7日", "1月8日", "1月9日", "1月10日", "1月11日", "1月12日",
						"1月13日",
					]
				},
				grid: {
					left: '20%',
					right: '4%',
					bottom: '0%',
					top: "15%",
					containLabel: true
				},
				visualMap: [{
					show: true,
					pieces: [{
						gt: 0,
						lte: 50,
						color: '#6BCD01'
					}, {
						gt: 51,
						lte: 100,
						color: '#FAD028'
					}, {
						gt: 101,
						lte: 150,
						color: '#e7a701'
					}, {
						gt: 151,
						lte: 200,
						color: '#E70000'
					}, {
						gt: 201,
						lte: 300,
						color: '#D40F7A'
					}, {
						gt: 300,
						color: '#49005E'
					}],
					textStyle: {
						color: '#fff',
					},
					top: 0,
					seriesIndex: 0,

				}],
				yAxis: {
					name: "指数",
					nameTextStyle: {
						color: "#fff"
					},
					type: 'value',
					splitLine: {
						lineStyle: {
							color: ['#013bc8']
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: '#013bc8'
						}
					},
					axisLabel: {
						margin: 0,
						textStyle: {
							color: '#fff',
							fontSize: this.fontSize(.7),
						}
					}
				},
				series: [{
					type: 'line',
					showSymbol: false,
					symbolSize: 10,
					smooth: true,
					data: [120, 90, 34, 65, 89, 115, 113, 201, 220, 130, 300, 320, 330],

				}]
			};
			airchange.setOption(option)
			window.addEventListener("resize", function() {
				airchange.resize();
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
		},

		addPoint() {

		},
		// 地图右侧空气类型切换
		changeAir(Inx) {
			this.airIndex = Inx;
		},
		//点位，区域
		changeMapType(Inx) {
			this.areaIndex = Inx;
		}
	}
})
