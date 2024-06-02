import HeroCaraousel from "@/components/home-page/hero-caraousel";
import HeroProductsListing from "@/components/home-page/hero-products-listing";

// --------------------------------------------------------------

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col gap-4">
            <HeroCaraousel />
            <div className="container mx-auto">
                <HeroProductsListing />
            </div>
        </main>
    );
}
