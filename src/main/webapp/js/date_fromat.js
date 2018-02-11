/**
 * description:时间处理公共方法
 * createby:zhangxl
 * createtime: 2014-7-16
 */


//+---------------------------------------------------  
//| 字符串转成日期类型   
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
//+---------------------------------------------------  
function StringToDate(dateStr)  
{   
	dateStr = dateStr.replace(/-/g,"/");
	return new Date(dateStr);
}  


//+---------------------------------------------------  
//| 求两个时间的毫秒数 参数为Date类型
//+---------------------------------------------------  
function daysBetween(DateOne,DateTwo){
	if(DateOne==null||DateOne==undefined||DateTwo==null||DateTwo==undefined){
		throw new Error("params error");
	}
	var starttime = DateOne.getTime();
	var endtime = DateTwo.getTime();
	return starttime-endtime;
}

function getLastDay(year,month)      
{      
 var new_year = year;    //取当前的年份      
 var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）      
 if(month>12)            //如果当前大于12月，则年份转到下一年      
 {      
  new_month -=12;        //月份减      
  new_year++;            //年份增      
 }      
 var newnew_date = new Date(new_year,new_month,1);                //取当年当月中的第一天      
 return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期      
}      


