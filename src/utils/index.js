/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * eg: 
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */   
Date.prototype.format=function(fmt='yyyy-MM-dd') {         
    var o = {         
    "M+" : addZero(this.getMonth()+1), //月份         
    "d+" : addZero(this.getDate()), //日         
    "h+" : addZero(this.getHours()),//%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : addZero(this.getHours()), //小时         
    "m+" : addZero(this.getMinutes()), //分         
    "s+" : addZero(this.getSeconds()), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
} 
function addZero(n){
	
	return n > 9 ? n : '0' + n;
	
}

const Koa = require("koa");
const schedule = require("node-schedule");
const _request = require("request");
const app = new Koa();

const cookie =
  "_ga=GA1.2.229945937.1652097319; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227095703908727227943%2522%252C%2522user_unique_id%2522%253A%25227095703908727227943%2522%252C%2522timestamp%2522%253A1652097319627%257D; passport_csrf_token=05d6c684fd416efc428ece680447a0b4; passport_csrf_token_default=05d6c684fd416efc428ece680447a0b4; n_mh=FZkcWSlpfTNS84yEXnwHzW-5SKuWNkzmILH6-Khq0Gk; passport_auth_status=44ff87bbf84f05ae7424798caa78807c%2C; passport_auth_status_ss=44ff87bbf84f05ae7424798caa78807c%2C; sid_guard=e29c8dfe038744d11f16f177ebd2e3df%7C1696664017%7C31536000%7CSun%2C+06-Oct-2024+07%3A33%3A37+GMT; uid_tt=6e915e102a84500f591dc202c3c871c4; uid_tt_ss=6e915e102a84500f591dc202c3c871c4; sid_tt=e29c8dfe038744d11f16f177ebd2e3df; sessionid=e29c8dfe038744d11f16f177ebd2e3df; sessionid_ss=e29c8dfe038744d11f16f177ebd2e3df; sid_ucp_v1=1.0.0-KDZkNWZkNzg0N2E0MzE4ZjAwYTZjMjI3ODRhNzFkZjBjOTEyOGRlZjkKFwj9wsDOqIyoBRDRk4SpBhiwFDgCQPEHGgJsZiIgZTI5YzhkZmUwMzg3NDRkMTFmMTZmMTc3ZWJkMmUzZGY; ssid_ucp_v1=1.0.0-KDZkNWZkNzg0N2E0MzE4ZjAwYTZjMjI3ODRhNzFkZjBjOTEyOGRlZjkKFwj9wsDOqIyoBRDRk4SpBhiwFDgCQPEHGgJsZiIgZTI5YzhkZmUwMzg3NDRkMTFmMTZmMTc3ZWJkMmUzZGY; store-region=cn-gd; store-region-src=uid; _tea_utm_cache_2608={%22utm_source%22:%22course_list%22}; csrf_session_id=12c09116e507e1c85804d25f898e4d5f; _tea_utm_cache_4366={%22utm_source%22:%221017tc%22}; msToken=xkjdZlrtqNYgU8pejfflQrIJfU5yIIJULIYKw0ugxWzmWSC6xyjvUjeIKb1cYf98kpaY1kOrAwCUukfzW4Pm_MGLRMd8vLNCVccGdBTmPSVDfjCZ-yOj8dpQC4PQHkRdPg==";
const referer = "https://juejin.cn/";
const aid = "2608";
const uuid = "7095703908727227943";
// 请求方法
function request({ url, method = "get", data, params }) {
  return new Promise((resolve, reject) => {
    _request(
      {
        url,
        method,
        data,
        headers: {
          referer,
          cookie,
        },
      },
      function (error, response, body) {
        try {
          console.log("url：" + url, body);
          const resData = JSON.parse(body);
          if (error) {
            return reject(error);
          }
          if (resData.err_no !== 0) {
            return reject(resData);
          } else {
            resolve(resData.data, resData);
          }
        } catch (error) {
          return reject(error);
        }
      }
    );
  });
}
// 签到
let retryCount = 0;
async function signIn() {
  try {
    const data = await request({
      url: "https://api.juejin.cn/growth_api/v1/check_in",
      method: "post",
    });
    console.log("签到成功：" + data);
    retryCount = 0;
  } catch (error) {
    console.log(error, "error");
    if (retryCount === 10) {
      console.log("已经重试了10次,一分钟后在试试！");
      retryCount = 0;
      setTimeout(signIn, 1000 * 60);
      return;
    }
    if (error.err_no === 15001) {
      return;
    }
    retryCount++;
    signIn();
  }
}
//  抽奖
async function lotteryDraw() {
  try {
    const data = await request({
      url: "https://api.juejin.cn/growth_api/v1/lottery/draw",
      method: "post",
      data: {
        aid,
        uuid,
      },
    });
    console.log("lotteryDraw:" + data);
  } catch (error) {
    console.log(object);
  }
}
// 获取我的幸运值
async function getLuckValue() {
  try {
    const data = await request({
      url: "https://api.juejin.cn/growth_api/v1/lottery_lucky/my_lucky",
      method: "post",
    });
    return data.total_value;
  } catch (error) {
    return null;
  }
}

// 启动
async function start() {
  console.log("signIn:" + Date.now());
  // const luckValue = await getLuckValue();
  await signIn();
  await lotteryDraw();
}
// const rule = "30 10 0 * * *"; // 每天的凌晨0点10分30秒触发'
// const rule = "0 * * * * ?"; // 每分钟'
const rule = "0 0 6 * * ?"; // 每天上午6点'

// 定时任务
const scheduleCronstyle = () => {
  schedule.scheduleJob(rule, () => {
    start();
  });
};
// getLuck();
// luckDraw();
app.listen(3000, async () => {
  console.log("服务启动成功！");
  scheduleCronstyle(); // 定时启动
  // start(); // 立即启动
  // lotteryDraw();
  // getLuckValue();
  // const num = await getLuckValue();
  // console.log(num, "num");
});

export default {}
