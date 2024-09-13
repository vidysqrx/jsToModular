# jsToModular

A simple command-line tool to convert plain JavaScript files into **CommonJS** (`.cjs`) and **ES Modules** (`.mjs`) formats, ensuring modern module compatibility.

## Features

- Automatically converts `.js` files to both `.cjs` (CommonJS) and `.mjs` (ES Modules) formats.
- Provides an easy-to-use CLI interface for batch conversion of files.
- Flexible and ready to integrate into your existing workflows.

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Usage

1. Place all the JavaScript files you want to convert in the folder named PUT_JS_HERE.
2. To start the conversion process, run the following command:

```
npm start
```

3. The converted files will be output to the folder OUTPUT_HERE. Inside this folder:
   • OUTPUT_HERE/js: Contains the original JavaScript files.
   • OUTPUT_HERE/mjs: Contains the converted ES Module files (.mjs).
   • OUTPUT_HERE/cjs: Contains the converted CommonJS files (.cjs).
