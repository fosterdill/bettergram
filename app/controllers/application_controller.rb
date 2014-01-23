class ApplicationController < ActionController::Base
  include SessionsHelper
  include OAuthHelper
  include Api::PhotosHelper
  include ApplicationHelper
  protect_from_forgery
end
