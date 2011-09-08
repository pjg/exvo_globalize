Rails.application.routes.draw do
  scope '/globalize' do
    resource :translations, :only => [:show, :update], :as => 'globalize_translations', :controller => 'globalize_translations' do
      resources :js, :only => [:show], :as => 'javascript', :controller => 'globalize_translations'
      get :list
    end
  end
end
