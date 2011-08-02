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
      end

      include Implementation
    end
  end
end
