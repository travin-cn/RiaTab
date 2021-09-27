export class WallpaperManager {
    // 本地存储key值
    local = ''
    // 图片uri
    imgUri = ''

    constructor(local) {
        this.local = local;
        this.load();
    }

    // 检测是否为浏览器支持的图片类型与大小
    validate(file) {
        let imgReg = /\.(jpg|png|bmp|jpeg)$/i
        let maxSize = 2 * 1024 * 1024 // 2MB

        // 验证是否超出大小限制
        if (file.size >= maxSize) {
            console.warn("图片大小超出2M");
            return false
        }

        // 验证是否为图片
        if (!imgReg.test(file.name)) {
            console.warn("请检查图片格式");
            return false
        }

        return true
    }

    // 将图片转换为uri
    convertImg(file) {
        if (this.validate(file)) {
            let reader = new FileReader()
            return new Promise((res, rej) => {
                reader.readAsDataURL(file);
                reader.onload = () => {
                    res(reader.result);
                }
                reader.onerror = () => {
                    rej("图片加载失败");
                }
            })
        }
    }

    // 从本地加载图片
    load() {
        let data = window.localStorage.getItem(this.local);
        this.imgUri = data || ''
    }

    // 存储图片到本地
    save(uri) {
        window.localStorage.setItem(this.local, uri)
    }
}