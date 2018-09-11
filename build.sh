rm -Rf ./dist/
echo "tsc"
./node_modules/typescript/bin/tsc && ./node_modules/typescript/bin/tsc -p ./tsconfig.es5.json
echo "rollup es2015 to iife and umd"
./node_modules/rollup/bin/rollup -c
echo "copy d.ts files"
cp ./dist/es2015/ul4.d.ts ./dist/umd/ul4.d.ts
cp ./dist/es2015/ul4.d.ts ./dist/browser/ul4.d.ts