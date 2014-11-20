#!/usr/bin/env bash

# Used to start docker containers
if [[ $1 == "kill" ]]; then
  docker ps | grep "redis\|postgres" | awk '{print $1}' | xargs docker kill | xargs docker rm
  exit 0
fi

if docker ps | grep -q "0.0.0.0:5432"; then
  echo "Docker container already bound to port 5432";
else
  docker run -dp 5432:5432 postgres:9.3
fi

if docker ps | grep -q "0.0.0.0:6379"; then
  echo "Docker container already bound to port 6379"
else
  docker run -dp 6379:6379 redis:2.8.12
fi

