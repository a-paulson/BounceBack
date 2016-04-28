class Api::ConversationUsersController < ApplicationController

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
    if @cu
      @cu.destroy
      render json: {id: @cu.conversation_id}
    else
      render json: {error: "You are not subscribed to this conversation."}, status: 400
    end
  end

  private
  def cu_params
    params.require(:conversation_user).permit(:conversation_id)
  end
end
