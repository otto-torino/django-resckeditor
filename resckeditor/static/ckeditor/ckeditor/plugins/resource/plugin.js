// django translations
if (!gettext) {
    var gettext = function (string) {
        return string;
    }
}

CKEDITOR.plugins.add('resource', {
    icons: 'res',
    init: function (editor) {
        editor.addCommand('resource', new CKEDITOR.dialogCommand('resourceDialog'));
        editor.ui.addButton('Res', {
            label: gettext('Resource'),
            command: 'resource',
            toolbar: 'insert'
        });
        CKEDITOR.dialog.add('resourceDialog', this.path + 'dialogs/resource.js' );
    }
});
