import { EngineManager, PageManager } from './app.js'
import { WallpaperManager } from './wallpaper.js'

export default {
    install(Vue) {
        // 创建引擎管理器,并挂载到Vue实例上
        Vue.prototype.createEM = (local) => {
            Vue.prototype.$em = new EngineManager(local);
        }
        // 创建分页管理器,并挂载到Vue实例上
        Vue.prototype.createPM = (local,cols,rows) => {
            Vue.prototype.$pm = new PageManager(local,cols,rows);
        }
        // 创建壁纸管理器,并挂载到Vue实例上
        Vue.prototype.createWM = (local) => {
            Vue.prototype.$wm = new WallpaperManager(local);
        }
    }
}

