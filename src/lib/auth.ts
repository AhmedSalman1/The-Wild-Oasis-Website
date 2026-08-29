import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [Google],

	callbacks: {
		authorized({ auth }) {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth?.user;
		},

		async signIn({ user }) {
			if (!user.email) return false;

			try {
				// Upsert ignores duplicates, so existing guests return null here;
				// fetch them to get the id without overwriting profile fields
				const guest =
					(await createGuest({ email: user.email, fullName: user.name })) ??
					(await getGuest(user.email));

				if (!guest) return false;

				user.guestId = guest.id;

				return true;
			} catch (err) {
				console.error("SignIn callback failure:", err);
				return false;
			}
		},

		jwt({ token, user }) {
			// Store the guestId on the token at sign-in
			if (user) token.guestId = user.guestId;

			return token;
		},

		async session({ session, token }) {
			// Send properties to the client from the JWT (no DB hit per request)
			session.user.guestId = token.guestId;

			return session;
		},
	},

	pages: {
		signIn: "/login",
	},
});
