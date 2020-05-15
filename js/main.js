let plugin_search_list;
let cachebuster = new Date().getTime();
$('body').append("<script type=\"text/javascript\" src=\"js/plugin_db.js?v=" + cachebuster + "\"><\/script>");

$(function() {
    plugin_search_list = plugin_db.map(obj => {
        let rObj = {};
        rObj['label'] = obj['plugin'];
        rObj['value'] = obj['value'];
        rObj['rank'] = obj['rank'];
        return rObj;
    });

    $('#searchbar').autocomplete({
        appendTo: "#search-container",
        autoFocus: true,
        delay: 0,
        source: plugin_search_list,

        response: function(event, ui) {
            ui['content'].sort(function(a, b) {
                if (a['rank'] < b['rank']) {
                    return 1;
                }
                if (a['rank'] > b['rank']) {
                    return -1;
                }
                return 0;
            });
            ui['content'].splice(9);
        },

        _resizeMenu: function() {
            this.menu.element.outerWidth(1180);
        }
    });

    $(document).keypress(function(event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode == '13') {
            var target_plugin = (function(array, attr, value) {
                for (var i = 0; i < array.length; i += 1) {
                    if (array[i][attr] === value) {
                        return i;
                    }
                }
                return -1;
            })(plugin_db, 'plugin', $('#searchbar').val());

            if (target_plugin !== -1) {
                window.KeyboardMaestro.SetVariable('BCEName', plugin_db[target_plugin]['plugin']);
                window.KeyboardMaestro.SetVariable('BCEVendor', plugin_db[target_plugin]['vendor']);
                window.KeyboardMaestro.SetVariable('BCEType', plugin_db[target_plugin]['type']);
            }
            window.KeyboardMaestro.Submit('OK'); 
        } else if (keycode == '27') {
            window.KeyboardMaestro.Cancel('Cancel');
        }
    });
});