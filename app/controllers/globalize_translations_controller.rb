class GlobalizeTranslationsController < ApplicationController
  respond_to :json

  def index
    # returns {"default_locale":"en","pl":{"hello.world":"Witaj \u015bwiecie","hello.earth":"Witaj ziemio"},"en":{"hello.world":"Hello world","hello.earth":"Hello Earth"}}
    respond_with I18n.backend.available_translations.merge({ :default_locale => I18n.default_locale })
  end
end
