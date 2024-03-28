

## 基本SSR
相較於React SPA的client side render，server side render可以有效減少到客戶端的js  bundle size，直接傳已經渲染好的html

以下是基於React + NodeJS express的SSR demo：

1. 新增一個 `app/page.js`，寫一個React組件
```
import React, { useState } from "react";

export default function MyApp() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Hello SSR, Counters {count} times</h1>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
```

2. 新增 `server.js`,撰寫SSR相關的腳本：
```
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./app/page";
```

`renderToString` 是將React Element render成HTML，可以在SSR時拼接到HTML文本中

```
const content = renderToString(<App />);
```

讓其可以在SSR時拼接到HTML文本中
```
`
    <html>
        <head>
            <title>Tiny React SSR</title>
        </head>
        <body>
            <div id='root'>
                ${content}
            </div>
        </body>
        <script src="/client.bundle.js"></script>
    </html>
`
```

這樣一來，就可以簡單用Express直接返回了：
```
const app = express();

app.get("/", (req, res) =>
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
        </html>
    `)
);
```

不過可以看到，渲染出來的頁面，counter button並不會有反應（沒有console、也不會觸發react re-render），這是因為只有使用`renderToString`將React組件轉換成HTML字符串，並沒有進行事件綁定。


## hydrateRoot來讓SSR 下的 React動起來
首先，如果不用hydrateRoot的話，可以如何綁定事件？最簡單的方式就是先SSR給出HTML、然後在CSR綁定事件。

1. 新建client.js

```
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/page";

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

2. webpack.client.js 來編譯React,輸出成 client.bundle.js
```
module.exports = {
    mode: "development",
    entry: "./client.js",
    output: {
        filename: "client.bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", { runtime: "automatic" }],
                        ],
                    },
                },
            },
        ],
    },
};
```

3. 修改 server.js，在HTML模板中引入 client.bundle.js
```
`
    <html>
        <head>
            <title>Tiny React SSR</title>
        </head>
        <body>
            <div id='root'>
                ${content}
            </div>
        </body>
        <script src="/client.bundle.js"></script>
    </html>
`
```

然後經由webpack打包並運行 server.bundle.js 後，就可以看到button 能夠正常點擊並觸發counter變化。

但是這樣的缺點就是，需要渲染兩次，因此`hydrate`便十分重要。react-dom/server 的`hydrateRoot` ，便是可以複用已有的DOM節點、而不需要重新掛載。

1. 修改 client.js
```
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./app/page";

hydrateRoot(document.getElementById("root"), <App />);
```

這樣一來，就可以不用完全重新渲染、就可以綁定事件，減少了browser的渲染開銷。

## 流式SSR
而在SSR時，如果單一組件過大
