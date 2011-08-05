Rails.application.routes.draw do
  scope '/globalize' do
    resource :translations, :only => [:show, :update], :as => 'globalize_translations', :controller => 'globalize_translations' do
    end
  end
end
