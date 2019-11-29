let initState = {
	menu: [
		{
			path:'/home',
			type:'link',
			title: 'home',
			icon: 'home',
			children: [

			]
		},
		{
			path:'',
			type:'button',
			icon: '',
			title: '系统管理',
			children: [
        {
					path:'/user',
			    type:'link',
					icon: 'user',
					title: 'user',
					children: [

					]
				},
				{
					path:'/department',
			    type:'link',
					icon: 'branches',
					title: 'department',
					children: [

					]
				}
			]
		}
	]
}

const findParent = (type) => {
   return initState.menu
}

const menuReducer = (state = initState.menu, action) => {
	switch (action.type) {
		case 'update_menu': 
			return findParent();
		default: 
		  return state;
	}
}

export default menuReducer;