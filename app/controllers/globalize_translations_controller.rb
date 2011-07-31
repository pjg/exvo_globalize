class GlobalizeTranslationsController < ApplicationController

  before_filter :globalize_translations_authenticator, :except => [:index]

  # get :index as JSON should not require authentication
  before_filter(:only => :index) do |controller|
    globalize_translations_authenticator unless controller.request.format.json?
  end

  layout false

  respond_to :html, :json

  def index
    # returns {"default_locale":"en","pl":{"hello.world":"Witaj \u015bwiecie","hello.earth":"Witaj ziemio"},"en":{"hello.world":"Hello world","hello.earth":"Hello Earth"}}
    @translations = I18n.backend.available_translations.merge({ :default_locale => I18n.default_locale })
    respond_with @translations
  end

  private

  def globalize_translations_authenticator
    if I18n::Backend::GlobalizeStore.authenticator && I18n::Backend::GlobalizeStore.authenticator.respond_to?(:call)
      I18n::Backend::GlobalizeStore.authenticator.bind(self).call
    end
  end

end
