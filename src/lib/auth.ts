import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [Google],

	callbacks: {
		authorized({ auth }) {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth?.user;
		},
	},

	pages: {
		signIn: "/login",
	},
});
