/*****************************************************************************
    日期资料
    *****************************************************************************/
var 農曆資料 = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0]
var 陽曆每月日數 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var 天干 = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
var 五運 = ["土太过", "金不及", "水太过", "木不及", "火太过", "土不及", "金太过", "水不及", "木太过", "火不及"];
var 地支 = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
var 六氣 = ["少阴君火", "太阴湿土", "少阳相火", "阳明燥金", "太阳寒水", "厥阴风木", "少阴君火", "太阴湿土", "少阳相火", "阳明燥金", "太阳寒水", "厥阴风木"];
var 八卦 = ["坤卦", "艮卦", "坎卦", "巽卦", "震卦", "离卦", "兑卦", "乾卦"];
var 生肖 = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
var 節氣 = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"]
var 節氣資料 = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758]
var 個位數 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
var 十位數 = ['初', '十', '廿', '卅', '　']
var monthName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//国历节日 *表示放假日
var sFtv = [
    "0101*元旦",
    "0214 情人节",
    "0308 妇女节",
    "0312 植树节",
    "0315 消费者权益日",
    "0317 St. Patrick's",
    "0401 愚人节",
    "0501 劳动节",
    "0504 青年节",
    "0512 护士节",
    "0601 儿童节",
    "0614 Flag Day",
    "0701 建党节 香港回归纪念",
    "0801 建军节",
    "0808 父亲节",
    "0909 毛泽东逝世纪念",
    "0910 教师节",
    "0928 孔子诞辰",
    "1001*国庆节",
    "1006 老人节",
    "1024 联合国日",
    "1111 Veteran's / Remembrance Day",
    "1112 孙中山诞辰",
    "1220 澳门回归",
    "1225 圣诞节",
    "1226 毛泽东诞辰"]
//农历节日 *表示放假日
var lFtv = [
    "0101*春节",
    "0115 元宵节",
    "0505 端午节",
    "0707 七夕情人节",
    "0715 中元节",
    "0815 中秋节",
    "0909 重阳节",
    "1208 腊八节",
    "1224 小年",
    "0100*除夕"]
//某月的第几个星期几
var wFtv = [
    "0131 Martin Luther King Day",
    "0231 President's Day",
    "0520 母亲节",
    "0530 Armed Forces Day",
    "0531 Victoria Day",
    "0716 合作节",
    "0730 被奴役国家周",
    "0811 Civic Holiday",
    "0911 Labor Holiday",
    "1021 Columbus Day",
    "1144 Thanksgiving"]
