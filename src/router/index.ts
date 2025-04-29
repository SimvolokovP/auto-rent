import { ComponentType } from "react";
import AuthPage from "../pages/AuthPage/AuthPage";
import MainPage from "../pages/MainPage/MainPage";

interface IRoute {
  path: string;
  isIndex?: boolean;
  component: ComponentType;
  isPrivate: boolean;
}

export const routes: IRoute[] = [
  { path: "/auth", component: AuthPage, isPrivate: false },
  { path: "/", component: MainPage, isPrivate: true },
];
