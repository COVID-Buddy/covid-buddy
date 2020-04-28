#!/bin/bash

ng build --prod
docker build -t asia.gcr.io/matej-kramny/covid-sg .
docker push asia.gcr.io/matej-kramny/covid-sg