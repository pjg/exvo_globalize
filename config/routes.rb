Rails.application.routes.draw do
  scope '/globalize' do
    resources :translations, :only => [:index], :as => 'globalize_translations', :controller => 'globalize_translations' do
      put :update_many, :on => :collection
    end
  end
end
