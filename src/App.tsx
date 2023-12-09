import { useState } from 'react'
import { HolidayUtil, Solar, SolarMonth } from 'lunar-typescript';
import { AppBar, Box, Container, Grid, IconButton, Input, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import Menu from '@mui/material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const getDayViewModel = (solar: Solar) => {
  const lunar = solar.getLunar()
  const solarDayDisplay = solar.getDay()
  const holiday = HolidayUtil.getHoliday(solar.getYear(), solar.getMonth(), solar.getDay())
  const solarDayDisplayColor = solar.getWeek() === 0 || holiday !== null ? 'error' : undefined
  const lunarDay = lunar.getDayInChinese()
  const lunarMonth = lunar.getMonthInChinese()
  const lunarDayDisplay = lunar.getJieQi() || (lunar.getDay() === 1 ? `${lunarMonth}月` : lunarDay)
  const holidayDisplay = holiday?.getName() ?? '　' // full space to place hold
  // const color = 
  return {
    solar,
    solarDayDisplay,
    displayColor: solarDayDisplayColor,
    lunar,
    lunarDayDisplay,
    holidayDisplay
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
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ margin: 'auto' }}>
          <IconButton
            onClick={() => setYear(year - 1)}
            color="inherit"
            size="large">
            <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={() => setMonth((month + 10) % 12 + 1)}
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
                        color: 'white', textAlign: 'center'
                      }
                    }}
                    onChange={({ target }) => setYear(Number.parseInt(target.value))}
                    endAdornment={
                      <ArrowDropDownIcon />
                    }
                    {...bindTrigger(popupState)}
                  />
                  <Menu {...bindMenu(popupState)}>
                    {Array(200).fill(1900).map((v, k) => v + k).map((v) => <MenuItem selected={v === year} onClick={() => { popupState.close(); setYear(v) }}>{v}</MenuItem>)}
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(v => <MenuItem value={v}>{v}</MenuItem>)}
            </TextField>
            <Typography>
              月
            </Typography>
          </Grid>
          <IconButton
            onClick={() => setMonth(month % 12 + 1)}
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
      <Container sx={{ paddingX: [0, 0, 1, 1] }}>
        <Table sx={{ 'td,th': { maxWidth: 'calc(100vw/7)', minWidth: 'calc(100vw/7)', px: 0, textAlign: 'center' } }}>
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
              <TableRow>
                {week.getDays().map(getDayViewModel).map(day => (
                  <TableCell size="small">
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
      </Container>
    </Box>
  )
}

export default App
