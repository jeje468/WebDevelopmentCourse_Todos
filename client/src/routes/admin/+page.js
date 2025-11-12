import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

//TODO ask why the error does not work
export const load = () => {
  if (browser) {
    const user = localStorage.getItem("user");
    if (!user) {
      throw redirect(401, "/auth/login");
    }

    const roles = JSON.parse(user).roles || [];
    if (!roles.includes("ADMIN")) {
      throw error(403, "Access denied");
    }
  }
};