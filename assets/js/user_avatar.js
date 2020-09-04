$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 点击上传按钮，模拟鼠标点击事件
    $('#btnImageChoose').on('click', function() {
            $('#imageChoose').click()
        })
        // 给文件选择框绑定change事件，用户选择了文件就会触发这个事件，通过e.target.files获取用户选择文件列表
        // 通过索引0拿到用户选择的文件
        // 将文件转化为路径
        // 利用$image重新初始化裁剪区域
    $('#imageChoose').on('change', function(e) {
            // 为文件选择框绑定change事件，获取用户选择的文件
            console.log(e);
            var filelist = e.target.files
            if (filelist.length === 0) {
                return layui.layer.msg('请选择照片！')
            }
            // 拿到用户选择的文件
            var file = e.target.files[0]
                // 将文件转化为路径
            var imgURL = URL.createObjectURL(file)
                // 重新初始化裁剪区域
            $image
                .cropper('destroy')
                .attr('src', imgURL)
                .cropper(options)

        })
        // 为确定按钮绑定点击事件
    $("#btnSureChoose").on('click', function() {
        // console.log('click');
        // 将裁剪后的头像上传到页面
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
            // 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新头像失败！')
                }
                layui.layer.msg('更新头像成功！')
                    // 重新获取用户信息
                window.parent.getUserInfo()
            }
        })

    })

})