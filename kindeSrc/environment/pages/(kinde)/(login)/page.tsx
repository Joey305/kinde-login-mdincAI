"use server";

import { type KindePageEvent } from "@kinde/infrastructure";
import { renderAuthPage } from "../shared/auth-shell";

export default async function Page(event: KindePageEvent): Promise<string> {
  return renderAuthPage(event, "login");
}
