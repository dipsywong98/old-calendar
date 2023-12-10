import { useState } from 'react'
import { HolidayUtil, Solar, SolarMonth } from 'lunar-typescript';
import { AppBar, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, Input, Link, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import Menu from '@mui/material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const 天干 = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const 地支 = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const 干轉五運: Record<string, string> = {
  甲: '土太过',  乙: '金不及',  丙: '水太过',  丁: '木不及',  戊: '火太过',
  己: '土不及',  庚: '金太过',  辛: '水不及',  壬: '木太过',  癸: '火不及'
}
const 支轉六氣: Record<string, string> = {
  子: '少阴君火', 丑: '太阴湿土', 寅: '少阳相火', 卯: '阳明燥金', 辰: '太阳寒水', 巳: '厥阴风木',
  午: '少阴君火', 未: '太阴湿土', 申: '少阳相火', 酉: '阳明燥金', 戌: '太阳寒水', 亥: '厥阴风木',
}
const 干轉洛書: Record<string, number> = {
  甲: 3,
  乙: 2,
  丙: 1,
  丁: 5,
  戊: 5,
  己: 5,
  庚: 6,
  辛: 7,
  壬: 8,
  癸: 4,
}
const 支轉洛書: Record<string, number> = {
  子: 8,
  丑: 4,
  寅: 4,
  卯: 3,
  辰: 2,
  巳: 2,
  午: 9,
  未: 5,
  申: 5,
  酉: 6,
  戌: 7, 
  亥: 7,

}
const 干轉八卦 = (年干: string, 月干: string, 日干: string) => {
  const y = Number(干轉五運[年干][1] === '太')
  const m = Number(干轉五運[月干][1] === '太')
  const d = Number(干轉五運[日干][1] === '太')
  return '乾兌离震巽坎艮坤'[y << 2 | m << 1 | d]
}

const pad = (n: number) => String(n).padStart(2, '0')

const getDayViewModel = (solar: Solar) => {
  const lunar = solar.getLunar()
  const solarDayDisplay = solar.getDay()
  const holiday = HolidayUtil.getHoliday(solar.getYear(), solar.getMonth(), solar.getDay())
  const solarDayDisplayColor = solar.getWeek() === 0 || holiday !== null ? 'error' : undefined
  const lunarDay = lunar.getDayInChinese()
  const lunarMonth = `${lunar.getMonthInChinese()}月`.replace('腊', '十二').replace('冬', '十一')
  const lunarDayDisplay = lunar.getJieQi() || (lunar.getDay() === 1 ? lunarMonth : lunarDay)
  const holidayDisplay = holiday?.getName() ?? '　' // full space to place hold

  const detailHeading = `${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日 星期${solar.getWeekInChinese()}`
  const [年干, 年支] = lunar.getYearInGanZhi().split('')
  const [月干, 月支] = [天干[(lunar.getYearGanIndex() * 12 + Math.abs(lunar.getMonth()) + 1) % 10], 地支[(Math.abs(lunar.getMonth()) + 1) % 12]]
  const [日干, 日支] = lunar.getDayInGanZhi().split('')
  const 時干支 = Array(12).fill(0).map((_, k) => k).map((offset) => {
    const timeStart = (23 + offset * 2) % 24
    const timeEnd = (1 + offset * 2) % 24
    const 時干 = 天干[(lunar.getTimeGanIndex() + offset) % 10]
    const 時支 = 地支[(lunar.getTimeZhiIndex() + offset) % 12]
    const 時運 = 干轉五運[時干]
    const 時氣 = 支轉六氣[時支]
    return `${pad(timeStart)}-${pad(timeEnd)} ${時干}${時支}時 ${時運}${時氣}時 (${干轉洛書[時干]}${支轉洛書[時支]})`
  })
  const 年運氣 = `${年干}${年支}年 ${干轉五運[年干]}${支轉六氣[年支]}年 (${干轉洛書[年干]}${支轉洛書[年支]})`
  const 月運氣 = `${月干}${月支}月 ${干轉五運[月干]}${支轉六氣[月支]}月 (${干轉洛書[月干]}${支轉洛書[月支]})`
  const 日運氣 = `${日干}${日支}日 ${干轉五運[日干]}${支轉六氣[日支]}日 (${干轉洛書[日干]}${支轉洛書[日支]})`
  const 八卦 = 干轉八卦(年干, 月干, 日干)
  const lunarText = `农历 ${lunarMonth}${lunarDay} ${八卦}`

  const gzText = ``
  return {
    solar,
    solarDayDisplay,
    displayColor: solarDayDisplayColor,
    lunar,
    lunarMonth,
    lunarDayDisplay,
    holidayDisplay,
    detailHeading,
    lunarText,
    支干: gzText,
    年運氣,
    月運氣,
    日運氣,
    八卦,
    時干支
  }
}

