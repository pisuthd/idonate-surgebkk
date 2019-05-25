#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

docker run --rm -it \
    --name "idonate-ipfs" \
    --init \
    --env IPFS_LOGGING="debug" \
    -p 4001:4001    `# swarm port` \
    -p 5001:5001    `# upload file port and webui port at localhost:5001/webui` \
    -p 8008:8080    `# access uploaded files at localhost:8008/ipfs/<hash>` \
    ipfs/go-ipfs:v0.4.20 \
        daemon --debug --offline --migrate=true
