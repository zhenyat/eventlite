class EventsController < ApplicationController
  def index
    @events = Event.order('start_datetime ASC')
    render json: @events
  end

  def create
    # @event = Event.new(event_params)
    @event = current_user.events.new(event_params)
    if @event.save
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def show
    @event = Event.find(params[:id])
    # render json: @event
    render json: @event.as_json(except: :user_id, include: {user: {only: [:name, :nickname, :image]}})
  end
  
  private
  def event_params
    params.require(:event).permit(:title, :start_datetime, :location, :description, :image_url)
  end
end