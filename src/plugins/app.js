// app类
class App {
    // app的ID、名称、链接
    id = ""
    name = '空白'
    link = '#'

    // 生成app的唯一ID
    #uuid() {
        let seed = new Date().getTime(); //获取时间戳作为种子
        let idTemplate = "xx-xxx-xxxx"; //uuid模板
        return idTemplate.replace(/[x]/g, () => {
            let randomInt = Math.floor(seed + Math.random() * 16) % 16; //结合种子生成0-15整数
            return randomInt.toString(16); //转换为16进制
        });
    }

    constructor(obj) {
        this.id = this.#uuid()
        if (typeof obj === 'object') {
            this.name = obj.name || "空白"
            this.link = obj.link || '#'
        }
    }
}


// ------------------------------------------------------
// app管理器
class AppManager {
    // #region 读取和存储到本地的api
    // 本地存储字符串
    local = '';
    constructor(local) {
        this.local = local;
        this.load();
    }
    // 保存list到本地
    save() {
        window.localStorage.setItem(this.local, JSON.stringify(this.list));
    }

    // 加载本地list
    load() {
        let json = window.localStorage.getItem(this.local);
        if (json) {
            let arr = JSON.parse(json);
            let list = [];
            arr.forEach(v => {
                list.push(new App(v));
                this.list = list;
            })
            this.selected = this.list[0];
        }
    }
    //#endregion

    // 保存app的数组
    list = [];

    // #region  list api
    // 查找
    find(id) {
        for (let i = 0; i < this.length(); i++) {
            if (this.list[i].id === id) {
                return i
            }
        }
        return -1
    }

    // 添加
    add(obj) {
        this.list.push(new App(obj));
        this.save();
    }

    // 移除
    remove(id) {
        let index = this.find(id)
        if (index !== -1) {
            this.list.splice(index, 1)
        }
        this.save();
    }

    // 修改
    revise(id, obj) {
        let index = this.find(id);
        if (index !== -1) {
            this.list.splice(index, 1, new App(obj))
        }
        this.save();
    }

    // 清空
    clear() {
        this.list = [];
        this.save();
    }

    // app数量
    length() {
        return this.list.length
    }
    //#endregion
}


// ------------------------------------------------------
// engine管理器
export class EngineManager extends AppManager {
    // 选中的搜索引擎
    selected = '';

    // 从数组初始化
    constructor(local) {
        super(local)
        this.selected = this.list[0];
    }

    // 选中搜索引擎p
    setSelected(id) {
        let index = this.find(id);
        this.selected = this.list[index];
    }
}


// ------------------------------------------------------
// page管理器
export class PageManager extends AppManager {
    // 分页后的app
    pages = []
    // 当前页码
    index = 0
    // 每页的布局,默认3行5列
    layout = {
        cols: 5,
        rows: 3,
    }

    constructor(local, cols, rows) {
        super(local);
        this.setLayout(cols, rows);
    }

    // 设置布局
    setLayout(cols = 5, rows = 3) {
        this.layout.cols = cols;
        this.layout.rows = rows;
        this.updatePages();
    }

    // 返回每页容量
    capacity() {
        return this.layout.cols * this.layout.rows;
    }

    // 根据容量将list里的app分页
    updatePages() {
        let startIndex = 0, //当前页起始索引
            endIndex = 0,   //当前页结束索引
            len = this.length(), // app数量
            capacity = this.capacity(), // 每页容量
            pages = []
        for (let i = 0; endIndex < len; i++) {
            // 判断当前页最大索引是否大于数组长度，如果大于说明可以截取最大数量app，否则说明app不足，只能截取剩余app
            startIndex = i * capacity;
            endIndex = (i + 1) * capacity;
            let arr = endIndex < len ? this.list.slice(startIndex, endIndex) : this.list.slice(startIndex, len);
            pages.push(arr);
        }
        this.pages = pages
    }

    // 滚动翻页的算法,返回一个距离供驱动元素使用
    turnPage(e, width) {
        if (e.deltaY > 0 && this.index < this.pages.length - 1) {
            // 后翻页
            this.index++;
        } else if (e.deltaY < 0 && this.index > 0) {
            // 前翻页
            this.index--;
        }
        //  MarginLeft
        let left = -this.index * width;
        return `${left}px`
    }

    // #region 重写父类可能会更新页面的方法
    add(obj) {
        super.add(obj);
        this.updatePages();
    }

    remove(id) {
        super.remove(id);
        this.updatePages();
    }

    revise(id, obj) {
        super.revise(id, obj);
        this.updatePages();
    }

    clear() {
        super.clear()
        this.updatePages();
    }
    // #endregion

}



