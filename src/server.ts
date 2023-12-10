import { type Request, type Response, type NextFunction } from 'express'
import { load } from './common.js'
import { Diagram } from './day03/day03.js'
import express from 'express'

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/diagram-data', (req: Request, res: Response, next: NextFunction) => {
  void load('data/input03.txt')
    .then((lines: string[]) => {
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
    .catch(next)
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
