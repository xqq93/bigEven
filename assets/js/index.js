$(function() {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo();
    var layer = layui.layer
        // 点击按钮，实现退出功能
    $('#btnLogOut').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
                // 2. 重新跳转到登录页面
            location.href = '/home/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // 以/my开头的请求路径，需要在请求头中携带Authorization身份认证字段，才能正常访问成功
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 获取用户信息成功，渲染用户头像和用户名
            renderAvatar(res.data)
        },

    })
}

function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
            // $('.text-avatar').show()
        var first = name[0].toUpperCase()
            // console.log(first);
        $('.text-avatar').html(first).show()
    }
}