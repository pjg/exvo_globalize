module I18n
  module Backend
    class GlobalizeStore
      # based on https://github.com/svenfuchs/i18n-active_record/blob/master/lib/i18n/backend/active_record.rb

      # Authentication proc
      cattr_accessor :authenticator

      module Implementation
        include Base, Flatten

        def available_locales
          GlobalizeTranslation.available_locales
        end

        # returns a Hash with all translations (translation keys are dot separated strings, not hashes):
        #   {:en=>{"hello.world"=>"Hello world", "hello.earth"=>"Hello Earth"}, :pl=>{"hello.world"=>"Witaj świecie", "hello.earth"=>"Witaj ziemio"}}
        def available_translations(locale = nil)
          (locale.present? ? GlobalizeTranslation.locale(locale.to_s) : GlobalizeTranslation.all).
            inject({}) do |result, element|
              result[element.locale.to_sym] ||= {}
              result[element.locale.to_sym][element.key] = element.value
              result
            end
        end

        def store_translations(locale, data, options = {})
          escape = options.fetch(:escape, true)
          flatten_translations(locale, data, escape, false).each do |key, value|
            store_flatten_translation(locale, key, value)
          end
        end

        def store_flatten_translation(locale, key, value)
          GlobalizeTranslation.locale(locale).lookup(expand_keys(key)).delete_all
          GlobalizeTranslation.create(:locale => locale.to_s, :key => key.to_s, :value => value)
        end

        protected

        def lookup(locale, key, scope = [], options = {})
          key = normalize_flat_keys(locale, key, scope, options[:separator])
          result = GlobalizeTranslation.locale(locale).lookup(key).all

          if result.empty?
            nil
          elsif result.first.key == key
            result.first.value
          else
            chop_range = (key.size + FLATTEN_SEPARATOR.size)..-1
            result = result.inject({}) do |hash, r|
              hash[r.key.slice(chop_range)] = r.value
              hash
            end
            result.deep_symbolize_keys
          end
        end

        # For a key :'foo.bar.baz' return ['foo', 'foo.bar', 'foo.bar.baz']
        def expand_keys(key)
          key.to_s.split(FLATTEN_SEPARATOR).inject([]) do |keys, key|
            keys << [keys.last, key].compact.join(FLATTEN_SEPARATOR)
          end
        end
      end

      include Implementation
    end
  end
end
