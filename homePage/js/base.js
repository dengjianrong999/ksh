
$(function(){

    $(".dropdown").mouseover(function () {
        $(this).addClass("open");
    });

    $(".dropdown").mouseleave(function(){
        $(this).removeClass("open");
    })
	
    var myChart = echarts.init(document.getElementById('charts2'));
	option = {
		title: {
			text: '',
			textStyle: {
				fontSize: 14,
				paddingLeft: 10,
				color: '#111111',
			},
			left: 40,
			top: 10,
		},

		tooltip: {},
		legend: {
			x: 'right',
		},
		xAxis: {
			data: ["张镇镇", "大孙各庄镇","北务镇","李遂镇","木林镇","南彩镇","北小营镇","李桥镇","高丽营镇","赵全营镇","北石槽镇","龙湾屯镇","仁和地区","马坡地区","南法信地区","天竺镇","后沙峪镇","仁和镇"],
			 axisLabel: {
                            interval:0,
                            rotate:40
                        }

		},
		 yAxis: [{
	        x: 40,
	        splitLine: {
	            show: true,
	            lineStyle: {
	                // 使用线条颜色
	                color: ['#ededed']
	            }
	        }
	    }],
		
		series: [{
			type: 'bar',
			barWidth: 12,
			data: [32, 50,20,30,22,42,46,49,60,83,18,26,35,38,42,46,48,52],
			right: ['70%', '100%'], //图的位置
			itemStyle: {
				normal: {
					//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
					color: function(params) {
						// build a color map as your need.
						var colorList = [
							'#c1d381', '#b1604e', '#6ec08b', '#e87251', '#db995b',
							'#db995b', '#e87251', '#6ec08b', '#b1604e', '#c1d381',
							'#b1604e', '#6ec08b', '#e87251', '#db995b', '#c1d381',
							'#b1604e', '#6ec08b', '#e87251'
						];
						return colorList[params.dataIndex]
					},
					//以下为是否显示，显示位置和显示格式的设置了
					label: {
						show: false,
						position: 'top',
						//                             formatter: '{c}'
						formatter: '{b}\n{c}'
					}
				}
			},

		}]
	};
	myChart.setOption(option, true)
	
	/*
    var myChart = echarts.init(document.getElementById('charts1'));
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            // left:'5%',
            // y:'center',
            bottom:"5%",    
            borderRadius:'20',
            itemWidth:14,                               //图例标记的图形宽度
            itemHeight:14, 
            orient:"horizontal",   
            textStyle: {color: '#333'},
            data:['优','良','轻度','中度','重度','严重']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '60%'],
                center:['30%','40%'],
                avoidLabelOverlap: false,
                label: {                        // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.  
                    normal: {  
                        show: true,             // 是否显示标签[ default: false ]  
                        position: 'outside',    // 标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。  
                        formatter: '{d}%'  // 标签内容  
                    } ,
                },  
                labelLine: {                    // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。  
                    normal: {  
                        show: true,             // 是否显示视觉引导线。  
                        length: 15,             // 在 label 位置 设置为'outside'的时候会显示视觉引导线。  
                        length2: 10,            // 视觉引导项第二段的长度。  
                        lineStyle: {            // 视觉引导线的样式  
                            color: '#309bde',  
                            width: 1  
                        },
                    }  
                },
                data:[
                    {value:335, name:'严重'},
                    {value:310, name:'重度'},
                    {value:234, name:'中度'},
                    {value:135, name:'轻度'},
                    {value:300, name:'良'},
                    {value:600, name:'优'},
                ]
            }
        ],
        color: ['#8f4a7b','#b15e49','#e7704d','#db9755','#c1d47e','#6ac188']
    };
    myChart.setOption(option);
    */
})

/**
 * 跳转到旭城系统
 * @param type 系统类型
 * @param url 登录成功后跳转的页面
 * @param username 用户名
 * @param password 密码
 * @returns
 */
function jump2Xc(type,url,username,password){
	var baseUrl = "";
	if(type=="gas"){
		baseUrl = "http://suncereltd.6655.la:8089/Home/LogOn?ReturnUrl=";
		url = baseUrl+url;
		$("#hideForm").attr("action",url);
	}else if(type=="water"){
		baseUrl = "http://suncereltd.6655.la:8085/Home/LogOn?ReturnUrl=";
		url = baseUrl+url;
		$("#hideForm").attr("action",url);
	}
	$("#username").val(username);
	$("#password").val(password);
	$("#hideForm").submit();
}

/**
 * 打开问题反馈列表
 * @returns
 */
function openProblemList(){
	
}
