require "exvo_globalize"
require "rails"
require "i18n"

module ExvoGlobalize
  class Engine < Rails::Engine
    initializer "exvo_globalize.configure_i18n" do |app|
      # database backed store
      I18n.backend = I18n::Backend::GlobalizeStore.new

      # caching layer
      I18n::Backend::GlobalizeStore.send(:include, I18n::Backend::Cache)
      I18n.cache_store = ActiveSupport::Cache.lookup_store(:memory_store)
    end
  end
end
