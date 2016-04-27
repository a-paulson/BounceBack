class Api::ConversationsController < ApplicationController
    def show
      #@conversation = get_conversation()
      render json: {answer: :yes}
    end

    def index
    end

    private
    def conversation_params
    end

    def get_conversation(type, id)
    end

    def get_all_conversations
    end
end
