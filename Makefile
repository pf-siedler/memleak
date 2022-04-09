all:

compile:
	yarn tsc -p .

clean:
	yarn tsc --build --clean

serve: compile
	node --expose-gc --inspect=127.0.0.1:9229 ./src/index.js
