import { type Request, type Response } from 'express'
import { load } from './common'
import { Diagram } from './day03'

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/diagram-data', async (req: Request, res: Response) => {
  const lines: string[] = await load('data/input03.txt')
  const diagram = new Diagram(lines)
  const symbol_mask = diagram.makeMask(diagram.symbols)
  const gearlike_mask = diagram.makeMask(diagram.gearlikes)
  const gear_mask = diagram.makeMask(diagram.gears)

  res.json({
    diagram: lines,
    symbol_mask: diagram.makeMaskString(symbol_mask),
    gearlike_mask: diagram.makeMaskString(gearlike_mask),
    gear_mask: diagram.makeMaskString(gear_mask)
  })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
