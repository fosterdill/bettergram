class Comment < ActiveRecord::Base
  attr_accessible :body, :media_id, :user_id, :username
  validates :body, :media_id, :user_id, :presence => true
end
