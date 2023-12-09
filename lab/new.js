import {Solar} from 'lunar-typescript';

import fs from 'fs'

var 陽曆每月日數 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var 天干 = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
var 地支 = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
function solarDays(y, m) {
    if (m == 1)
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28)
    else
        return (陽曆每月日數[m])
}

const datapoints = []

const pad = (n) => String(n).padStart(2, 0)

const drawCld = (year, month) => {
  const nDays = solarDays(year, month - 1)
  const days = []
  for (let d = 0; d < nDays; d++) {
    const day = d + 1
    const lunar = Solar.fromYmd(year, month, day).getLunar()
    days.push({
        solar: `${year}-${pad(month)}-${pad(day)}`,
        lunar: `${pad(Math.abs(lunar.getMonth()))}-${pad(lunar.getDay())}`,
        gzYear: lunar.getYearInGanZhi(),
        gzMonth: 天干[(lunar.getYearGanIndex() * 12 + Math.abs(lunar.getMonth()) + 1) % 10]+地支[(Math.abs(lunar.getMonth()) + 1) % 12],
        // gzMonth: lunar.getMonthInGanZhi(),
        gzDate: lunar.getDayInGanZhi(),
        gzTime: lunar.getTimeInGanZhi()
    })
  }
  return days
}

for (let year = 1910; year < 2040; year += 1) {
    for (let month = 0; month < 12; month += 1) {
        datapoints.push(...drawCld(year, month + 1))
    }
}
// console.log(drawCld(2023, 11));

fs.writeFileSync('./lab/new.json', JSON.stringify(datapoints, null, 2))
