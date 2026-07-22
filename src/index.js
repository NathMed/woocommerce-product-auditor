// fs - file system. Built in node.js, help us read file, write file, delete file, create folder. 
const fs = require("fs");
// csv-parser, helps us to read csv files. It creates readable object from the file. 
const csv = require("csv-parser");

const productFile = '../data/wc-product-export-21-7-2026-1784640882007.csv'

// totals
let totalRows = 0;
let simpleProducts = 0;
let variableProducts = 0;
let variations = 0;
let blankTypes = 0;
let unknownTypes = 0;


// create raw data 1 at a time to provide to our csv. it's like the straw when sipping then the csv is our tounge.
const productDataStream = fs.createReadStream(productFile)
// to connect to csv. Imagine, Water Tank -> Pipe -> Filter. Just read it as a pipe. Data flows through the pipeline.
                            .pipe(csv())
// "When new data arrives..."
                            .on("data", (product) => {
                                // increment total rows
                                totalRows++
                                // Normalize because imported CSVs may contain
                                // inconsistent capitalization or whitespace.
                                const type = product.Type.trim().toLowerCase();
                                
                                if (type === 'simple') {
                                    simpleProducts++;
                                } else if (type === 'variable') {
                                    variableProducts++;
                                } else if (type === 'variation') {
                                    variations++;
                                } else if (type === '') {
                                    blankTypes++;
                                } else {
                                    unknownTypes++;
                                }
                            })
                            // "I'm done. There are no more rows."
                            .on("end", () => {
                                console.log(
`========== Product Summary ==========
Total Rows: ${totalRows}
Simple Products: ${simpleProducts}
Variable Products: ${variableProducts}
Variations: ${variations}
Blank Types: ${blankTypes}
Unknown Types: ${unknownTypes}`
                                )
                            })
                            // error handler
                            .on("error", (error) => {
                                console.error(error);
                            });
