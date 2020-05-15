let pluginSearchList;

// don't cache the plugin db
let cachebuster = new Date().getTime();
$('body').append("<script type=\"text/javascript\" src=\"js/plugin_db.js?v=" + cachebuster + "\"><\/script>");

$(function() {
    pluginSearchList = plugin_db.map(obj => {
        let rObj = {};
        rObj['label'] = obj['plugin'];
        rObj['value'] = obj['value'];
        rObj['rank'] = obj['rank'];
        return rObj;
    });

    $('#searchbar').autocomplete({
        appendTo: "#results",
        autoFocus: true,
        delay: 0,
        source: pluginSearchList,

        open: function(event) {
            $('.ui-autocomplete').css('height', 'auto');
            let $input = $(event.target),
                inputTop = $input.offset().top,
                inputHeight = $input.outerHeight(),
                autocompleteHeight = $('.ui-autocomplete').outerHeight();
            window.resizeTo (window.outerWidth, inputHeight + (2*inputTop) + autocompleteHeight + (window.outerHeight - window.innerHeight));
        },

        close: function(event) {
            let inputHeight = $(event.target).outerHeight();
            window.resizeTo (window.outerWidth, inputHeight);
        },

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
        }
    });

    $(document).keypress(function(event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode == '13') {
            var targetPlugin = (function(array, attr, value) {
                for (var i = 0; i < array.length; i += 1) {
                    if (array[i][attr] === value) {
                        return i;
                    }
                }
                return -1;
            })(plugin_db, 'plugin', $('#searchbar').val());

            if (targetPlugin !== -1) {
                window.KeyboardMaestro.SetVariable('BCEName', plugin_db[targetPlugin]['plugin']);
                window.KeyboardMaestro.SetVariable('BCEVendor', plugin_db[targetPlugin]['vendor']);
                window.KeyboardMaestro.SetVariable('BCEType', plugin_db[targetPlugin]['type']);
            }
            window.KeyboardMaestro.Submit('OK'); 
        }
    });
});