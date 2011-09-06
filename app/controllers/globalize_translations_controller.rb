class GlobalizeTranslationsController < ApplicationController

  before_filter :globalize_translations_authenticator, :except => :for_js
  before_filter :set_globalize_app, :except => :for_js

  layout 'exvo_globalize'

  respond_to :html, :json
  respond_to :js, :only => :for_js
  
  def show
    @translations = I18n.backend.available_app_translations.merge({ :default_locale => I18n.default_locale })
    respond_with @translations
  end

  def list
    @languages = I18n.backend.available_locales.sort_by(&:to_s)

    hash = case params[:type]
      when "yaml-app"
        I18n.backend.available_app_translations
      when "yaml"
        I18n.backend.simple.available_translations
      when "db"
        I18n.backend.globalize_store.available_translations
      else
        I18n.backend.available_translations
      end

    @translations = params[:locale].present? ? { params[:locale].to_sym => hash[params[:locale].to_sym] } : hash
  end

  def for_js
    get_locale_from(params[:locale])
    locale = I18n.backend.available_translations.has_key?(@locale) ? @locale : I18n.default_locale
    @translations = I18n.backend.available_translations[locale]
  end

  def update
    translations = @globalize_app.fetch_translations

    if translations.present? and !translations.has_key?("errors")
      if I18n.backend.store_nested_translations(translations)
        flash.now[:notice] = 'Translations updated'
      else
        flash.now[:alert] = 'There was a problem while updating translations'
      end
    else
      flash.now[:alert] = "There was a problem while fetching translations: #{translations["errors"].to_s.downcase}"
    end

    render :show
  end

  private

  def get_locale_from(params)
    @locale = params.gsub(".js","").to_sym
  end
  
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
