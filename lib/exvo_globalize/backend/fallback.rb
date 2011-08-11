module I18n
  module Backend
    module Fallback
      module Implementation

        # add the simplest possible fallback to the I18n.default_locale for missing translations
        def translate(locale, key, default_options = {})
          begin
            # will look for a translation in all backends (using requested locale)
            super(locale, key, default_options)
          rescue I18n::MissingTranslationData
            # if not found it will look again in all backends, but using I18n.default_locale as a locale
            super(I18n.default_locale, key, default_options)
          end
        end

      end

      include Implementation
    end
  end
end
