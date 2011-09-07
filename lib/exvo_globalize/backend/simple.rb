module I18n
  module Backend
    class Simple
      module Implementation

        # Extend the Simple backend with a custom `available_translations` method
        # returning a combined hash with all translations from this backend
        def available_translations
          # simple backend is lazy loaded (woken up by first I18n.t() call)
          # wake it up if it's still sleeping
          send(:init_translations) unless initialized?

          # nested Hash with all translations
          send(:translations)
        end
      end

      include Implementation
    end
  end
end
