{% set href = module.btn.p3_cta_banner_btn_link.url.href %}
{% if module.btn.p3_cta_banner_btn_link.url.type is equalto "EMAIL_ADDRESS" %}
	{% set href = "mailto:" + href %}
{% endif %}
<a href="{{ href }}"
	{% if module.btn.p3_cta_banner_btn_link.open_in_new_tab %}target="_blank"{% endif %}
	{% if module.btn.p3_cta_banner_btn_link.rel %}rel="{{ module.btn.p3_cta_banner_btn_link.rel }}"{% endif %}
	>
	Link text
</a>
{% inline_text field="btn.p3_cta_banner_btn_label" value="{{ module.btn.p3_cta_banner_btn_label }}" %}
{{ module.btn.p3_cta_banner_btn_style }}