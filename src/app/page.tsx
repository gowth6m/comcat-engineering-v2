import { auth } from "@/auth";
import AllProductGallery from "@/components/product/all-product-gallery";

export default async function Home() {
    const session = await auth();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <AllProductGallery />
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
