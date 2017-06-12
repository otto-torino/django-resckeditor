CKEDITOR.plugins.add('resource', {
    icons: 'res',
    init: function (editor) {
        editor.addCommand('resource', new CKEDITOR.dialogCommand('resourceDialog'));
        editor.ui.addButton('Res', {
            label: 'Inserisci risorsa',
            command: 'resource',
            toolbar: 'insert'
        });
        CKEDITOR.dialog.add('resourceDialog', this.path + 'dialogs/resource.js' );
    }
});
