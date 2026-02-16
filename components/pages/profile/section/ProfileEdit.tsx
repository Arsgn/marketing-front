"use client";
import { FC, useState } from "react";
import scss from "./ProfileEdit.module.scss";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { useUpdateUser } from "@/api/user";

const ProfileEdit: FC = () => {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const updateUser = useUpdateUser();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    avatar: user?.avatar || "",
  });

  const [previewImage, setPreviewImage] = useState(
    user?.avatar || "/avatar.svg"
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл слишком большой. Максимальный размер: 5MB");
        return;
      }

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

    if (!user) {
      alert("Пользователь не найден");
      return;
    }

    updateUser.mutate(
      {
        id: user.id,
        data: {
          name: formData.name,
          avatar: formData.avatar,
        },
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            setUser(res.data);
            alert("Профиль успешно обновлен!");
            router.push("/profile");
          }
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.error || "Ошибка при обновлении профиля";
          alert(errorMessage);
        },
      }
    );
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
                  value={user?.email || ""}
                  disabled
                  style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
                />
                <small style={{ color: "#666" }}>
                  Email нельзя изменить
                </small>
              </div>
            </div>

            <div className={scss.actions}>
              <button
                type="button"
                className={scss.cancelBtn}
                onClick={handleCancel}
                disabled={updateUser.isPending}
              >
                Отмена
              </button>
              <button
                type="submit"
                className={scss.saveBtn}
                disabled={updateUser.isPending}
              >
                {updateUser.isPending ? "Сохранение..." : "Сохранить изменения"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfileEdit;