echo "tsc"
./node_modules/typescript/bin/tsc
echo "rollup es2015 to iife"
./node_modules/rollup/bin/rollup -c
echo "rollup es2015 to umd"
./node_modules/rollup/bin/rollup -c --format "umd" -o ./dist/umd/ul4.js --name="ul4"
echo "copy d.ts files"
cp ./dist/es2015/ul4.d.ts ./dist/umd/ul4.d.ts
cp ./dist/es2015/ul4.d.ts ./dist/browser/ul4.d.ts