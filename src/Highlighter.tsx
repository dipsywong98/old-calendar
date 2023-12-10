import { Box, Typography } from "@mui/material"
import { green, grey, red, yellow } from "@mui/material/colors"
import { 干轉五運, 支轉六氣 } from "./yi"

interface Props {
  children: string
}

const basicColorMap: Record<string, string> = {
  木: green[700],
  金: yellow[900],
  水: grey[500],
  火: red[700],
  土: grey[800],
}

const colorMap = {
  ...basicColorMap,
  ...Object.fromEntries(Object.entries(干轉五運).flatMap(([干, 五運]) => [
    // [干, basicColorMap[五運[0]]],
    [五運, basicColorMap[五運[0]]]
  ])),
  ...Object.fromEntries(Object.entries(支轉六氣).flatMap(([支, 六氣]) => [
    // [支, basicColorMap[六氣[3]]],
    [六氣, basicColorMap[六氣[3]]]
  ]))
}

console.log(colorMap)

export const Highlighter = ({children}: Props) => {
  const keywordRegex = new RegExp(Object.keys(colorMap).sort((a, b) => b.length - a.length).map(key => `(${key})`).join('|'))
  const words = children.split(keywordRegex).filter((w) => w?.length > 0)
  return (
    <Typography>
      {words.map((word, index) => <Box component='span' sx={{ color: colorMap[word] }}>{word}</Box>)}
    </Typography>
  )
}