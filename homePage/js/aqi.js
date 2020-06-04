
$(function(){
    var myChart1 = echarts.init(document.getElementById('charts1'));
	option = {
	     
	    title: {
	        text: '',
	        subtext: ''
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: [{
	        type: 'category',
	        data: ['10', '11','12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	       // data: [],
	        splitLine: {
	            show: false
	        },
	        axisTick: {
	            alignWithLabel: true
	        }
	    }],
	    yAxis: [{
	        type: 'value',
	        splitLine: {
	            show: true,
	            lineStyle: {
	                // 使用线条颜色
	                color: ['#ededed']
	            }
	        },
	        splitArea: {
	            show: false,
	        },
	    }],
	    series: [{
	        name: 'AQI',
	        type: 'bar',
	       　    barWidth:8,
	        label: {
	            normal: {
	                show: false,
	                position: 'top'
	            }
	        },
	        
	        itemStyle: {
	            normal: {
	                // 定制显示（按顺序）
	                color: function(params) { 
	                	var colorList = ['#6cbf89','#6cbf89','#6cbf89','#6cbf89','#6cbf89', '#6cbf89','#6cbf89','#6cbf89','#6cbf89','#6cbf89','#6cbf89 ','#c2d37e','#c2d37e','#6cbf89','#c2d37e','#c2d37e','#c2d37e','#6cbf89','#c2d37e','#6cbf89','#6cbf89','#6cbf89','#6cbf89', '#6cbf89']; 
	                    return colorList[params.dataIndex] 
	                }
	            },
	        },
	        data: [30, 32, 33, 35, 35, 37, 38, 39, 41, 38, 41, 69, 71, 44,65, 59, 63, 48, 56, 26, 44, 40, 24, 24],
	    }]
	};
	myChart1.setOption(option);
	/*
    $.getJSON("js/aqi20180628.json",function(data){
		console.log(data);
		var rq="aqi"+"01";
		var aqi_json = data;   
		var xdata=['0', '1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
		var seriesdata =  [50, 310, 110, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3,30, 310, 110, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3];
		var colorList = ['#6cbf89','#6cbf89','#6cbf89','#b05d4a','#6cbf89', '#b05d4a','#6cbf89','#db9554','#6cbf89','#db9554','#6cbf89 ','#6cbf89','#6cbf89','#6cbf89','#c2d37e','#c2d37e','#6cbf89','#6cbf89','#c2d37e','#6cbf89','#6cbf89','#6cbf89','#6cbf89', '#6cbf89','#6cbf89','#6cbf89','#6cbf89','#6cbf89','#6cbf89 ','#6cbf89','#6cbf89','#6cbf89','#6cbf89','#6cbf89','#6cbf89','#6cbf89' ];
		myChart1.setOption({        //加载数据图表
            xAxis: {
                data: xdata
            },
            series: [{
                data: seriesdata,
                itemStyle: {
    	            normal: {
    	                // 定制显示（按顺序）
    	                color: function(params) {     	                     
    	                    return colorList[params.dataIndex] 
    	                }
    	            },
    	        }
            }]
        });
    });
    */
})
