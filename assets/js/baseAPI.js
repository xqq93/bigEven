// 发送请求之前执行
// options：请求参数对象
$.ajaxPrefilter(function(options) {
    // console.log(options);
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        // 统一为有权限的接口设置headers请求头
        // 先判断请求地址中是否有my
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 不论请求成功还是失败，最终都会调用comlete函数
    options.complete = function(res) {
        // console.log(res);
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据 
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //    强制清空本地token
            localStorage.removeItem('token')
                // 强制跳转页面
            location.href = '/home/login.html'
        }
    }

})