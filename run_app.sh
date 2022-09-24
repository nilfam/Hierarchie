#!/bin/bash

unset http_proxy
unset https_proxy

cd /code

python -m http.server 8000
