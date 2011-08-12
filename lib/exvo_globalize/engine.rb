require "rails"
require "i18n"
require "exvo_globalize"

module ExvoGlobalize
  class Engine < Rails::Engine
    initializer "exvo_globalize.configure_i18n" do |app|
      # make pluralization rules available for both backends
      I18n::Backend::GlobalizeStore.send(:include, I18n::Backend::Pluralization)
      I18n::Backend::Simple.send(:include, I18n::Backend::Pluralization)

      # fallback for missing translations (will search for translations using I18n.default_locale if not found in requested locale)
      I18n::Backend::Chain.send(:include, I18n::Backend::Fallback)

      # caching layer
      I18n::Backend::GlobalizeStore.send(:include, I18n::Backend::Cache)
      I18n.cache_store = ActiveSupport::Cache.lookup_store(:memory_store)

      # chained backends (fall back from first backend to the second if translation is not found in the first)
      # GlobalizeStore first (database backed), YAML files second (Simple backend, the default one)
      I18n.backend = I18n::Backend::Chain.new(I18n::Backend::GlobalizeStore.new, I18n.backend)
    end
  end
end
