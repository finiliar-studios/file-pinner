import { readFile } from 'fs/promises'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()

const file = await readFile(
  new URL('../final_data.json', import.meta.url)
)
const json = JSON.parse(file)

const renameFiles = () => {
  const directoryPath = process.env.DIRECTORY_PATH
  const directoryName = process.env.DIRECTORY_NAME
  const newDirectoryName = `${directoryName}_renamed`

  // delete directory if it exists
  fs.rmSync(newDirectoryName, { recursive: true, force: true })

  // make a new local directory to copy files into
  fs.mkdir(newDirectoryName, (err) => {
    if (err) {
      console.error(err)
    }
    console.log('Directory created successfully!')
  })

  json.forEach(token => {
    // get the random slug
    const fileName = token.image.split('/').pop()
    // copy file
    fs.copyFile(
      path.join(directoryPath, fileName),
      path.join(newDirectoryName, `${token.id}.gif`),
      (err) => {
        console.log('Error copying file ', token.id, err)
      })
  })
}

renameFiles()