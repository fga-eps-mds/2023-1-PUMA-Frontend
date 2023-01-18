$current_dir = Split-Path -parent ($pwd).path

cd ..

docker run --rm -p 8080:8080 -it -v "$($current_dir):/app" -v /app/node_modules frontend