#!/bin/sh
set -e

sed -i "s#API_URL#$API_URL#" /usr/src/app/client/js/env.js

exec "$@"