function App() {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const [year, setYear] = useState(currentYear)
  const [month, setMonth] = useState(currentMonth)
  const weeks = SolarMonth
    .fromYm(year, month)
    .getWeeks(0)
  const [showDialog, setShowDialog] = useState<ReturnType<typeof getDayViewModel> | null>(null)
  return (
    <Grid sx={{position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }} container flexDirection='column'>
      <AppBar position="static">
        <Toolbar sx={{ margin: 'auto' }}>
          <IconButton
            onClick={() => setYear(year - 1)}
            color="inherit"
            size="large">
            <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              if (month === 1) {
                setYear(year - 1)
                setMonth(12)
              } else {
                setMonth(month - 1)
              }
            }}
            color="inherit"
            size="large">
            <NavigateBeforeIcon />
          </IconButton>
          <Grid container alignItems='baseline'>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Input
                    color="warning"
                    size="small"
                    type="number"
                    value={year}
                    sx={{
                      width: '60px', input: {
                        color: 'white',
                        textAlign: 'center',
                        MozAppearance: 'textfield',
                        '&::-webkit-outer-spin-button,&::-webkit-inner-spin-button': {
                          WebkitAppearance: 'none',
                          margin: 0
                        }
                      }
                    }}
                    onChange={({ target }) => setYear(Number.parseInt(target.value))}
                    endAdornment={
                      <ArrowDropDownIcon />
                    }
                    {...bindTrigger(popupState)}
                  />
                  <Menu {...bindMenu(popupState)}>
                    {Array(200).fill(1900).map((v, k) => v + k).map((v) => <MenuItem key={v} selected={v === year} onClick={() => { popupState.close(); setYear(v) }}>{v}</MenuItem>)}
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
            <Typography>
              年
            </Typography>
            <TextField
              size="small"
              variant='standard'
              select
              value={month}
              onChange={({ target }) => setMonth(Number.parseInt(target.value))}
              sx={{
                '.MuiInput-root': {
                  color: 'white', textAlign: 'right'
                }
              }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
            </TextField>
            <Typography>
              月
            </Typography>
          </Grid>
          <IconButton
            onClick={() => {
              if (month === 12) {
                setYear(year + 1)
                setMonth(1)
              } else {
                setMonth(month + 1)
              }
            }}
            color="inherit"
            size="large">
            <NavigateNextIcon />
          </IconButton>
          <IconButton
            onClick={() => setYear(year + 1)}
            color="inherit"
            size="large"><LastPageIcon /></IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingX: 0, margin: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Grid item>
          <Table sx={{ 
            tableLayout: 'fixed', 
            'td,th': { px: 0, textAlign: 'center' },
            td: {
              cursor: 'pointer',
              transition: 'box-shadow 0.2s ease-in-out',
              ':hover': {
                boxShadow: 8
              }
            }
            }}>
            <TableHead>
              <TableRow>
                <TableCell size="small">日</TableCell>
                <TableCell size="small">一</TableCell>
                <TableCell size="small">二</TableCell>
                <TableCell size="small">三</TableCell>
                <TableCell size="small">四</TableCell>
                <TableCell size="small">五</TableCell>
                <TableCell size="small">六</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weeks.map(week => (
                <TableRow key={week.toFullString()}>
                  {week.getDays().map(getDayViewModel).map(day => (
                    <TableCell
                      key={day.solar.toYmd()}
                      sx={{
                        '>*': {
                          opacity: day.solar.getMonth() !== month ? 0.4 : 1 
                        }
                      }}
                      size="small"
                      onClick={() => setShowDialog(day)}>
                      <Typography variant="h5" fontWeight='bold' color={day.displayColor}>
                        {day.solarDayDisplay}
                      </Typography>
                      <Typography variant="caption" color={day.lunar.getJieQi() ? '#48c739' : day.displayColor}>
                        <div>
                          {day.lunarDayDisplay}
                        </div>
                        <div>
                          {day.holidayDisplay}
                        </div>
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item flex={1} />
        <Grid item container component='footer' justifyContent='center' alignSelf='flex-end'>
          <Grid item>
            <Typography variant='caption' gutterBottom>
              <Link href="./v1.html">前往舊版</Link> | <Link href="https://github.com/dipsywong98/old-calendar/issues">意見回饋</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={showDialog !== null} onClose={() => setShowDialog(null)}>
        {showDialog && (
          <>
            <DialogTitle>
              {showDialog.detailHeading}
            </DialogTitle>
            <DialogContent dividers>
              <Typography>
                {showDialog.lunarText}
              </Typography>
              <Typography>
                {showDialog.支干}
              </Typography>
              <Typography>
                {showDialog.年運氣}
              </Typography>
              <Typography>
                {showDialog.月運氣}
              </Typography>
              <Typography>
                {showDialog.日運氣}
              </Typography>
              <Typography>
                {showDialog.八卦}
              </Typography>
              {showDialog.時干支.map((s) => <Typography>{s}</Typography>)}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Grid>
  )
}

export default App
