# Prerequisites

1. Make sure node is installed on this system: https://nodejs.org/en/download/

# How to set up
Open a command line and perform the following to set up the local environment:

1. run `git clone https://github.com/finiliar-studios/file-pinner.git` to clone the repo then `cd file-pinner` into the new directory
2. run `npm install` to install dependencies
3. copy the `.env.example` file as a `.env` file, and replace values with correct values

# How to use
For each animation, perform the following steps:
1. edit the fields in the .env file to point to the new animations directory
2. run `node scripts/renameFiles.js` to create a copy of the directory with the proper naming schema. IMPORTANT: make sure you run the s3 sync commands against the newly created directory with the proper names.
3. run `node scripts/pinFiles.js` to pin the new, renamed files to IPFS

# When you're done
1. make a git commit with the new CIDs and push to main to save (`git add .` then `git commit -m "saving cids"` then `git push`)
2. delete any local `renamed` folders you don't need anymore