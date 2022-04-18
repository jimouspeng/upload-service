'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/upload_img', controller.upload.index);
    router.get('/get_poster', controller.poster.index);
};
