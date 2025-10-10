import api from "../../../utils" 

export const createConversationAPI = async (data: any) => {
    const response = await api.post("/conversations", data);
    return response.data
}

export const getConversationAPI = async () => {
    const response = await api.get("/conversations/my-conversations")
    return response.data
}

export const createMessageAPI = async (data: any) => {
    const response = await api.post("/messages", data)
    return response.data
}

export const getMessageAPI = async (id: number) => {
    const response = await api.get(`/messages?conversationId=${id}`)
    return response.data
}