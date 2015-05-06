from openerp import models, fields


class res_partner(models.Model):
    _name = "res.partner"
    _inherit = "res.partner"

    default_shipping_id = fields.Many2one('res.partner', 'Default Shipping Address', help="Used by the e-commerce to set a shipping address other than the partner's address")
