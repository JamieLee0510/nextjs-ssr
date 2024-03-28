import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./app/page";

const app = express();
app.use(express.static("dist")); // 聲明靜態目錄，用於讀取 client.bundle.js


const PORT = 3060;

app.get("/", (req, res) =>{   
    const content = renderToString(<App />);
    console.log("--content:", content)
    res.send(`
        <html>
            <head>
                <title>Tiny React SSR</title>
            </head>
            <body>
                <div id='root'>
                    ${content}
                </div>
            </body>
            <script src="./client.bundle.js"></script>
        </html>
    `)
});

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
