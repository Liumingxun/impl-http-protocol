import { lstat } from 'fs/promises'

console.log('233')

lstat(process.cwd()).then(console.log)
