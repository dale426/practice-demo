const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
const createApp = require('./dist/server.js').default
server.use(express.static('dist'));

const bundle = fs.readFileSync(path.resolve(__dirname, 'dist/server.js'), 'utf-8');
const renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
    template: fs.readFileSync(path.resolve(__dirname, 'dist/index.ssr.html'), 'utf-8')
});

// console.log('createApp', createApp)
server.get('*', (req, res) => {
    const context = { url: req.url }
    console.log( Math.random() * 1000 << 5,req.url)

    createApp(context).then( app => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                if (err.code === 404) {
                    res.status(404).end('Page not found')
                } else {
                    res.status(500).end('Internal Server Error')
                }
            }
            res.end(html);
        })
    }).catch( err => {
        console.log("error",err)
        res.status(404).end("")
    })
});


server.listen(8010, () => {
    console.log('后端渲染服务器启动，端口号为：8010');
});


/* const feServer = express();
feServer.use(express.static('dist'));

feServer.get('/index', (req, res) => {
    // 输出 html
    let html = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
    res.end(html);
});

feServer.listen(8012, () => {
    console.log('前端渲染服务器启动，端口号为：8012');
}); */