import { useState } from 'react'
import { HolidayUtil, Solar, SolarMonth } from 'lunar-typescript';
import { AppBar, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, Link, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Highlighter } from './Highlighter';
import { 天干, 地支, 干轉五運, 支轉六氣, 干轉洛書, 支轉洛書, 干轉八卦, 支轉生肖 } from './yi';
import { blue, red } from '@mui/material/colors';

const pad = (n: number) => String(n).padStart(2, '0')

const getDayViewModel = (solar: Solar) => {
  const lunar = solar.getLunar()
  const solarDayDisplay = solar.getDay()
  const holiday = HolidayUtil.getHoliday(solar.getYear(), solar.getMonth(), solar.getDay())
  const isRedDay = solar.getWeek() === 0 || holiday !== null ? true : false
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
    return `${pad(timeStart)}-${pad(timeEnd)} ${時干}${時支}时 ${時運}${時氣}时 (${干轉洛書[時干]}${支轉洛書[時支]})`
  })
  const 年運氣 = `${年干}${年支}年 ${干轉五運[年干]}${支轉六氣[年支]}年 (${干轉洛書[年干]}${支轉洛書[年支]})`
  const 月運氣 = `${月干}${月支}月 ${干轉五運[月干]}${支轉六氣[月支]}月 (${干轉洛書[月干]}${支轉洛書[月支]})`
  const 日運氣 = `${日干}${日支}日 ${干轉五運[日干]}${支轉六氣[日支]}日 (${干轉洛書[日干]}${支轉洛書[日支]})`
  const 八卦 = `${干轉八卦(年干, 月干, 日干)}卦`
  const 年生肖 = 支轉生肖[年支]
  const lunarText = `农历 ${年干}${年支}${年生肖}年 ${lunarMonth}${lunarDay}`

  const isToday = solar.toYmd() === Solar.fromDate(new Date()).toYmd()

  const gzText = ``
  return {
    isToday,
    solar,
    solarDayDisplay,
    isRedDay,
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
    時干支,
    年生肖
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
  const allMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const allYears = Array(200).fill(1900).map((v, k) => v + k)
  return (
    <Grid sx={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, '*': { fontWeight: 800 }, backgroundColor: 'white' }} container flexDirection='column'>
      <AppBar position="static">
        <Toolbar sx={{ margin: 'auto' }}>
          <IconButton
            disabled={year <= allYears[0]}
            onClick={() => setYear(year - 1)}
            color="inherit"
            size="large">
            <FirstPageIcon />
          </IconButton>
          <IconButton
            disabled={year <= allYears[0] && month === 1}
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
            <TextField
              size="small"
              variant='standard'
              select
              value={year}
              onChange={({ target }) => setYear(Number.parseInt(target.value))}
              sx={{
                '.MuiInput-root': {
                  color: 'white', textAlign: 'right'
                }
              }}>
              {allYears.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
            </TextField>
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
              {allMonths.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
            </TextField>
            <Typography>
              月
            </Typography>
          </Grid>
          <IconButton
            disabled={year >= allYears[allYears.length - 1] && month === 12}
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
            disabled={year >= allYears[allYears.length - 1]}
            onClick={() => setYear(year + 1)}
            color="inherit"
            size="large"><LastPageIcon /></IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingX: 0, margin: 'auto', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
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
                        },
                      }}
                      size="small"
                      onClick={() => setShowDialog(day)}>
                      <Typography
                        variant="h5"
                        fontWeight='bold'
                        sx={
                          day.isToday
                            ? {
                              display: 'inline-block',
                              padding: '4px',
                              background: day.isRedDay ? red[700] : blue[700],
                              color: '#ffffff',
                              borderRadius: '50%',
                              aspectRatio: '1/1',
                              width: '30px',
                            }
                            : { padding: '4px' }
                        }
                        color={day.isRedDay ? red[700] : undefined}>
                        {day.solarDayDisplay}
                      </Typography>
                      <Typography variant="caption" color={day.lunar.getJieQi() ? '#48c739' : day.isRedDay ? red[700] : undefined}>
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
            <DialogContent dividers sx={{ '*': { fontWeight: 800 } }}>
              <Highlighter>
                {showDialog.lunarText}
              </Highlighter>
              <Highlighter>
                {showDialog.支干}
              </Highlighter>
              <Highlighter>
                {showDialog.年運氣}
              </Highlighter>
              <Highlighter>
                {showDialog.月運氣}
              </Highlighter>
              <Highlighter>
                {showDialog.日運氣}
              </Highlighter>
              <Highlighter>
                {showDialog.八卦}
              </Highlighter>
              {showDialog.時干支.map((s) => <Highlighter>{s}</Highlighter>)}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Grid>
  )
}

export default App
