class GlobalizeTranslationsController < ApplicationController

  before_filter :globalize_translations_authenticator
  before_filter :set_globalize_app

  layout 'exvo_globalize'

  respond_to :html, :json

  def show
    @translations = I18n.backend.available_app_translations.merge({ :default_locale => I18n.default_locale })
    respond_with @translations
  end

  def list
    @languages = I18n.backend.available_locales.sort_by(&:to_s)

    case params[:type]
    when "yaml"
      @translations = I18n.backend.available_app_translations
    when "db"
      @translations = I18n.backend.globalize_store.available_translations
    else
      @translations = I18n.backend.available_translations
    end

    if params[:locale].present?
      @translations = @translations.map{|key, value| {key => value} if key.to_s == params[:locale]}.compact.inject(&:deep_merge)
    end
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