/*****************************************************************************
日期计算
*****************************************************************************/
//====================================== 传回农历 y年的总天数
function lYearDays(y) {
    var i, sum = 348
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (農曆資料[y - 1900] & i) ? 1 : 0
    return (sum + leapDays(y))
}
//====================================== 传回农历 y年闰月的天数
function leapDays(y) {
    if (leapMonth(y)) return ((農曆資料[y - 1900] & 0x10000) ? 30 : 29)
    else return (0)
}
//====================================== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
function leapMonth(y) {
    return (農曆資料[y - 1900] & 0xf)
}
//====================================== 传回农历 y年m月的总天数
function monthDays(y, m) {
    return ((農曆資料[y - 1900] & (0x10000 >> m)) ? 30 : 29)
}
//====================================== 算出农历, 传入日期物件, 传回农历日期物件
//                                       该物件属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
function Lunar(objDate) {
    var i, leap = 0, temp = 0
    var baseDate = new Date(1900, 0, 31)
    var offset = Math.round((objDate - baseDate) / 86400000)
    this.dayCyl = offset + 40
    this.monCyl = 14
    for (i = 1900; i < 2050 && offset > 0; i++) {
        temp = lYearDays(i)
        offset -= temp
        this.monCyl += 12
    }
    if (offset < 0) {
        offset += temp;
        i--;
        this.monCyl -= 12
    }
    this.year = i
    this.yearCyl = i - 1864
    leap = leapMonth(i) //闰哪个月
    this.isLeap = false
    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && this.isLeap == false) { --i; this.isLeap = true; temp = leapDays(this.year); }
        else { temp = monthDays(this.year, i); }
        //解除闰月
        if (this.isLeap == true && i == (leap + 1)) this.isLeap = false
        offset -= temp
        if (this.isLeap == false) this.monCyl++
    }
    if (offset == 0 && leap > 0 && i == leap + 1)
        if (this.isLeap) { this.isLeap = false; }
        else { this.isLeap = true; --i; --this.monCyl; }
    if (offset < 0) { offset += temp; --i; --this.monCyl; }
    this.month = i
    this.day = offset + 1
}
//==============================传回国历 y年某m+1月的天数
function solarDays(y, m) {
    if (m == 1)
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28)
    else
        return (陽曆每月日數[m])
}
//============================== 传入 offset 传回干支, 0=甲子
function cyclical(num) {
    return (天干[num % 10] + 地支[num % 12] + num % 10 + num % 12);
}
//============================== 月历属性
function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay) {
    this.isToday = false;
    //国历
    this.sYear = sYear;
    this.sMonth = sMonth;
    this.sDay = sDay;
    this.week = week;
    //农历
    this.lYear = lYear;
    this.lMonth = lMonth;
    this.lDay = lDay;
    this.isLeap = isLeap;
    //干支
    this.cYear = cYear;
    this.cMonth = cMonth;
    this.cDay = cDay;
    this.color = '';
    this.lunarFestival = ''; //农历节日
    this.solarFestival = ''; //国历节日
    this.solarTerms = ''; //节气
}
//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y, n) {
    var offDate = new Date((31556925974.7 * (y - 1900) + 節氣資料[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5))
    return (offDate.getUTCDate())
}
//============================== 传回月历物件 (y年,m+1月)
function calendar(y, m) {
    var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2
    var lDPOS = new Array(3)
    var n = 0
    var firstLM = 0
    sDObj = new Date(y, m, 1)            //当月一日日期
    this.length = solarDays(y, m)    //国历当月天数
    this.firstWeek = sDObj.getDay()    //国历当月1日星期几
    for (var i = 0; i < this.length; i++) {
        if (lD > lX) {
            sDObj = new Date(y, m, i + 1)    //当月一日日期
            lDObj = new Lunar(sDObj)     //农历
            lY = lDObj.year           //农历年
            lM = lDObj.month          //农历月
            lD = lDObj.day            //农历日
            lL = lDObj.isLeap         //农历是否闰月
            lX = lL ? leapDays(lY) : monthDays(lY, lM) //农历当月最後一天
            if (n == 0) firstLM = lM
            lDPOS[n++] = i - lD + 1
        }
        //sYear,sMonth,sDay,week,
        //lYear,lMonth,lDay,isLeap,
        //cYear,cMonth,cDay
        this[i] = new calElement(y, m + 1, i + 1, 個位數[(i + this.firstWeek) % 7],
            lY, lM, lD++, lL,
            cyclical(lDObj.yearCyl), cyclical(lDObj.monCyl), cyclical(lDObj.dayCyl++))
        if ((i + this.firstWeek) % 7 == 0) this[i].color = 'red'  //周日颜色
        if ((i + this.firstWeek) % 14 == 13) this[i].color = 'red'  //周休二日颜色
    }
    //节气
    // tmp1 = sTerm(y, m * 2) - 1
    // tmp2 = sTerm(y, m * 2 + 1) - 1
    // this[tmp1].solarTerms = 節氣[m * 2]
    // this[tmp2].solarTerms = 節氣[m * 2 + 1]
    // if (m == 3) this[tmp1].color = 'red' //清明颜色
    //国历节日
    for (i in sFtv)
        if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
            if (Number(RegExp.$1) == (m + 1)) {
                this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4 + ' '
                if (RegExp.$3 == '*') this[Number(RegExp.$2) - 1].color = 'red'
            }
    //月周节日
    for (i in wFtv)
        if (wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
            if (Number(RegExp.$1) == (m + 1)) {
                tmp1 = Number(RegExp.$2)
                tmp2 = Number(RegExp.$3)
                this[((this.firstWeek > tmp2) ? 7 : 0) + 7 * (tmp1 - 1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' '
            }
    //农历节日
    for (i in lFtv)
        if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
            tmp1 = Number(RegExp.$1) - firstLM
            if (tmp1 == -11) tmp1 = 1
            if (tmp1 >= 0 && tmp1 < n) {
                tmp2 = lDPOS[tmp1] + Number(RegExp.$2) - 1
                if (tmp2 >= 0 && tmp2 < this.length) {
                    this[tmp2].lunarFestival += RegExp.$4 + ' '
                    if (RegExp.$3 == '*') this[tmp2].color = 'red'
                }
            }
        }
    //黑色星期五
    if ((this.firstWeek + 12) % 7 == 5)
        this[12].solarFestival += '黑色星期五 '
    //今日
}

var cld;
var GZ = {}
var YMBG = {}
function drawCld(SY, SM) {
    var i, sD, s, size, yDisplay;
    cld = new calendar(SY, SM);
    
    if (SY > 1874 && SY < 1909) yDisplay = '光绪' + (((SY - 1874) == 1) ? '元' : SY - 1874)
    if (SY > 1908 && SY < 1912) yDisplay = '宣统' + (((SY - 1908) == 1) ? '元' : SY - 1908)
    if (SY > 1911 && SY < 1950) yDisplay = '民国' + (((SY - 1911) == 1) ? '元' : SY - 1911)
    if (SY > 1949) yDisplay = '共和国' + (((SY - 1949) == 1) ? '元' : SY - 1949)
    GZ.innerHTML = yDisplay + '年 农历' + cyclical(SY - 1900 + 36).slice(0, 2) + '年 &nbsp;&nbsp;【' + 生肖[(SY - 4) % 12] + '】';
    YMBG.innerHTML = "&nbsp;" + SY + "<BR>&nbsp;" + monthName[SM];

    const days = []

    for (i = 0; i < 42; i++) {
        sD = i - cld.firstWeek;
        if (sD > -1 && sD < cld.length) { //日期内
            const day = {
                // isLeapMonth: cld[sD].isLeap,
                // month: cld[sD].lMonth,
                // isSmallMonth: monthDays(cld[sD].lYear, cld[sD].lMonth) == 29,
                // lunarDay: cld[sD].lDay,
                // solarTerm: cld[sD].solarTerms,
                ...mOvr(cld, sD)
            }
            days.push(day)
        }
    }
    return days
}
const pad = (n) => String(n).padStart(2, 0)

//显示详细日期资料
function mOvr(cld, d) {
    return {
        solar: `${cld[d].sYear}-${pad(cld[d].sMonth)}-${pad(cld[d].sDay)}`,
        lunar: `${pad(cld[d].lMonth)}-${pad(cld[d].lDay)}`,
        gzYear: cld[d].cYear.substr(0, 1) + cld[d].cYear.substr(1, 1),
        gzMonth: cld[d].cMonth.substr(0, 1) + cld[d].cMonth.substr(1, 1),
        gzDate: cld[d].cDay.substr(0, 1) + cld[d].cDay.substr(1, 1),
        gzTime: '' + 天干[(0 * 2 + cld[d].cDay.substr(2, 1) * 24) / 2 % 10] + 地支[(0 * 2 + cld[d].cDay.substr(2, 1) * 24) % 24 / 2]
    }
}

const fs = require('fs')

const datapoints = []


for (let year = 1910; year < 2040; year += 1) {
    for (let month = 0; month < 12; month += 1) {
        datapoints.push(...drawCld(year, month))
    }
}
// console.log(drawCld(2023, 11));

fs.writeFileSync('./lab/old.json', JSON.stringify(datapoints, null, 2))