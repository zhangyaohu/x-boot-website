import * as types from '../mutations-types';

let initState = {
  isCreateOrDetail:  false,
  menu: [
    {
      path: '/home',
      type: 'link',
      title: '首页',
      icon: 'home',
      isCollpse: false,
      isActive: false,
      children: [

      ]
    },
    {
      path: '',
      type: 'button',
      icon: 'user',
      title: '系统管理',
      isCollpse: false,
      isActive: false,
      children: [
        {
          path: '',
          type: 'button',
          icon: 'user',
          title: 'user',
          isCollpse: false,
          isActive: false,
          children: [
            {
              path: '/main/user',
              type: 'link',
              icon: 'user',
              title: '用户列表',
              isCollpse: false,
              isActive: false,
              children: [

              ]
             },
             {
              path: '/main/add-user',
              type: 'link',
              icon: 'user',
              title: '添加用户',
              isCollpse: false,
              isActive: false,
              children: [

              ]
             }
          ]
        },
        {
          path: '/main/department',
          type: 'button',
          icon: 'branches',
          title: 'department',
          isCollpse: false,
          isActive: false,
          children: [
            {
              path: '/main/department',
              type: 'link',
              icon: 'user',
              title: '部门列表',
              isCollpse: false,
              isActive: false,
              children: [

              ]
             },
             {
              path: '/main/department/:uuid',
              type: 'link',
              icon: 'user',
              title: '部门详情',
              isCollpse: false,
              isActive: false,
              children: [

              ]
             }
          ]
        }
      ]
    },
    {
      path: '',
      type: 'button',
      icon: 'user',
      title: '统计管理',
      isCollpse: false,
      isActive: false,
      children: [
        {
          path: '/home/1',
          type: 'button',
          icon: 'user',
          title: 'user',
          isCollpse: false,
          isActive: false,
          children: [
           
          ]
        },
        {
          path: '/home/2',
          type: 'link',
          icon: 'branches',
          title: 'department',
          isCollpse: false,
          isActive: false,
          children: [

          ]
        }
      ]
    }
  ]
}

let startExpand = []; // 保存刷新后当前要展开的菜单项
function setExpand(source, url) {
  let sourceItem = '';
  for (let i = 0; i < source.length; i++) {
    sourceItem = JSON.stringify(source[i]); // 把菜单项转为字符串
    if (sourceItem.indexOf(url) > -1) { // 查找当前 URL 所对应的子菜单属于哪一个祖先菜单
      if (source[i].type === 'button') { // 导航菜单为按钮
        source[i].isActive = true; // 设置选中高亮
        source[i].isCollpse = true; // 设置为展开
        startExpand.push(source[i]);
        // 递归下一级菜单，以此类推
        setExpand(source[i].children, url);
      }
      break;
    }
  }
}

function findParents(payload) {
  if (payload.type === "button") {
    payload.isCollpse = !payload.isCollpse;
  } else if (payload.type === "link") {
    if (startExpand.length > 0) {
      for (let i = 0; i < startExpand.length; i++) {
        startExpand[i].isActive = false;
        startExpand[i].isCollpse = false;
      }
    }
    startExpand = []; // 清空展开菜单记录项
    setExpand(initState.menu, payload.path);
  };
}

function firstInit(payload) {
  setExpand(initState.menu, payload);
}

const menuReducer = (state = initState, action) => {
  switch (action.type) {
    case 'update_menu':
      findParents(action.param)
      return state;
    case 'reload_menu':
        firstInit(action.param);
      return state;
    case types.SHOW_CRETE_DETAIL:
       return Object.assign({}, state, {isCreateOrDetail: action.param});
    default:
      return state;
  }
}

export default menuReducer;