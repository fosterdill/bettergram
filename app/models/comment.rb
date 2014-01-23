class Comment < ActiveRecord::Base
  attr_accessible :body, :media_id, :user_id
  validates :body, :media_id, :user_id, :presence => true
end
