'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    /** 测试post请求 */
    router.post('/get_info', controller.user.index);
    /** 上传图片路由 */
    router.post('/upload_img', controller.upload.index);
    /** 海报渲染路由 */
    router.post('/get_poster', controller.poster.index);
    /** 海报加载路由 */
    router.get('/loader_poster', controller.poster.loaderPoster);
};
