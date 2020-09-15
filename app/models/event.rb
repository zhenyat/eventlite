class Event < ApplicationRecord
  validates :title,  presence: true
  validates :start_datetime, presence: true
  validates :location, presence: true
end
