Bettergram::Application.routes.draw do
  get "root/index" => "root#index", :as => :root
  get "oauth/callback" => "o_auth#callback", :as => :callback
  get "oauth/connect" =>  "o_auth#connect", :as => :connect
  resource :session, :only => [:create, :new, :destroy]
  resources :users, :only => [:create, :new]
  namespace :api, :defaults => {:format => :json} do
    resource :like, :only => [:create, :destroy]
    resources :photos, :only => [:index]
    resource :user, :only => [:show]
    resources :users, :only => [:show]
    resources :comments, :only => [:create]
    resources :results, :only => [:index]
    resources :follows, :only => [:create, :destroy]
  end

  root :to => "root#index"
end
