"use client";
import { FC, useState } from "react";
import scss from "./ProfileEdit.module.scss";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const ProfileEdit: FC = () => {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  const [previewImage, setPreviewImage] = useState(user?.avatar || "/avatar.svg");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        ...user!,
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar,
      });

      alert("Профиль успешно обновлен!");
      router.push("/profile");
    } catch (error) {
      alert("Ошибка при обновлении профиля");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <section className={scss.ProfileEdit}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.header}>
            <h1>Редактировать профиль</h1>
          </div>

          <form className={scss.form} onSubmit={handleSubmit}>
            {/* Аватар */}
            <div className={scss.avatarSection}>
              <div className={scss.avatarPreview}>
                <img src={previewImage} alt="Avatar preview" />
              </div>
              <div className={scss.avatarUpload}>
                <label htmlFor="avatar" className={scss.uploadBtn}>
                  Изменить фото
                </label>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <p className={scss.hint}>JPG, PNG или GIF (MAX. 5MB)</p>
              </div>
            </div>

            <div className={scss.formFields}>
              <div className={scss.formGroup}>
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              <div className={scss.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Введите ваш email"
                  required
                />
              </div>

              <div className={scss.formGroup}>
                <label htmlFor="password">Новый пароль</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Оставьте пустым, если не хотите менять"
                />
              </div>

              <div className={scss.formGroup}>
                <label htmlFor="confirmPassword">Подтвердите пароль</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Повторите новый пароль"
                />
              </div>
            </div>

            <div className={scss.actions}>
              <button
                type="button"
                className={scss.cancelBtn}
                onClick={handleCancel}
                disabled={isLoading}
              >
                Отмена
              </button>
              <button
                type="submit"
                className={scss.saveBtn}
                disabled={isLoading}
              >
                {isLoading ? "Сохранение..." : "Сохранить изменения"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfileEdit;