class Api::MessagesController < ApplicationController
  before_action :ensure_current_user!

  # def show
  # end
  #
  # def index
  # end

  def create
    @message = Message.new(message_params)
    @message.author = current_user
    if @message.save
      Pusher.trigger('conversation_' + @message.conversation_id.to_s, 'new_message', {})
      redirect_to api_conversation_url(@message.conversation_id)
    else
      @errors = @message.errors.full_messages
      render :errors, status: 400
    end
  end

  # def update
  # end
  #
  # def destroy
  # end

  private

  def message_params
    params.require(:message).permit(:body, :conversation_id)
  end

end
