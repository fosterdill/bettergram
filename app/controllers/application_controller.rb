class ApplicationController < ActionController::Base
  include SessionsHelper
  include OAuthHelper
  include Api::PhotosHelper
  protect_from_forgery
end
