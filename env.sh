#!/bin/bash

`cp .env.global .env.local`
IP_ADDRESS=$(ifconfig en0 | grep inet | grep -v inet6 | cut -d ' ' -f2)
find .env.local -type f | xargs sed -i '' "s|IP|${IP_ADDRESS}|g"
