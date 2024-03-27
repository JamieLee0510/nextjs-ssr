import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { App } from './app/page'; 

const PORT = 3060;
const app = express();

app.use(express.static('dist')); // 假设Webpack配置将构建的客户端文件放在了dist目录

app.get('/*', (req, res) => {
  const indexFile = path.resolve('./public/index.html');
  fs.readFile(indexFile, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading index.html', err);
      return res.status(500).send('Error serving the page');
    }

    // 从index.html中提取出root之前的HTML部分和root之后的HTML部分
    const [head, tail] = htmlData.split('<div id="root"></div>');

    res.write(head + '<div id="root">');
    const stream = renderToPipeableStream(<App />, {
      onShellReady() {
        // 当React准备好将初始HTML shell发送到客户端时调用
        res.statusCode = 200;
        stream.pipe(res, {end: false});
      },
      onShellError(err) {
        // 处理初始渲染过程中的错误
        console.error(err);
        res.statusCode = 500;
        res.send('Server Error');
        res.end();
      },
      onAllReady() {
        // 当整个应用包括异步组件加载完毕时调用
        res.write('</div>' + tail);
        res.end();
      },
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on  http://localhost:${PORT}`);
});
