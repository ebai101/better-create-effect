JsOsaDAS1.001.00bplist00�Vscript_S// instances
se = Application('System Events');
reason = Application('Reason 11');
proc = se.processes.byName('Reason');

// data structures
var menu_data = {
	'inst': proc.menuBars[0].menuBarItems.byName('Create').menus[0].menuItems.byName('Instruments').menus[0].menuItems(),
	'efct': proc.menuBars[0].menuBarItems.byName('Create').menus[0].menuItems.byName('Effects').menus[0].menuItems(),
	'util': proc.menuBars[0].menuBarItems.byName('Create').menus[0].menuItems.byName('Utilities').menus[0].menuItems(),
	'plyr': proc.menuBars[0].menuBarItems.byName('Create').menus[0].menuItems.byName('Players').menus[0].menuItems()
}
var out_data = [];

// instruments, effects, utilities
['inst', 'efct', 'util'].forEach(cat => {
	console.log('Getting ' + cat);
	for (var i = 10; i < menu_data[cat].length; i++) {
		var submenu = menu_data[cat][i].menus[0].menuItems();
		for (var j = 0; j < submenu.length; j++) {
			if (submenu[j].title() !== "") {
				out_data.push({
					type: cat,
					vendor: menu_data[cat][i].title(),
					plugin: submenu[j].title(),
					rank: 0
				});
			}
		}
	}
});

// players
for (var i = 0; i < menu_data['plyr'].length; i++) {
	var plug_list = [];
	if (menu_data['plyr'][i].title() !== "") {
		out_data.push({
			type: 'plyr',
			vendor: 'None',
			plugin: menu_data['plyr'][i].title(),
			rank: 0
		});
	}
}

JSON.stringify(out_data);                              i jscr  ��ޭ