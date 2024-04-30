{% for item in module.team.cards %}
	{% if item.select_an_image.src %}
		{% set sizeAttrs = 'width="{{ item.select_an_image.width }}" height="{{ item.select_an_image.height }}"' %}
		{% if item.select_an_image.size_type == 'auto' %}
			{% set sizeAttrs = 'width="{{ item.select_an_image.width }}" height="{{ item.select_an_image.height }}" style="max-width: 100%; height: auto;"' %}
		{% elif item.select_an_image.size_type == 'auto_custom_max' %}
			{% set sizeAttrs = 'width="{{ item.select_an_image.max_width }}" height="{{ item.select_an_image.max_height }}" style="max-width: 100%; height: auto;"' %}
		{% endif %}
		 {% set loadingAttr = item.select_an_image.loading != 'disabled' ? 'loading="{{ item.select_an_image.loading }}"' : '' %}
		<img src="{{ item.select_an_image.src }}" alt="{{ item.select_an_image.alt }}" {{ loadingAttr }} {{ sizeAttrs }}>
	{% endif %}
	{% inline_rich_text field="description" value="{{ item.description }}" %}
	{% for item2 in item.socials %}
		{% if item2.select_an_image.src %}
			{% set sizeAttrs = 'width="{{ item2.select_an_image.width }}" height="{{ item2.select_an_image.height }}"' %}
			{% if item2.select_an_image.size_type == 'auto' %}
				{% set sizeAttrs = 'width="{{ item2.select_an_image.width }}" height="{{ item2.select_an_image.height }}" style="max-width: 100%; height: auto;"' %}
			{% elif item2.select_an_image.size_type == 'auto_custom_max' %}
				{% set sizeAttrs = 'width="{{ item2.select_an_image.max_width }}" height="{{ item2.select_an_image.max_height }}" style="max-width: 100%; height: auto;"' %}
			{% endif %}
			 {% set loadingAttr = item2.select_an_image.loading != 'disabled' ? 'loading="{{ item2.select_an_image.loading }}"' : '' %}
			<img src="{{ item2.select_an_image.src }}" alt="{{ item2.select_an_image.alt }}" {{ loadingAttr }} {{ sizeAttrs }}>
		{% endif %}
		{% set href = item2.social_link.url.href %}
		{% if item2.social_link.url.type is equalto "EMAIL_ADDRESS" %}
			{% set href = "mailto:" + href %}
		{% endif %}
		<a href="{{ href }}"
			{% if item2.social_link.open_in_new_tab %}target="_blank"{% endif %}
			{% if item2.social_link.rel %}rel="{{ item2.social_link.rel }}"{% endif %}
			>
			Link text
		</a>
	{% endfor %}
	{% inline_text field="bio_text" value="{{ item.bio_text }}" %}
	{% set href = item.bio_link.url.href %}
	{% if item.bio_link.url.type is equalto "EMAIL_ADDRESS" %}
		{% set href = "mailto:" + href %}
	{% endif %}
	<a href="{{ href }}"
		{% if item.bio_link.open_in_new_tab %}target="_blank"{% endif %}
		{% if item.bio_link.rel %}rel="{{ item.bio_link.rel }}"{% endif %}
		>
		Link text
	</a>
{% endfor %}