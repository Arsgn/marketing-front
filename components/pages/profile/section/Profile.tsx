"use client";
import { FC } from "react";
import scss from "./Profile.module.scss";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

const Profile: FC = () => {
  const { user } = useAuthStore();
  const router = useRouter();
    const handleEdit = () => {
    router.push("/edit");
  };

  return (
    <section className={scss.Profile}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.home}>
            <img src="/Rectangle 29840.svg" alt="" />
            <div className={scss.block}>
              <div className={scss.box}>
                <img
                  className={scss.avatar}
                  src={user?.avatar || "/avatar.svg"}
                  alt={user?.name || "Profile Image"}
                />
                <div className={scss.text}>
                  <h2>{user?.name}</h2>
                  <p>Владелец</p>
                </div>
              </div>
              <button className={scss.edit} onClick={handleEdit}>Редактировать</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
