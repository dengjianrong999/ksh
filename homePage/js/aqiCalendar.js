
;(function (undefined) {
	var _global;
	$(document).click(function() {
		$("#aqiDetail").hide();
    })
	//工具函数
	//配置合并
	function extend (def,opt,override) {
		for(var k in opt){
			if(opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)){
				def[k] = opt[k]
			}
		}
		return def;
	}
	//日期格式化
	function formartDate (y,m,d,symbol) {
		symbol = symbol || '-';
		m = (m.toString())[1] ? m : '0'+m;
		d = (d.toString())[1] ? d : '0'+d;
		return y+symbol+m+symbol+d
	}
	function formartDate2 (y,m,d) {
		m = (m.toString())[1] ? m : '0'+m;
		d = (d.toString())[1] ? d : '0'+d;
		return y+'年'+m+'月'
	}


	function getCssByAqi(aqi){
		var aqi_int = parseInt(aqi);
		if (aqi_int<=50) return 1;
		if (aqi_int>=51 && aqi_int<=100) return 2; 
		if (aqi_int>=101 && aqi_int<=150) return 3; 
		if (aqi_int>=151 && aqi_int<=200) return 4; 
		if (aqi_int>=201 && aqi_int<=300) return 5; 
		if (aqi_int>300 ) return 6; 
        return 1;
	}
	function Schedule (opt) {
		var def = {},
			opt = extend(def,opt,true),
			curDate = opt.date ? new Date(opt.date) : new Date(),
			year = curDate.getFullYear(),
			month = curDate.getMonth(),
			day = curDate.getDate(),	
			currentYear = curDate.getFullYear(),
			currentMonth = curDate.getMonth(),
			currentDay = curDate.getDate(),
			selectedDate = '',
			el = document.querySelector(opt.el) || document.querySelector('body'),
			_this = this;
		var bindEvent = function (){
			el.addEventListener('click',function(e){
				switch (e.target.id) {
					case 'nextMonth': 
						_this.nextMonthFun();
						break;
					case 'nextYear': 
						_this.nextYearFun();
						break;
					case 'prevMonth': 
						_this.prevMonthFun();
						break;
					case 'prevYear': 
						_this.prevYearFun();
						break;
					default:
						break;
				};
				if(e.target.className.indexOf('currentDate') > -1){
					opt.clickCb && opt.clickCb(year, month+1, e.target.innerHTML,e);
					selectedDate = e.target.title;
					day = e.target.innerHTML;
					render();
				}
			},false)
		}
		var init = function () {
			var scheduleHd = '<div class="schedule-hd">'+
								'<div>'+
									'<span class="arrow icon iconfont icon-116leftarrowheads" id="prevYear" ></span>'+
									'<span class="arrow icon iconfont icon-112leftarrowhead" id="prevMonth"></span>'+
								'</div>'+
								'<div class="today">'+formartDate2(year,month+1,day)+'</div>'+
								'<div>'+
									'<span class="arrow icon iconfont icon-111arrowheadright" id="nextMonth"></span>'+
									'<span class="arrow icon iconfont icon-115rightarrowheads" id="nextYear"></span>'+
								'</div>'+
							'</div>'
			var scheduleWeek = '<ul class="week-ul ul-box">'+
									'<li>日</li>'+
									'<li>一</li>'+
									'<li>二</li>'+
									'<li>三</li>'+
									'<li>四</li>'+
									'<li>五</li>'+
									'<li>六</li>'+
								'</ul>'
			var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>'; 
			el.innerHTML = scheduleHd + scheduleWeek + scheduleBd;
			bindEvent();
			render();
		}
		var render = function () {
			$.getJSON("js/aqi201806.json",function(data){
				//console.log(data.aqi.aqi01.aqi);
				//console.log(data.aqi[0].aqi01[0].aqi);
				var rq="aqi"+"01";
				//console.log(data.aqi[rq].aqi);
				var aqi_json = data;
			

				var fullDay = new Date(year,month+1,0).getDate(), //当月总天数
					startWeek = new Date(year,month,1).getDay(), //当月第一天是周几
					total = (fullDay+startWeek)%7 == 0 ? (fullDay+startWeek) : fullDay+startWeek+(7-(fullDay+startWeek)%7),//元素总个数
					lastMonthDay = new Date(year,month,0).getDate(), //上月最后一天
					eleTemp = [];
				for(var i = 0; i < total; i++){
					
					if(i<startWeek){
						eleTemp.push('<li class="other-month"><span class="dayStyle">'+(lastMonthDay-startWeek+1+i)+'</span></li>')
					}else if(i<(startWeek+fullDay)){
						var nowDate = formartDate(year,month+1,(i+1-startWeek),'-');
						var addClass = '';
						selectedDate == nowDate && (addClass = 'selected-style');
						//formartDate(currentYear,currentMonth+1,currentDay,'-') == nowDate && (addClass = 'today-flag');
						var d = i+1-startWeek;
						d = (d.toString())[1] ? d : '0'+d;
						rq="aqi"+d;
						var aqi = aqi_json.aqi[rq].aqi;
						// var aqi = 30;
						var jb = getCssByAqi(aqi);
						// var jb=1;
						formartDate(currentYear,currentMonth+1,currentDay,'-') >= nowDate && (addClass = ' aqi-flag'+jb);
						var titles = "AQI:80&#13;PM2.5:--&#13;";
						eleTemp.push('<li class="current-month" ><span title='+titles+' class="currentDate dayStyle '+addClass+ ' ">'+(i+1-startWeek)+'</span></li>')
					}else{
						eleTemp.push('<li class="other-month"><span class="dayStyle">'+(i+1-(startWeek+fullDay))+'</span></li>')
					}
					
				}
				el.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
				//el.querySelector('.today').innerHTML = formartDate(year,month+1,day,'-');
				el.querySelector('.today').innerHTML = formartDate2(year,month+1,day);
				
			});
		};
		this.nextMonthFun = function () {
			if(month+1 > 11){
				year += 1;
				month = 0;
			}else{
				month += 1;
			}
			render();
			opt.nextMonthCb && opt.nextMonthCb(year,month+1,day);
		},
		this.nextYearFun = function () {
			year += 1;
			render();
			opt.nextYeayCb && opt.nextYeayCb(year,month+1,day);
		},
		this.prevMonthFun = function () {
			if(month-1 < 0){
				year -= 1;
				month = 11;
			}else{
				month -= 1;
			}
			render();
			opt.prevMonthCb && opt.prevMonthCb(year,month+1,day);
		},
		this.prevYearFun = function () {
			year -= 1;
			render();
			opt.prevYearCb && opt.prevYearCb(year,month+1,day);
		}
		init();
	}
	//将插件暴露给全局对象
	_global = (function(){return this || (0,eval)('this')}());
	if(typeof module !== 'undefined' && module.exports){
		module.exports = Schedule;
	}else if (typeof define === "function" && define.amd){
		define(function () {
			return Schedule;
		})
	}else {
		!('Schedule' in _global) && (_global.Schedule = Schedule);
	}

}());

var mySchedule = new Schedule({
	el: '#schedule-box',
	//date: '2018-9-20',
	clickCb: function (y,m,d,event) {
		var div = $("#aqiDetail");
		console.log(div.is(":hidden"));
        if (div.is(":hidden")) {
            div.show();
            div.css("left", document.body.scrollLeft + event.clientX -50);
            div.css("top", document.body.scrollLeft + event.clientY - 200);
        } else {
            div.hide();
        }
        event.stopPropagation();
		//document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
	},
	nextMonthCb: function (y,m,d) {
		//document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
	},
	nextYeayCb: function (y,m,d) {
		//document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
	},
	prevMonthCb: function (y,m,d) {
		//document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
	},
	prevYearCb: function (y,m,d) {
		//document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
	}
});
