#!/bin/sh

mongod --port 1600 --fork --dbpath ./testdb --logpath ./db.log --logappend
