class ApplicationController < ActionController::Base
  include SessionsHelper
  include OAuthHelper
  protect_from_forgery
end
