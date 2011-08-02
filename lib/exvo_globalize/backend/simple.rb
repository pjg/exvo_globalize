module I18n
  module Backend
    class Simple
      module Implementation

        # Extend the Simple backend with a custom `available_translations` method
        # returning a combined hash with all translations from this backend
        def available_translations
          send(:translations)
        end
      end

      include Implementation
    end
  end
end
