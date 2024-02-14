#!/bin/bash
git pull --rebase origin main
docker build . -t digital-signature
docker compose up -d