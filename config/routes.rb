Rails.application.routes.draw do
  scope '/globalize' do
    resources :translations, :only => [:index], :as => 'globalize_translations', :controller => 'globalize_translations'
  end
end
