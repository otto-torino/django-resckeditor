var ResourcesPlugin = function () {
    this.init = function () {
        this.$ = django.jQuery;
        this.optionsContainer = this.$('div[name="tab-options"] .resources-dialog-options');
        this.optionsContainer.empty();
        this.options = [];
    }

    this.reset = function () {
        this.optionsContainer.empty().text('Select application and resource');
    }

    this.addOption = function (option) {
        var label = this.$('<label />', {
            'class': 'cke_dialog_ui_labeled_label',
            'style': 'display: block;'
        }).text(option.label)
        if (option.type === 'text') {
            var input = this.$('<input />', {
                type: 'text',
                'class': 'cke_dialog_ui_input_text',
                name: option.name
            }).val(option.default)
        } else if (option.type === 'select') {
            var input = this.$('<select />', {
                name: option.name,
                'class': 'cke_dialog_ui_input_select'
            });
            for (var i = 0, len = option.data.length; i < len; i++) {
                var d = option.data[i];
                var opt = this.$('<option />', {
                    value: d.value
                }).text(d.label).appendTo(input);
            }
        } else if (option.type == 'checkbox') {
            var input = this.$('<input />', {
                type: 'checkbox',
                name: option.name,
                'class': 'cke_dialog_ui_checkbox_input'
            });
            if (option.default) {
                input.attr('checked', 'checked');
            }
        }

        var row = this.$('<div />', {
            style: 'margin: 0 0 8px'
        }).append(label, input).appendTo(this.optionsContainer);

        this.options.push({
            name: option.name,
            type: option.type,
            input: input
        });
    }

    this.getUrlParam = function () {
        var param = {};
        for (var i = 0, len = this.options.length; i < len; i++) {
            var opt = this.options[i];
            param[opt.name] = opt.type === 'checkbox'
                ? opt.input.attr('checked')
                : opt.input.val();
        }
        return JSON.stringify(param);
    }

    this.init();
}

CKEDITOR.dialog.add('resourceDialog', function (editor) {
    var resourcesPlugin;
    var json = CKEDITOR.ajax.load('/resckeditor/');
    var arr = JSON.parse(json).apps;
    var apps = []
    for (var i = 0, len = arr.length; i < len; i++) {
        apps.push([arr[i].label, arr[i].name]);
    }
    return {
        title: 'Add resource',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-main',
                label: 'Search resource',
                elements: [
                    {
                        type: 'select',
                        id: 'resource-app',
                        label: 'Select application',
                        items: apps,
                        onChange: function( api ) {
                            resourcesPlugin = new ResourcesPlugin()
                            var dialog = this.getDialog()
                            var select2 = dialog.getContentElement('tab-main', 'resource-id').getInputElement().$;
                            var selected = this.getValue();
                            CKEDITOR.ajax.load('/resckeditor/?app=' + selected, function (json) {
                                // resources
                                var arr = JSON.parse(json).res;
                                var res = [];
                                select2.options.length = 0;
                                for (var i = 0, len = arr.length; i < len; i++) {
                                    var opt = document.createElement('option');
                                    opt.value = arr[i].id;
                                    opt.innerHTML = arr[i].label;
                                    select2.appendChild(opt);
                                }
                                // options
                                var options = JSON.parse(json).options;
                                for (var i = 0, l = options.length; i < l; i++) {
                                    resourcesPlugin.addOption(options[i])
                                }
                            });
                        }
                    },
                    {
                        type: 'select',
                        id: 'resource-id',
                        label: 'Select resource',
                        items: [['--seleziona l\'applicazione--']],
                    }
                ]
            },
            {
                 id : 'tab-options',
                 label : 'Options',
                 elements : [
                      {
                         type : 'html',
                         html : '<div class="resources-dialog-options">Select application and resource</div>',
                      },
                   ]
              }
        ],
        onOk: function () {
            var dialog = this;

            var app = dialog.getValueOf('tab-main', 'resource-app');
            var id = dialog.getValueOf('tab-main', 'resource-id');
            var optionsParam = resourcesPlugin.getUrlParam();
            var html = CKEDITOR.ajax.load('/resckeditor/html/?app=' + app + '&id=' + id + '&opt=' + encodeURIComponent(optionsParam));
            editor.insertHtml(html);
            resourcesPlugin.reset();
        },
        onCancel: function () {
            resourcesPlugin.reset();
        }
    };
});
