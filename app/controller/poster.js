/*
 * @Author: jimouspeng
 * @Date: 2022-04-18 16:12:10
 * @Description: 海报服务
 * @FilePath: \upload-service\app\controller\poster.js
 */
'use strict';

const Controller = require('egg').Controller;
const puppeteer = require('puppeteer');
const render = require('art-template');
const fs = require('fs');
const path = require('path');

class posterController extends Controller {
    async index() {
        const { ctx } = this;
        console.log('业务进来了');
        const browser = await puppeteer.launch({
            product: 'chrome', // chrome or firefox, 强制使用chrome
            // args： https://peter.sh/experiments/chromium-command-line-switches/
            args: [
                '–disable-gpu', // 禁用GPU加速，可以减少不必要的创建GPU进程开销
                '–disable-dev-shm-usage', // 禁止创建匿名共享内存文件
                '–disable-setuid-sandbox', // 禁用沙箱模型
                '–no-first-run',
                '–no-sandbox',
                '–no-zygote',
                '–single-process', // 单进程模式
            ],
        });
        const page = await browser.newPage();
        // await page.goto(
        //     'https://t7.baidu.com/it/u=3997106521,2612372514&fm=193&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1652861718&t=7670786bd6b87ea59534a2f516251303'
        // );
        const picData = await page.screenshot({ path: 'test.png', type: 'jpeg', quality: 100 });
        console.log(picData);
        await browser.close();
        ctx.body = picData.toString();
    }
    /** 海报生成 */
    async loaderPoster() {
        const { ctx } = this;
        console.log('业务进来了', ctx.service.user.find('001'));
        const browser = await puppeteer.launch({
            product: 'chrome', // chrome or firefox, 强制使用chrome
            // args： https://peter.sh/experiments/chromium-command-line-switches/
            args: [
                '–disable-gpu', // 禁用GPU加速，可以减少不必要的创建GPU进程开销
                '–disable-dev-shm-usage', // 禁止创建匿名共享内存文件
                '–disable-setuid-sandbox', // 禁用沙箱模型
                '–no-first-run',
                '–no-sandbox',
                '–no-zygote',
                '–single-process', // 单进程模式
            ],
            defaultViewport: {
                width: 375,
                height: 862,
            },
        });
        const page = await browser.newPage();
        /** 可以设置page.emulate(options)-模拟器视口配置 */
        const getTemplate = 'http://127.0.0.1:2766/preview_poster';
        // await page.goto(
        //     'https://t7.baidu.com/it/u=3997106521,2612372514&fm=193&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1652861718&t=7670786bd6b87ea59534a2f516251303'
        // );
        await page.goto(getTemplate);
        const picData = await page.screenshot({ type: 'jpeg', quality: 80, fullPage: true });
        console.log(picData, ctx.app.baseDir);
        const file = fs.createWriteStream(`${ctx.app.baseDir}/images/test.jpg`);
        file.write(picData);
        await browser.close();
        const body = {
            code: 0,
            buf: picData,
        };
        ctx.body = JSON.stringify(body); /** ctx.body自动对buffer数据进行了组合, { data: bufferArray, type: buffer} */
        // ctx.body = picData
    }
    /** 海报预览 */
    previewPoster() {
        const { ctx } = this;
        ctx.set('Content-Type', 'text/html');
        const templatePath = path.resolve(ctx.app.baseDir, './app/template/index.art');
        console.log(templatePath, '本地路径');
        const templateData = render(templatePath, { pageData: { name: 'jimous' } });
        ctx.body = templateData;
    }
}

module.exports = posterController;
