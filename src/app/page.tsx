import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Welcome to Next.js</h1>
            <p className="text-lg">
                {session ? (
                    <span>
                        You are signed in. Email: {session?.user?.email}
                    </span>
                ) : (
                    <span>You are not signed in.</span>
                )}
            </p>
        </main>
    );
}
