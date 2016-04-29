class Api::ConversationsController < ApplicationController
    before_action :ensure_current_user!

    def show
      @conversation = Conversation.includes(:owner, messages: [:author]).find(params[:id])
      if @conversation.users.include?(current_user)
        if @conversation.users.include?(current_user)
          render :show
        else
          render json: {error: "You are not a member of this conversation."}, status: 400
        end
      else
        render json: {errors: "You are not the subscribed to this conversation"}, status: 400
      end
    end

    def index
      @conversations = Conversation.joins(conversation_users: :user).where(users: {id: current_user.id}).includes(:owner);
      render :index
    end

    def create
      @conversation = Conversation.new(conversation_params)
      @conversation.owner = current_user
      if @conversation.save
        ConversationUser.create!(conversation_id: @conversation.id, user_id: current_user.id)
        render :show
      else
        @errors = @conversation.errors.full_messages
        render :errors, status: 400
      end
    end

    def update
      @conversation = Conversation.find(params[:id])
      if @conversation.owner == current_user
        if @conversation.update(conversation_params)
          render :show
        else
          @errors = @conversation.errors.full_messages
          render :errors, status: 400
        end
      else
        render json: {errors: "You are not the owner of this conversation"}, status: 400
      end
    end

    def destroy
      @conversation = Conversation.find(params[:id])
      if @conversation.owner == current_user
        @conversation.destroy
        # render nothing: true, status: 200
        render json: {id: @conversation.id}, status: 200
      else
        render json: {errors: "You are not the owner of this conversation"}, status: 400
      end
    end

    private
    def conversation_params
      params.require(:conversation).permit(:title, :description)
    end
end
