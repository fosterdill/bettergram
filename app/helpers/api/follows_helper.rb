module Api::FollowsHelper
  def get_client
    @client = current_instagram_client
  end
end
