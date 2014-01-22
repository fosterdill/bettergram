Bettergram::Application.routes.draw do
  get "root/index" => "root#index", :as => :root
  get "oauth/callback" => "o_auth#callback", :as => :callback
  get "oauth/connect" =>  "o_auth#connect", :as => :connect
  resource :session, :only => [:create, :new, :destroy]
  resources :users, :only => [:create, :new]
  namespace :api, :defaults => {:format => :json} do
    resources :photos, :only => [:index]
    resources :users, :only => [:show]
    resources :comments, :only => [:create]
  end

  root :to => "root#index"
end
