// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: { id: number, email: string, role: string } | null;
			session: { id: string, userId: number, expiresAt: Date } | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
