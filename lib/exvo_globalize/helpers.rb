module ExvoGlobalize
  module Helpers

    # Prints nested Hash as a nested <ul> and <li> tags
    # - keys are wrapped in <strong> tags
    # - values are wrapped in <span> tags
    def HashToHTML(hash, opts = {})
      return if !hash.is_a?(Hash)

      indent_level = opts.fetch(:indent_level) { 0 }

      out = " " * indent_level + "<ul>\n"

      hash.each do |key, value|
        out += " " * (indent_level + 2) + "<li><strong>#{key}:</strong>"

        if value.is_a?(Hash)
          out += "\n" + HashToHTML(value, :indent_level => indent_level + 2) + " " * (indent_level + 2) + "</li>\n"
        else
          out += " <span>#{value}</span></li>\n"
        end
      end

      out += " " * indent_level + "</ul>\n"
    end

  end
end
