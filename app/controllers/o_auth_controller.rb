class OAuthController < ApplicationController
  CALLBACK_URL = callback_url

  def callback
    response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
    session[:access_token] = response.access_token
    redirect '/'
  end

  def connect
    redirect Instagram.authorize_url(:redirect_uri => CALLBACK_URL)
  end
end
