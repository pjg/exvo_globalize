require "exvo_globalize"
require "rails"
require "i18n"

module ExvoGlobalize
  class Engine < Rails::Engine
    initializer "exvo_globalize.configure_i18n" do |app|
      # Fallback for missing translations (will search for translations using I18n.default_locale if not found in requested locale)
      I18n::Backend::Chain.send(:include, I18n::Backend::Fallback)

      # caching layer
      I18n::Backend::GlobalizeStore.send(:include, I18n::Backend::Cache)
      I18n.cache_store = ActiveSupport::Cache.lookup_store(:memory_store)

      # chained backends; GlobalizeStore (database backed) first, then YAML files (default) (used as a fallback)
      I18n.backend = I18n::Backend::Chain.new(I18n::Backend::GlobalizeStore.new, I18n.backend)
    end
  end
end
