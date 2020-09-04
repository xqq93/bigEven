$(function() {
    var form = layui.form
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '请昵称长度必须在 1 ~ 6 个字符之间！输入'
                }
            }
        })
        // 获取用户的基本信息
    initUserInfo();
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户基本信息失败！')
                }
                // console.log(res);
                // 为表单快速赋值
                // form.val('formUserInfo', res.data)
                form.val('formUserInfo', res.data)

            }
        })
    }
    // 重置
    $('#btnReset').on('click', function(e) {
            e.preventDefault();
            initUserInfo()
        })
        // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败！')
                }
                layui.layer.msg('更新用户信息成功！')
                    // 如何在子页面（iframe）中调用父页面中的方法
                window.parent.getUserInfo()
                console.log(res);
            }
        })
    })

})