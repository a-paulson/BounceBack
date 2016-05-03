class Api::DirectMessagesController < ApplicationController

  def create
    @conversation = Conversation.new(dm_params)
    @conversation.owner = current_user
    if @conversation.save
      ConversationUser.create!(conversation_id: @conversation.id, user_id: current_user.id)
      ConversationUser.create!(conversation_id: @conversation.id, user_id: other_user[:user_id])

      Pusher.trigger('user_' + User.find(other_user[:user_id]).username, 'new_conversation', {})
      render "api/conversations/show"
    else
      @errors = @conversation.errors.full_messages
      render :errors, status: 400
    end
  end

  private
  def dm_params
    params.require(:dm).permit(:title, :description, :private)
  end

  def other_user
    params.require(:dm).permit(:user_id)
  end

end
