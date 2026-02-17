"use client";
import { FC, useState, useEffect, useRef } from "react";
import scss from "./PrivateChatPage.module.scss";
import {
  useGetUsers,
  useGetPrivateMessages,
  useSendPrivateMessage,
  useGetMessages,
  useSendMessage,
} from "@/api/chat";
import { useAuthStore } from "@/store/auth.store";
import { IoPeople } from "react-icons/io5";

const PrivateChatPage: FC = () => {
  const { user } = useAuthStore();
  const [message, setMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isPublicChat, setIsPublicChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: usersData } = useGetUsers();
  const { data: publicMessagesData } = useGetMessages();
  const sendPublicMessage = useSendMessage();

  const { data: privateMessageData } = useGetPrivateMessages(
    selectedUserId || 0,
    !!selectedUserId && !isPublicChat
  );
  const { mutateAsync: sendPrivateMessage, isPending } = useSendPrivateMessage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [privateMessageData?.data, publicMessagesData?.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (isPublicChat) {
      sendPublicMessage.mutate({ message }, { onSuccess: () => setMessage("") });
    } else {
      if (!selectedUserId) return;
      await sendPrivateMessage({ receiverId: selectedUserId, message });
      setMessage("");
    }
  };

  const otherUsers = usersData?.data.filter((u) => u.id !== user?.id) || [];
  const selectedUser = usersData?.data.find((u) => u.id === selectedUserId);

  return (
    <section className={scss.PrivateChatPage}>
      <div className={scss.chatContainer}>

        <div className={scss.contactsList}>
          <h2>Сообщения</h2>

          <div
            className={`${scss.contactItem} ${isPublicChat ? scss.active : ""}`}
            onClick={() => { setIsPublicChat(true); setSelectedUserId(null); }}
          >
            <IoPeople size={24} />
            <span>Общий чат</span>
          </div>

          {otherUsers.map((contact) => (
            <div
              key={contact.id}
              className={`${scss.contactItem} ${selectedUserId === contact.id && !isPublicChat ? scss.active : ""}`}
              onClick={() => { setIsPublicChat(false); setSelectedUserId(contact.id); }}
            >
              <img src={contact.avatar || "/avatar.svg"} alt={contact.name || "User"} />
              <span>{contact.name || "Пользователь"}</span>
            </div>
          ))}
        </div>

        <div className={scss.chatArea}>
          {isPublicChat ? (
            <>
              <h2>Общий чат</h2>

              <div className={scss.messagesArea}>
                {publicMessagesData?.data?.map((msg) => (
                  <div
                    key={msg.id}
                    className={user?.id === msg.userId ? scss.myMessage : scss.otherMessage}
                  >
                    <img src={msg.user.avatar || "/avatar.svg"} alt="" />
                    <div>
                      <span>{msg.user.name}</span>
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </>

          ) : selectedUser ? (
            <>
              <h2>{selectedUser.name}</h2>

              <div className={scss.messagesArea}>
                {privateMessageData?.data?.map((msg) => (
                  <div
                    key={msg.id}
                    className={user?.id === msg.senderId ? scss.myMessage : scss.otherMessage}
                  >
                    <p>{msg.message}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </>

          ) : (
            <p>Выберите чат слева</p>
          )}

          {(isPublicChat || selectedUser) && (
            <form className={scss.messageForm} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Напишите сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isPending || sendPublicMessage.isPending}
              />
              <button type="submit" disabled={!message.trim() || isPending}>
                Отправить
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default PrivateChatPage;