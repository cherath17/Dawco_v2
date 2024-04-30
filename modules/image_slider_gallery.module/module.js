/* global Splide */

// This is a fallback config in the event that the module json config is not found in the DOM.
const DEFAULT_MODULE_CONFIG = Object.freeze({
  /* eslint-disable camelcase */
  show_thumbnails: 'false',
  show_main_arrows: 'true',
  loop_slides: 'false',
  auto_advance: 'false',
  auto_advance_speed_seconds: '5',
  image_settings_sizing: 'static',
  image_settings_transition: 'slide',
  image_settings_caption_position: 'below',
  /* eslint-enable camelcase */
});

const getModuleConfig = moduleName => {
  const configJSONScript = document.querySelector(
    `[data-gallery_slider-config="config_${moduleName}"]`
  );
  if (configJSONScript) {
    return JSON.parse(configJSONScript.textContent);
  }
  return DEFAULT_MODULE_CONFIG;
};

document.addEventListener('DOMContentLoaded', () => {
  const gallerySliders = document.querySelectorAll('[data-gallery_slider]');

  if (gallerySliders.length > 0) {
    gallerySliders.forEach(gallerySlider => {
      const sliderModuleName = gallerySlider.dataset.gallery_slider;
      const sliderConfig = getModuleConfig(sliderModuleName);
      const mainSlider = gallerySlider.querySelector('.splide__main');
      const thumbnailNav = gallerySlider.querySelector('.splide__nav');

      if (mainSlider) {
        const mainSliderConfig = {
          lazyLoad: 'nearby',
          classes: { arrows: 'splide__arrows hs-gallery-slider-main__arrow' },
        };

        if (sliderConfig?.slides_per_page > 1) {
          mainSliderConfig.perPage = parseInt(sliderConfig.slides_per_page, 10);
          mainSliderConfig.gap = parseInt(sliderConfig.gap_between_slides, 10);
        }

        mainSliderConfig.arrows = sliderConfig?.show_main_arrows === 'true';
        mainSliderConfig.pagination = sliderConfig?.show_dots === 'true';

        mainSliderConfig.autoplay = sliderConfig?.auto_advance === 'true';
        mainSliderConfig.interval = sliderConfig?.auto_advance_speed_seconds
          ? parseInt(sliderConfig.auto_advance_speed_seconds, 10) * 1000
          : 5000;

        mainSliderConfig.type = sliderConfig?.image_transition
          ? sliderConfig.image_transition
          : 'slide';

        if (sliderConfig?.loop_slides === 'true') {
          if (mainSliderConfig.type === 'slide') {
            mainSliderConfig.type = 'loop';
          } else {
            mainSliderConfig.rewind = true;
          }
        }

        if (sliderConfig?.splidei18n) {
          mainSliderConfig.i18n = sliderConfig.splidei18n;
        }

        const main = new Splide(mainSlider, mainSliderConfig);

        if (thumbnailNav) {
          const thumbSliderConfig = {
            lazyLoad: 'nearby',
            preloadPages: 6,
            fixedWidth: parseInt(sliderConfig.thumbnail_width, 10),
            autoHeight: true,
            gap: 6,
            pagination: false,
            isNavigation: true,
            classes: { arrows: 'splide__arrows hs-gallery-slider-nav__arrow' },
            breakpoints: { 768: { fixedWidth: 135 } },
          };

          if (sliderConfig?.splidei18n) {
            thumbSliderConfig.i18n = sliderConfig.splidei18n;
          }

          const thumbnails = new Splide(thumbnailNav, thumbSliderConfig);

          main.sync(thumbnails);
          main.mount();
          thumbnails.mount();
        } else {
          main.mount();
        }
      }
    });
  }
});
