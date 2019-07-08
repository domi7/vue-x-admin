const menuTree = [
    {
        closeable: false,
        icon: "el-icon-map-location",
        id: "menu_01",
        title: "地图展示",
        url: "/default/map",
        children: [],
    },
    {
        closeable: true,
        icon: "el-icon-user",
        id: "menu_02",
        title: "用户管理",
        url: "",
        children: [
            {
                closeable: true,
                icon: "el-icon-user-solid",
                id: "menu_02_01",
                title: "用户管理",
                url: "/index/users",
                children: []
            },
            {
                closeable: true,
                icon: "el-icon-s-custom",
                id: "menu_02_02",
                title: "用户组管理",
                url: "/index/usergroup",
                children: []
            },
            {
                closeable: true,
                icon: "el-icon-coordinate",
                id: "menu_02_03",
                title: "权限管理",
                url: "/index/permits",
                children: []
            }

        ]
    },
    {
        closeable: true,
        icon: "el-icon-s-data",
        id: "menu_03",
        title: "数据统计",
        url: "/index/statics",
        children: [],
    }

]


export function convertMetas(menuTree) {

    let urlMetas = {};
    let idMetas = {};

    function deepIterate(tree) {
        for (let item of tree) {

            const {title, icon, closeable, id, url} = item;
            let meta = {title, icon, closeable, id, url}
            if (item.url) {
                urlMetas[item.url] = meta
            }
            idMetas[item.id] = meta;
            if (item.children.length > 0) {
                deepIterate(item.children)
            }
        }
    }

    deepIterate(menuTree);

    return {urlMetas, idMetas};
}


export function filterByPermits(menuTree, permits) {
    let cloneData = JSON.parse(JSON.stringify(menuTree))
    return cloneData.filter(father => {
        if( cloneData.children){
            let branchArr = cloneData.children.filter(child => {
                return permits.includes(child.id)
            });
            father.children = branchArr;
        }

        return permits.includes(father.id);
    });
}


export default menuTree
