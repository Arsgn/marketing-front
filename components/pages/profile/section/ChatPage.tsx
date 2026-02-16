"use client";
import { FC, useState, useEffect, useRef } from "react";
import scss from "./ChatPage.module.scss";
import { useGetMessages, useSendMessage } from "@/api/chat";
import { useAuthStore } from "@/store/auth.store";
import { IoSend } from "react-icons/io5";

const ChatPage: FC = () => {
  const { user } = useAuthStore();
  const { data: messagesData, isLoading } = useGetMessages();
  const sendMessage = useSendMessage();

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesData?.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    sendMessage.mutate(
      { message },
      {
        onSuccess: () => {
          setMessage("");
        },
        onError: (error: any) => {
          alert(
            error.response?.data?.message || "Ошибка отправки сообщения"
          );
        },
      }
    );
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  if (isLoading) {
    return (
      <section className={scss.ChatPage}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.loading}>Загрузка чата...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={scss.ChatPage}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.chatContainer}>
            <div className={scss.chatHeader}>
              <h1>Общий чат</h1>
              <p>
                {messagesData?.data?.length || 0}{" "}
                {messagesData?.data?.length === 1
                  ? "сообщение"
                  : "сообщений"}
              </p>
            </div>

            <div className={scss.messagesArea}>
              {messagesData?.data && messagesData.data.length > 0 ? (
                messagesData.data.map((msg) => {
                  const isMyMessage = user?.id === msg.userId;

                  return (
                    <div
                      key={msg.id}
                      className={`${scss.messageWrapper} ${
                        isMyMessage ? scss.myMessage : scss.otherMessage
                      }`}
                    >
                      {!isMyMessage && (
                        <div className={scss.avatar}>
                          <img
                            src={msg.user.avatar || "/avatar.svg"}
                            alt={msg.user.name || "User"}
                          />
                        </div>
                      )}

                      <div className={scss.messageContent}>
                        {!isMyMessage && (
                          <div className={scss.userName}>
                            {msg.user.name || "Пользователь"}
                          </div>
                        )}
                        <div className={scss.messageBubble}>
                          <p>{msg.message}</p>
                          <span className={scss.time}>
                            {formatTime(msg.createdAt)}
                          </span>
                        </div>
                      </div>

                      {isMyMessage && (
                        <div className={scss.avatar}>
                          <img
                            src={msg.user.avatar || "/avatar.svg"}
                            alt={msg.user.name || "You"}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className={scss.emptyState}>
                  <p>Пока нет сообщений</p>
                  <span>Будьте первым, кто напишет!</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className={scss.messageForm} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Введите сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={sendMessage.isPending}
              />
              <button
                type="submit"
                disabled={sendMessage.isPending || !message.trim()}
              >
                <IoSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;