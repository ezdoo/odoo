(function () {
    'use strict';

    var website = openerp.website;
    var qweb = openerp.qweb;
    website.ready().done(function() {

        $('.oe_website_portal').on('change', "select[name='country_id']", function () {
            var $select = $("select[name='state_id']");
            $select.find("option:not(:first)").hide();
            var nb = $select.find("option[data-country_id="+($(this).val() || 0)+"]").show().size();
            $select.parent().toggle(nb>1);
        });
        $('.oe_website_portal').find("select[name='country_id']").change();

        $('.wp_show_more').on('click', function(ev) {
            ev.preventDefault();
            $(this).parents('table').find(".to_hide").toggleClass('hidden');
            $(this).find('span').toggleClass('hidden');
        });

        var $form = $('#wp-address-form');

        $('.wp-address-select').on('click', function(ev) {
            ev.preventDefault();
            var child_id = $(this).data('id');
            $form.children('select[name="child_id"]').val(child_id);
            var action = $form.attr('action');
            var object= {"jsonrpc": "2.0",
                         "method": "call",
                          "params": getFormData($form),
                          "id": null};
            openerp.jsonRpc(action, 'call', object).then(function (data) {
                location.reload();
            });

            function getFormData($form){
                var unindexed_array = $form.serializeArray();
                var indexed_array = {};

                $.map(unindexed_array, function(n, i){
                    indexed_array[n['name']] = n['value'];
                });

                return indexed_array;
            };
        });
        
    });

})();