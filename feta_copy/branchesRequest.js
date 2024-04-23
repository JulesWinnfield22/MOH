import { addBranch } from './src/features/branch/api/branchesApi'
import branches from './branches.json'

let idx = 0
let interval = setInterval(() => {
  if(idx == branches.length) clearInterval(interval)
  addBranch(branches[idx])
  idx++
}, 50)