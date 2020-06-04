var vmData = {
    currentIndex:0,// 投诉or监管
    map: null,
    sqList: [
        {
            name: "上月完成涉气污染源检查",
            num: "1734次"
        },
        {
            name: "锅炉检查",
            num: "368次"
        },
        {
            name: "废气检查",
            num: "489次"
        },
        {
            name: "建筑施工检查",
            num: "174次"
        },
        {
            name: "重污染天气检查",
            num: "134次"
        },
        {
            name: "发起立案",
            num: "34宗"
        },
        {
            name: "今年完成涉气污染的中央督办和上级督办案件",
            num: "1734次"
        }
    ]
};

var vm = new Vue({
    el: "#whole",
    data: vmData,
    mounted() {
        this.initmap()
        this.statisticsNum() //涉气类型投诉统计
        this.complaintStatistics()// 各区投诉数量统计
        this.statisticsType()// 投诉方式统计
        this.casepenalty()// 气污染类案件立案处罚
        this.sourceAnalysis() // 执法检查来源分析


    },
    watch: {},
    methods: {
        // echarts字体大小
        'fontSize': function (a) {
            let windowWidth = document.body.clientWidth;
            return (size = 20 * (windowWidth / 1920) * a);
        },
        // barecharts
        initbar(id, color, name, yname, data) {
            var myEcharts = echarts.init(document.getElementById(id));
            option = {
                color: color,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0%',
                    top: "20%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: name,
                        axisTick: {
                            show: false,
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
                            rotate: 45,
                            color: '#fff',
                            fontSize: this.fontSize(.7),
                        },
                    }
                ],
                yAxis: {
                    type: 'value',
                    name: yname,
                    nameTextStyle: {
                        color: '#ffffff',
                        fontSize: this.fontSize(0.7),
                    },
                    axisTick: {
                        show: false,
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
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: this.fontSize(1),
                        data: data,
                    }
                ]
            };
            myEcharts.setOption(option);
            window.addEventListener("resize", function () {
                myEcharts.resize();
            });
        },
        // 涉气类型投诉统计
        statisticsNum() {
            var id = "statistics-num",
                color = ['#1da7ff'],
                name = ['VOC', '烟尘', '烟气', '油烟', '粉尘', '有毒气体', '恶臭气体', '机动车', '工地扬尘', '其他废气'],
                data = [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220];
            yname = '件',
                this.initbar(id, color, name, yname, data)
        },
        // 各区投诉数量统计
        complaintStatistics() {
            var id = "complaint-statistics",
                color = ['#82c91e'],
                name = ['越秀区', '荔湾区', '海珠区', '天河区', '白云区', '黄浦区', '番禺区', '花都区', '南沙区', '增城区', '从化区'],
                data = [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220];
            yname = '次',
                this.initbar(id, color, name, yname, data)
        },
        // 投诉方式统计
        statisticsType() {
            var myEcharts = echarts.init(document.getElementById("statistics-type"));
            option = {
                color: ['#6bcd07', '#1da7ff', '#e7a701', '#e70000', '#950656', '#49005e'],
                tooltip: {
                    trigger: 'item',
                    formatter: '({d}%)'
                },
                legend: {
                    left: '2%',
                    top: '0',
                    orient: 'vertical',
                    data: ['电话投诉', '微信举报', '网上投诉', '信件投诉', '来人来访', '微博投诉'],
                    textStyle: {
                        color: '#fff'
                    },
                },
                series: [
                    {
                        name: '半径模式',
                        type: 'pie',
                        radius: ["30%", "80%"],
                        center: ['60%', '50%'],
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: this.fontSize(.7),
                                    color: '#fff'
                                },
                                formatter: function (param) {
                                    return  Math.round(param.percent) + '%';
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false,
                                length: 0, // 第一段线 长度
                                length2: -10, // 第二段线 长度
                                align: 'right'
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: [
                            { value: 10, name: '电话投诉' },
                            { value: 5, name: '微信举报' },
                            { value: 15, name: '网上投诉' },
                            { value: 25, name: '信件投诉' },
                            { value: 20, name: '来人来访' },
                            { value: 35, name: '微博投诉' },
                        ]
                    },
                ]
            };

            myEcharts.setOption(option);
            window.addEventListener("resize", function () {
                myEcharts.resize();
            });
        },
        // 气污染类案件立案处罚
        casepenalty() {
            var myEcharts = echarts.init(document.getElementById("case-penalty"));
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0%',
                    top: "20%",
                    containLabel: true
                },
                legend: {
                    data: ['处罚案件数', '处罚金额'],
                    textStyle:{
                        color:'#fff'
                    },
                },
                xAxis: [
                    {
                        name:'月',
                        nameGap:20,
                        nameTextStyle: {
                            color: '#ffffff',
                            fontSize: this.fontSize(0.7),
                        },
                        type: 'category',
                        data: ['1', '2', '3', '4', '5'],
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisTick: {
                            show: false,
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
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        nameTextStyle: {
                            color: '#ffffff',
                            fontSize: this.fontSize(0.7),
                        },
                        name: '件',
                        min: 0,
                        max: 500,
                        axisTick: {
                            show: false,
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
                    {
                        type: 'value',
                        nameTextStyle: {
                            color: '#ffffff',
                            fontSize: this.fontSize(0.7),
                        },
                        name: '万元',
                        // interval: 5,
                        min: 0,
                        max: 1000,
                        axisTick: {
                            show: false,
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
                    }
                ],
                series: [
                    {
                        name: '处罚案件数',
                        type: 'bar',
                        barWidth:this.fontSize(1),
                        itemStyle:{
                            color:'#1da7ff'
                        },
                        data: [400, 300, 200, 456, 376,]
                    },
                    {
                        name: '处罚金额',
                        type: 'line',
                        itemStyle:{
                            color:'#82c91e'
                        },
                        yAxisIndex: 1,
                        data: [700, 802, 603, 405, 603]
                    }
                ]
            };
            
            myEcharts.setOption(option);
            window.addEventListener("resize", function () {
                myEcharts.resize();
            });
        },
        // 执法检查来源分析
        sourceAnalysis() {
            var myEcharts = echarts.init(document.getElementById("source-analysisy"));
            let data = [{
                "name": "12369",
                "value": 10
            }, {
                "name": "来访",
                "value": 15
            }, {
                "name": "上级特办",
                "value": 15
            },
            {
                "name": "12345",
                "value": 25
            },
            {
                "name": "来信",
                "value": 10
            },
            {
                "name": "辅助监察",
                "value": 25
            },
            ];
            let color = ["#6bcd07", "#1da7ff ", "#e7a701", "#e70000", "#950656", "#49005e"]

            option = {
                legend: {
                    left: '2%',
                    top: '0',
                    orient: 'vertical',
                    data: ['12369', '来访', '上级特办', '12345', '来信', '辅助监察'],
                    textStyle: {
                        color: '#fff'
                    },
                },
                series: [
                    {
                        color: color,
                        type: 'pie',
                        center: ['60%', '50%'],
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: this.fontSize(.7),
                                    color: '#fff'
                                },
                                formatter: function (param) {
                                    return param.name + ':\n' + Math.round(param.percent) + '%';
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 0, // 第一段线 长度
                                length2: 10, // 第二段线 长度
                                align: 'right'
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: data
                    }
                ]
            }
            myEcharts.setOption(option);
            window.addEventListener("resize", function () {
                myEcharts.resize();
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
        //地图事件类型
        choice(Idx){
            this.currentIndex = Idx;
        }
    }
})
