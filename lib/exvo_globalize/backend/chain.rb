module I18n
  module Backend
    class Chain
      module Implementation

        # Extend the Chain backend with a custom `available_translations` method
        # returning a combined hash with translations from all chained backends
        def available_translations
          # reverse, so that the translations from the first backend (GlobalizeStore) overwrite/overshadow others
          @available_translations ||= backends.map { |backend| backend.available_translations }.reverse.inject(&:merge)
        end

        # Return a hash only with Application translations
        def available_app_translations
          # save original load_path
          load_path = I18n.load_path

          # load only app translations (Simple I18n backend)
          I18n.load_path = Dir.glob(File.join(Rails.root, 'config/locales', '**', '*.{yml,rb}'))
          simple.reload!
          simple.load_translations
          translations = simple.available_translations

          # restore original translations
          I18n.load_path = load_path
          simple.reload!
          simple.load_translations

          # return app's translations
          translations
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

        # convinience methods to quickly access a chosen backend

        # I18n.backend.simple
        def simple
          backends.detect { |backend| backend.is_a?(I18n::Backend::Simple) }
        end

        # I18n.backend.globalize_store
        def globalize_store
          backends.detect { |backend| backend.is_a?(I18n::Backend::GlobalizeStore) }
        end
      end

      include Implementation
    end
  end
end
