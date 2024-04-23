const { readFile, read, writeFile } = require('fs')

const json_data = []

readFile('./branches.txt', 'utf8', (err, branches) => {
  if(err) {
    console.error(err)
    return
  }

  const lines = branches.split('\n')

  lines.forEach((branch, idx) => {
    const data = branch.split('X')
    console.log(data)
    const r = {}
    r.insuranceName = 'Nyala Insurance S.C.'
    r.description = 'Branch Office'
    r.branch = data[0]?.trim()
    r.telephone = data[1]?.trim()
    r.code = data[2]?.trim()
    if(r.code == 'ooo')
      r.email = `${r.code.toLowerCase()}${idx}@nyalainsurancesc.com`
    else
      r.email = `${r.code.toLowerCase()}@nyalainsurancesc.com`
    r.address1 = '01'
    r.address2 = r.branch
    r.address3 = 'Addis Ababa'
    r.state = 'Addis Ababa'
    r.country = 'Ethiopia'
    r.status = 'Active'
    json_data.push(r)
  })

  console.log(json_data)
})

readFile('./stateBranches.txt', 'utf8', (err, branches) => {
  if(err) {
    console.error(err)
    return
  }

  const lines = branches.split('\n')

  lines.forEach((branch, idx) => {
    const data = branch.split('X')
    console.log(data)
    const r = {}
    r.insuranceName = 'Nyala Insurance S.C.'
    r.description = 'Branch Office'
    r.branch = data[0]?.trim()
    r.telephone = data[1]?.trim()
    r.code = data[2]?.trim()
    if(r.code == 'ooo')
      r.email = `${r.code.toLowerCase()}${idx}@nyalainsurancesc.com`
    else
      r.email = `${r.code.toLowerCase()}@nyalainsurancesc.com`
    r.address1 = '01'
    r.address2 = r.branch
    r.address3 = r.branch
    r.state = r.branch
    r.country = 'Ethiopia'
    r.status = 'Active'
    json_data.push(r)
  })

  writeFile('branches.json', JSON.stringify(json_data), (err, data) => {
    if(err) {
      console.log(err)
      return
    }

    console.log('file created')
  })
})
