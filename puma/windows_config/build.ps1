$current_dir = Split-Path -parent ($pwd).path

cd ..

docker build -t frontend -f dev.Dockerfile .