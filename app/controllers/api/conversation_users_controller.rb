class Api::ConversationUsersController < ApplicationController
  before_action :ensure_current_user!

  def create
    @cu = ConversationUser.new(cu_params)
    @cu.user_id = current_user.id
    if @cu.save
      redirect_to api_conversation_url(@cu.conversation_id)
    else
      @errors = @cu.errors.full_messages
      render :errors, status: 400
    end
  end

  def destroy
    @cu = ConversationUser.where(user_id: current_user.id, conversation_id: cu_params[:conversation_id]).first
    if (Conversation.find(@cu.conversation_id).owner == current_user)
      render json: {error: "A user cannot unsubscribe from a conversation they own."}, status: 400
    else
      if @cu
        @cu.destroy
        render json: {id: @cu.conversation_id}
      else
        render json: {error: "You are not subscribed to this conversation."}, status: 400
      end
    end
  end

  private
  def cu_params
    params.require(:conversation_user).permit(:conversation_id, :user_id)
  end
end
