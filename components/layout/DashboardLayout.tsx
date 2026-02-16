"use client";
import { ReactNode } from "react";
import scss from "./DashboardLayout.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosSettings, IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { FaUser } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import { IoFolderOpen } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useSignOut } from "@/api/user"; 
import { token } from "@/api";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuth, user, clearUser } = useAuthStore();
  const signOut = useSignOut(); 

  const handleLogout = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        clearUser();
        token.remove();
        router.push("/");
      },
      onError: () => {
        clearUser();
        token.remove();
        router.push("/");
      }
    });
  };

  return (
    <div className={scss.wrapper}>
      <aside className={scss.sidebar}>
        <h2 className={scss.logo}>Logo</h2>

        <nav className={scss.nav}>
          <div className={scss.icons}>
            <FaUser />
            <Link
              href="/profile"
              className={pathname === "/profile" ? scss.active : ""}
            >
              Профиль
            </Link>
          </div>

          <div className={scss.icons}>
            <IoFolderOpen />
            <Link
              href="/courses"
              className={pathname === "/courses" ? scss.active : ""}
            >
              Курсы
            </Link>
          </div>

          <div className={scss.icons}>
            <MdOutlineChat />
            <Link 
              href="/private-chat"
              className={pathname === "/chat" ? scss.active : ""}
            >
              Чат
            </Link>
          </div>

          <div className={scss.icons}>
            <IoIosSettings />
            <Link 
              href="/settings"
              className={pathname === "/settings" ? scss.active : ""}
            >
              Настройки
            </Link>
          </div>

          <div className={scss.icons}>
            <BiLogOut />
            <button 
              onClick={handleLogout}
              className={scss.logoutBtn}
            >
              Выйти
            </button>
          </div>

          <Link href="/" className={scss.backLink}>Назад</Link>
        </nav>
      </aside>

      <div className={scss.main}>
        <header className={scss.header}>
          <div className={scss.notification}>
            <IoMdNotificationsOutline />
          </div>
          <div className={scss.profile}>
            <img
              src={user?.avatar || "/avatar.png"}
              onClick={() => router.push("/profile")}
              alt="profile"
            />
          </div>
        </header>

        <div className={scss.content}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;