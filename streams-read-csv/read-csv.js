import { parse } from "csv-parse";
import fs from "node:fs";

const csvFilePath = new URL("./tasks-file.csv", import.meta.url);

const stream = fs.createReadStream(csvFilePath);

// This function reads the CSV file and send the data
// via POST Method
async function run() {
    const linesParse = stream.pipe(
        parse({
            delimiter: ",",
            skip_empty_lines: true,
            from_line: 2, // Skip the first line (the header)
        })
    );

    for await (const line of linesParse) {
        const [title, description] = line;

        await fetch("http://localhost:3333/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
            }),
        });
    }
}

run();
