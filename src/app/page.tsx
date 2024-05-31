import HeroCaraousel from "@/components/home-page/hero-caraousel";
import AllProductGallery from "@/components/product/all-product-gallery";

// --------------------------------------------------------------

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between container mx-auto">
            <HeroCaraousel />

            <AllProductGallery />
            <p className="text-lg"></p>
        </main>
    );
}
