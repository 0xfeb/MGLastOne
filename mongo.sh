#!/bin/sh

mongod --port 1700 --fork --dbpath ./testdb --logpath ./db.log --logappend
