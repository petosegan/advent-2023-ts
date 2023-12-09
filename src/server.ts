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
  const symbolMask = diagram.makeMask(diagram.symbols)
  const gearlikeMask = diagram.makeMask(diagram.gearlikes)
  const gearMask = diagram.makeMask(diagram.gears)

  res.json({
    diagram: lines,
    symbol_mask: diagram.makeMaskString(symbolMask),
    gearlike_mask: diagram.makeMaskString(gearlikeMask),
    gear_mask: diagram.makeMaskString(gearMask)
  })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
