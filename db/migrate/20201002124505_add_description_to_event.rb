class AddDescriptionToEvent < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :description, :textå
  end
end
