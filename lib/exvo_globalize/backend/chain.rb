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

        # stores a whole Hash of flattened translations
        def store_flatten_translations(translations_hash)
          return false if translations_hash.blank?

          translations_hash.reject { |key, value| key.to_sym == :default_locale }.each do |locale, translations|
            next if translations.blank?

            translations.each do |key, value|
              store_flatten_translation(locale, key, value)
            end
          end
        end

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
