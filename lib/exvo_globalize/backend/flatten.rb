module I18n
  module Backend
    module Flatten

      # Nest keys for flatten (dotted) hashes
      #   IN:  { "hello.world" => "hello world" }
      #   OUT: { :hello => { :world => "hello world" } }
      def nest_translations(hash)
        hash.map do |main_key, main_value|
          main_key.to_s.split(".").reverse.inject(main_value) do |value, key|
            if value.is_a?(Hash)
              { key.to_sym => nest_translations(value) }
            else
              { key.to_sym => value }
            end
          end
        end.inject(&:deep_merge)
      end

    end

    include Flatten
  end
end
