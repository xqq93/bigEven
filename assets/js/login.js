$(function() {
    // 点击 去注册账号的链接
    $('#link_reg').on('click', function() {
            // console.log('123');
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击 去登录的链接
    $('#link_login').on('click', function() {
            // console.log('456');
            $('.reg-box').hide()
            $('.login-box').show()
        })
        // 自定义校验规则
        // 获取要操作的layui模块
    var form = layui.form
        // var layer = layui.layer
        // 添加表达的自定义校验规则
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须时6到12位，且不能出现空格'],
            // 校验两次密码是否一致
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        // 监听注册表单的提交行为
    $('#form_reg').on('submit', function(e) {
            // 阻止表单的额默认提交行为
            e.preventDefault();
            // 发起ajax的post请求
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message + '请登录！')
                    // 模拟鼠标点击切换到登录页面的行为
                $('#link_login').click()
            })

        })
        // 登录
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                username: $('[name="username"]').val(),
                password: $('[name="password"]').val()
            },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败，请输入正确的用户名和密码')
                }
                layer.msg('登录成功')
                    // localStorage.setItem('token', res.token)
                    // location.href = '/home/index.html'
            }
        })
    })

})