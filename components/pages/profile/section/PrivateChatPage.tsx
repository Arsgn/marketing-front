"use client";
import { FC, useState, useEffect, useRef } from "react";
import scss from "./PrivateChatPage.module.scss";
import {
  useGetUsers,
  useGetPrivateMessages,
  useSendPrivateMessage,
  useGetMessages,
  useSendMessage,
  useGetLastMessages,
} from "@/api/chat";
import { useAuthStore } from "@/store/auth.store";
import { IoSend, IoCall, IoVideocam, IoEllipsisVertical, IoPeople } from "react-icons/io5";
import { BsEmojiSmile, BsPaperclip, BsMic } from "react-icons/bs";

export const PrivateChatPage: FC = () => {
  const { user } = useAuthStore();
  const { data: usersData } = useGetUsers();
  const sendPrivateMessage = useSendPrivateMessage();
  const { data: publicMessagesData } = useGetMessages();
  const sendPublicMessage = useSendMessage();
  const { data: lastMessagesData } = useGetLastMessages();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isPublicChat, setIsPublicChat] = useState(false);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messagesData } = useGetPrivateMessages(
    selectedUserId || 0,
    !!selectedUserId && !isPublicChat 
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesData?.data, publicMessagesData?.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    if (isPublicChat) {
      sendPublicMessage.mutate(
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
    } else {
      if (!selectedUserId) return;

      sendPrivateMessage.mutate(
        {
          receiverId: selectedUserId,
          message,
        },
        {
          onSuccess: () => {
            setMessage("");
          },
          onError: (error: any) => {
            alert(
              error.response?.data?.message ||
                "Ошибка отправки приватного сообщения"
            );
          },
        }
      );
    }
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
    return `${day}.${month}`;
  };

  const formatTimeDetailed = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    if (diffInHours < 24) {
      return `Today, ${hours}:${minutes}`;
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };

  const getUserLastMessage = (userId: number) => {
    if (!lastMessagesData?.data) return "Начните диалог";

    const lastMsg = lastMessagesData.data.find((msg) => msg.userId === userId);
    
    if (!lastMsg || !lastMsg.lastMessage) {
      return "Начните диалог";
    }

    const message = lastMsg.lastMessage;
    return message.length > 35 ? `${message.substring(0, 35)}...` : message;
  };

  const getUserLastMessageTime = (userId: number) => {
    if (!lastMessagesData?.data) return "";

    const lastMsg = lastMessagesData.data.find((msg) => msg.userId === userId);
    
    if (!lastMsg || !lastMsg.createdAt) {
      return "";
    }

    return formatTime(lastMsg.createdAt);
  };

  const handleSelectPublicChat = () => {
    setIsPublicChat(true);
    setSelectedUserId(null);
  };

  const handleSelectPrivateChat = (userId: number) => {
    setIsPublicChat(false);
    setSelectedUserId(userId);
  };

  const selectedUser = usersData?.data.find((u) => u.id === selectedUserId);
  const otherUsers = usersData?.data.filter((u) => u.id !== user?.id) || [];

  return (
    <section className={scss.PrivateChatPage}>
      <div className={scss.chatContainer}>
        <div className={scss.contactsList}>
          <div className={scss.contactsHeader}>
            <h2>Сообщения</h2>
          </div>

          <div className={scss.contacts}>
            <div
              className={`${scss.contactItem} ${scss.publicChatItem} ${
                isPublicChat ? scss.active : ""
              }`}
              onClick={handleSelectPublicChat}
            >
              <div className={scss.contactAvatar}>
                <div className={scss.publicChatIcon}>
                  <IoPeople />
                </div>
              </div>

              <div className={scss.contactInfo}>
                <div className={scss.contactTop}>
                  <h3>Общий чат</h3>
                  <span className={scss.time}>
                    {publicMessagesData?.data?.length || 0}
                  </span>
                </div>
                <p className={scss.lastMessage}>
                  {publicMessagesData?.data?.[
                    publicMessagesData.data.length - 1
                  ]?.message || "Начните общение"}
                </p>
              </div>
            </div>

            {otherUsers.length > 0 ? (
              otherUsers.map((contact) => (
                <div
                  key={contact.id}
                  className={`${scss.contactItem} ${
                    selectedUserId === contact.id && !isPublicChat
                      ? scss.active
                      : ""
                  }`}
                  onClick={() => handleSelectPrivateChat(contact.id)}
                >
                  <div className={scss.contactAvatar}>
                    <img
                      src={contact.avatar || "/avatar.svg"}
                      alt={contact.name || "User"}
                    />
                    <span className={scss.onlineStatus}></span>
                  </div>

                  <div className={scss.contactInfo}>
                    <div className={scss.contactTop}>
                      <h3>{contact.name || "Пользователь"}</h3>
                      <span className={scss.time}>
                        {getUserLastMessageTime(contact.id) || ""}
                      </span>
                    </div>
                    <p className={scss.lastMessage}>
                      {getUserLastMessage(contact.id)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className={scss.noContacts}>
                <p>Нет других пользователей</p>
              </div>
            )}
          </div>
        </div>

        <div className={scss.chatArea}>
          {isPublicChat ? (
            <>
              <div className={scss.chatHeader}>
                <div className={scss.chatUserInfo}>
                  <div className={scss.chatAvatar}>
                    <div className={scss.publicChatIcon}>
                      <IoPeople />
                    </div>
                  </div>
                  <div className={scss.chatUserDetails}>
                    <h2>Общий чат</h2>
                    <span className={scss.status}>
                      {publicMessagesData?.data?.length || 0} сообщений
                    </span>
                  </div>
                </div>

                <div className={scss.chatActions}>
                  <button className={scss.actionBtn}>
                    <IoEllipsisVertical />
                  </button>
                </div>
              </div>

              <div className={scss.messagesArea}>
                {publicMessagesData?.data &&
                publicMessagesData.data.length > 0 ? (
                  publicMessagesData.data.map((msg) => {
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
                              {formatTimeDetailed(msg.createdAt)}
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
                  <div className={scss.emptyChat}>
                    <p>Будьте первым, кто напишет в общий чат!</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className={scss.messageForm} onSubmit={handleSubmit}>
                <button type="button" className={scss.attachBtn}>
                  <BsPaperclip />
                </button>

                <input
                  type="text"
                  placeholder="Напишите сообщение в общий чат..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={sendPublicMessage.isPending}
                />

                <button type="button" className={scss.emojiBtn}>
                  <BsEmojiSmile />
                </button>

                {message.trim() ? (
                  <button
                    type="submit"
                    className={scss.sendBtn}
                    disabled={sendPublicMessage.isPending}
                  >
                    <IoSend />
                  </button>
                ) : (
                  <button type="button" className={scss.micBtn}>
                    <BsMic />
                  </button>
                )}
              </form>
            </>
          ) : selectedUserId && selectedUser ? (
            <>
              <div className={scss.chatHeader}>
                <div className={scss.chatUserInfo}>
                  <div className={scss.chatAvatar}>
                    <img
                      src={selectedUser.avatar || "/avatar.svg"}
                      alt={selectedUser.name || "User"}
                    />
                    <span className={scss.onlineStatus}></span>
                  </div>
                  <div className={scss.chatUserDetails}>
                    <h2>{selectedUser.name || "Пользователь"}</h2>
                    <span className={scss.status}>В сети</span>
                  </div>
                </div>

                <div className={scss.chatActions}>
                  <button className={scss.actionBtn}>
                    <IoCall />
                  </button>
                  <button className={scss.actionBtn}>
                    <IoVideocam />
                  </button>
                  <button className={scss.actionBtn}>
                    <IoEllipsisVertical />
                  </button>
                </div>
              </div>

              <div className={scss.messagesArea}>
                {messagesData?.data && messagesData.data.length > 0 ? (
                  messagesData.data.map((msg) => {
                    const isMyMessage = user?.id === msg.senderId;

                    return (
                      <div
                        key={msg.id}
                        className={`${scss.messageWrapper} ${
                          isMyMessage ? scss.myMessage : scss.otherMessage
                        }`}
                      >
                        <div className={scss.messageBubble}>
                          <p>{msg.message}</p>
                          <span className={scss.time}>
                            {formatTimeDetailed(msg.createdAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className={scss.emptyChat}>
                    <p>Начните разговор с {selectedUser.name}!</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className={scss.messageForm} onSubmit={handleSubmit}>
                <button type="button" className={scss.attachBtn}>
                  <BsPaperclip />
                </button>

                <input
                  type="text"
                  placeholder="Напишите сообщение..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={sendPrivateMessage.isPending}
                />

                <button type="button" className={scss.emojiBtn}>
                  <BsEmojiSmile />
                </button>

                {message.trim() ? (
                  <button
                    type="submit"
                    className={scss.sendBtn}
                    disabled={sendPrivateMessage.isPending}
                  >
                    <IoSend />
                  </button>
                ) : (
                  <button type="button" className={scss.micBtn}>
                    <BsMic />
                  </button>
                )}
              </form>
            </>
          ) : (
            <div className={scss.noSelectedChat}>
              <div className={scss.emptyState}>
                <h2>Выберите чат</h2>
                <p>Выберите контакт слева, чтобы начать общение</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PrivateChatPage;