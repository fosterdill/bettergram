module OAuthHelper
  def current_instagram_client
    access_token = current_user.access_token
    client = Instagram.client(:access_token => access_token)
    if (client)
      return client
    end

    nil
  end

  def has_client?
    !current_instagram_user.nil?
  end
end
