class GlobalizeTranslationsController < ApplicationController

  before_filter :globalize_translations_authenticator
  before_filter :set_globalize_app

  layout 'exvo_globalize'

  respond_to :html, :json

  def show
    # returns {"default_locale":"en","pl":{"hello.world":"Witaj \u015bwiecie","hello.earth":"Witaj ziemio"},"en":{"hello.world":"Hello world","hello.earth":"Hello Earth"}}
    @translations = I18n.backend.available_app_translations.merge({ :default_locale => I18n.default_locale })
    respond_with @translations
  end

  def update
    if I18n.backend.store_nested_translations(@globalize_app.fetch_translations)
      flash.now[:notice] = 'Translations updated'
    else
      flash.now[:alert] = 'There was a problem while updating translations'
    end
    render :show
  end

  private

  def globalize_translations_authenticator
    # get :show as JSON does not require authentication
    return if params[:action].to_s == 'show' and request.format.json?

    # call custom authenticator method if available
    if I18n::Backend::GlobalizeStore.authenticator && I18n::Backend::GlobalizeStore.authenticator.respond_to?(:call)
      I18n::Backend::GlobalizeStore.authenticator.bind(self).call
    end
  end

  def set_globalize_app
    @globalize_app ||= GlobalizeApp.new(ENV["GLOBALIZE_REQUEST_HOST"] || request.host)
  end

end
