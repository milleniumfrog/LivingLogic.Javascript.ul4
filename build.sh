echo "babel"
./node_modules/.bin/babel ./src --out-dir ./dist/umd --extensions ".ts" -s
echo "tsc"
./node_modules/typescript/bin/tsc \
& ./node_modules/typescript/bin/tsc --outDir ./dist/umd --emitDeclarationOnly
echo "rollup es2015 to iife"
./node_modules/rollup/bin/rollup -c