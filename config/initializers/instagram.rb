require 'instagram'

Instagram.configure do |config|
  if Rails.env == 'development'
    config.client_id = ENV['DEV_CLIENT_ID']
    config.client_secret = ENV['DEV_CLIENT_SECRET']
  elsif Rails.env == 'production'
    config.client_id = ENV['PRO_CLIENT_ID']
    config.client_secret = ENV['PRO_CLIENT_SECRET']
  end
end
