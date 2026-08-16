import type {NextAuthConfig} from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    //to protect the route
    authorized({ auth, request: { nextUrl } }) { //callback to verify incoming request
      const isLoggedIn = !!auth?.user; //auth contains user session
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl)); //After login redirect to dashboard
      }
      return true;
    },
  },
  providers: [], //to list different login options
} satisfies NextAuthConfig;
