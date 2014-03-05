class ApplicationController < ActionController::Base
  include SessionsHelper
  include OAuthHelper
  include Api::PhotosHelper
  include ApplicationHelper
  include Api::FollowsHelper
  protect_from_forgery
end
