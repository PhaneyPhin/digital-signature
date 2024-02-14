#!/bin/bash
git pull --rebase origin dev
docker build . -t digital-signature
docker compose up -d