Bettergram::Application.routes.draw do
  get "root/index" => "root#index", :as => :root
  get "oauth/callback" => "o_auth#callback", :as => :callback
  get "oauth/connect" =>  "o_auth#connect", :as => :connect
  resource :session, :only => [:create, :new, :destroy]
  resources :users, :only => [:create, :new]
  namespace :api, :defaults => {:format => :json} do
    resources :photos, :only => [:index] do
      resource :like, :only => [:create, :destroy]
    end
    resources :users, :only => [:index, :show]
    resources :comments, :only => [:create]
    resources :results, :only => [:index]
  end

  root :to => "root#index"
end
