import { NFTStorage } from 'nft.storage'
import { filesFromPath } from 'files-from-path'
import path from 'path'
import fs from 'fs'
import { readFile } from 'fs/promises'
import * as dotenv from 'dotenv'
dotenv.config()

const manifest = await readFile(
  new URL('../cidManifest.json', import.meta.url)
)
const manifestJson = JSON.parse(manifest)

const token = process.env.API_KEY

async function main() {
  const directoryName = process.env.DIRECTORY_NAME
  const newDirectoryName = `${directoryName}_renamed`
  
  const files = filesFromPath(newDirectoryName, {
    pathPrefix: path.resolve(newDirectoryName), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  })

  const storage = new NFTStorage({ token })

  console.log(`storing file(s) from ${path}`)
  const cid = await storage.storeDirectory(files)
  console.log({ cid })

  const status = await storage.status(cid)
  console.log(status)

  let newData = {
    animation: directoryName,
    cid: cid
  }

  let finalData = manifestJson.concat(newData)

  fs.writeFile('cidManifest.json', JSON.stringify(finalData, null, 2), () => {
    // console.log('written')
  })
}

main()