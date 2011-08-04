module I18n
  module Backend
    class Chain
      module Implementation

        # Extend the Chain backend with a custom `available_translations` method
        # returning a combined hash with translations from all chained backends
        def available_translations
          # reverse, so that the translations from the first backend (GlobalizeStore) overwrite/overshadow others
          backends.map { |backend| backend.available_translations }.reverse.inject(&:merge)
        end

        # add the simplest possible fallback to the I18n.default_locale for missing translations
        def translate_with_fallback(locale, key, default_options = {})
          begin
            # will look for a translation in all backends (using requested locale)
            translate_without_fallback(locale, key, default_options)
          rescue I18n::MissingTranslationData
            # if it does not find a translation it will look again in all backends, but using I18n.default_locale as a locale
            translate_without_fallback(I18n.default_locale, key, default_options)
          end
        end

        alias_method_chain :translate, :fallback

        # pass-through for the `store_flatten_translation()` method to the GlobalizeStore
        # so that I18n.backend.store_flatten_translation() works
        def store_flatten_translation(*args)
          backends.each do |backend|
            return backend.send(:store_flatten_translation, *args) if backend.respond_to?(:store_flatten_translation)
          end
        end
      end

      include Implementation
    end
  end
end
