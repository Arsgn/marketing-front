"use client";
import { ReactNode, useState } from "react";
import scss from "./DashboardLayout.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosSettings } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { FaStar, FaUser } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import { IoFolderOpen, IoHome } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useSignOut } from "@/api/user";
import { token } from "@/api";
import Notification from "../pages/profile/section/Notification";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearUser } = useAuthStore();
  const signOut = useSignOut();
  const [isOpen, setIsOpen] = useState(false);

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
      },
    });
  };

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { icon: <FaUser />, href: "/profile", label: "Профиль", match: "/profile" },
    { icon: <IoFolderOpen />, href: "/product", label: "Курсы", match: "/course" },
    { icon: <MdOutlineChat />, href: "/private-chat", label: "Чат", match: "/chat" },
    { icon: <IoHome />, href: "/", label: "Главная", match: "/" },
    { icon: <FaStar />, href: "", label: "Оценить", match: "" },
    { icon: <IoIosSettings />, href: "/settings", label: "Настройки", match: "/settings" },
  ];

  return (
    <div className={scss.wrapper}>

      {/* Затемнение */}
      <div
        className={`${scss.overlay} ${isOpen ? scss.open : ""}`}
        onClick={closeMenu}
      />

      {/* Сайдбар */}
      <aside className={`${scss.sidebar} ${isOpen ? scss.open : ""}`}>
        <h2 className={scss.logo}>Logo</h2>

        <nav className={scss.nav}>
          {navLinks.map(({ icon, href, label, match }) => (
            <div key={label} className={scss.icons} onClick={closeMenu}>
              {icon}
              <Link
                href={href}
                className={pathname === match ? scss.active : ""}
              >
                {label}
              </Link>
            </div>
          ))}

          <div className={scss.icons}>
            <BiLogOut />
            <button onClick={handleLogout} className={scss.logoutBtn}>
              Выйти
            </button>
          </div>
        </nav>
      </aside>

      {/* Основной контент */}
      <div className={scss.main}>
        <header className={scss.header}>

          {/* Бургер */}
          <button
            className={`${scss.burger} ${isOpen ? scss.open : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Меню"
          >
            <span />
            <span />
            <span />
          </button>

          <div className={scss.headerRight}>
            <div className={scss.notification}>
              <Notification />
            </div>
            <div className={scss.profile}>
              <img
                src={user?.avatar || "/avatar.png"}
                onClick={() => router.push("/profile")}
                alt="profile"
              />
            </div>
          </div>
        </header>

        <div className={scss.content}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;