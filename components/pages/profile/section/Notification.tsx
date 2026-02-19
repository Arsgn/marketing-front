"use client";
import { useState, useEffect, useRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useGetNotifications, useMarkNotificationsRead } from "@/api/notification";
import scss from "./Notification.module.scss";

const Notification = () => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const prevCount = useRef(0);

  const { data } = useGetNotifications();
  const markRead = useMarkNotificationsRead();

  const notifications: NOTIFICATION.Notification[] = data?.data || [];

  useEffect(() => {
    if (notifications.length > prevCount.current && notifications.length > 0) {
      setToast(notifications[0].title);
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
    prevCount.current = notifications.length;
  }, [notifications.length]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    if (!open && notifications.length > 0) {
      markRead.mutate();
    }
  };

  return (
    <div className={scss.wrapper}>

      {toast && (
        <div className={scss.toast}>
          🔔 {toast}
        </div>
      )}

      <button className={scss.bell} onClick={handleOpen}>
        <IoMdNotificationsOutline size={24} />
        {notifications.length > 0 && (
          <span className={scss.badge}>{notifications.length}</span>
        )}
      </button>

      {open && (
        <div className={scss.dropdown}>
          <h4>Уведомления</h4>
          {notifications.length === 0 ? (
            <p className={scss.empty}>Нет новых уведомлений</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className={scss.item}>
                {n.title}
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

export default Notification;