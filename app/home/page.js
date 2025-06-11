"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules'
import '../styles/swiper.css'
import { Spinner } from "@/components/ui/spinner";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChefHat, BookOpen, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

const truncate = (str, n) => (str.length > n ? str.slice(0, n) + '...' : str);

export default function Home() {
    const [beefRecipes, setBeefRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBeefRecipes = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef')
                const data = await response.json()
                setBeefRecipes(data.meals || [])
            } catch (error) {
                console.error('Error fetching beef recipes:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchBeefRecipes()
    }, [])

    const customerReviews = [
        {
            id: 1,
            name: "Aisha M.",
            review: "Tabakhat has transformed my cooking! The recipes are incredibly easy to follow, and the results are always delicious. Highly recommended!",
            rating: 5,
            imageUrl: "https://picsum.photos/80/80?random=1",
        },
        {
            id: 2,
            name: "Omar K.",
            review: "I've found so many authentic recipes here that remind me of home. The app is beautifully designed and very user-friendly.",
            rating: 5,
            imageUrl: "https://picsum.photos/80/80?random=2",
        },
        {
            id: 3,
            name: "Fatima A.",
            review: "The variety of dishes is amazing, and I love the detailed instructions. It's my go-to app for Middle Eastern cuisine!",
            rating: 4,
            imageUrl: "https://picsum.photos/80/80?random=3",
        },
        {
            id: 4,
            name: "Tariq S.",
            review: "A fantastic resource for anyone looking to explore new flavors. The 'Beef Recipes' section is particularly impressive.",
            rating: 5,
            imageUrl: "https://picsum.photos/80/80?random=4",
        },
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-auto md:h-[60vh] flex flex-col md:flex-row items-center justify-center text-white bg-gradient-to-r from-zinc-900 to-zinc-800 border-zinc-700">
                <div className="absolute inset-0 z-10" />
                <div className="relative z-20 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-4 py-8 md:py-0">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 text-center md:text-left md:pr-8"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-5xl md:text-6xl font-bold mb-6"
                        >
                            Discover Delicious Recipes
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="text-xl md:text-2xl mb-8"
                        >
                            Find and share your favorite recipes
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Link
                                href="/recipes"
                                className="bg-[#FFE353] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#FFE353]/90 transition-colors"
                            >
                                Explore Recipes
                            </Link>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0"
                    >
                        <Image
                            src="/images/hero-recipe.jpeg"
                            alt="Recipe App Hero"
                            width={420}
                            height={320}
                            className="rounded-3xl shadow-lg object-cover border-4 border-[#FFE353]"
                            priority
                        />
                    </motion.div>
                </div>
            </section>

            {/* Beef Recipes Section */}
            <section className="py-8 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-center mb-6"
                    >
                        Beef Recipes
                    </motion.h2>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Spinner size={48} />
                            <span className="mt-4 text-gray-500 text-lg font-medium">Loading recipes...</span>
                        </div>
                    ) : (
                        <div className="max-w-5xl mx-auto">
                            <Swiper
                                effect="coverflow"
                                coverflowEffect={{
                                    rotate: 30,
                                    stretch: 0,
                                    depth: 120,
                                    modifier: 1.2,
                                    slideShadows: true,
                                }}
                                slidesPerView={1.5}
                                spaceBetween={24}
                                centeredSlides={true}
                                initialSlide={3}
                                modules={[Pagination, EffectCoverflow]}
                                breakpoints={{
                                    640: { slidesPerView:1.5 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                                className="material-you-swiper"
                            >
                                {beefRecipes.map((recipe) => (
                                    <SwiperSlide key={recipe.idMeal} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between">
                                        <div className="relative h-64 w-full">
                                            <Image
                                                src={recipe.strMealThumb}
                                                alt={truncate(recipe.strMeal, 22)}
                                                fill
                                                className="object-cover rounded-t-3xl"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-1 justify-between">
                                            <h3 title={recipe.strMeal} className="text-xl font-semibold mb-4 text-center">{truncate(recipe.strMeal, 22)}</h3>
                                            <Link
                                                href={`/recipe/${recipe.idMeal}`}
                                                className="inline-block bg-[#FFE353] text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-[#FFE353]/90 transition-colors text-center"
                                            >
                                                View Recipe
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-center mb-12"
                    >
                        Why Choose Tabakhat
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Card className="text-center p-6">
                                <CardHeader className="flex flex-col items-center justify-center space-y-4">
                                    <ChefHat className="w-12 h-12 text-[#FFE353]" />
                                    <CardTitle className="text-xl font-semibold">Expert Recipes</CardTitle>
                                </CardHeader>
                                <CardDescription className="text-gray-600">Curated by professional chefs and food enthusiasts</CardDescription>
                            </Card>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="text-center p-6">
                                <CardHeader className="flex flex-col items-center justify-center space-y-4">
                                    <BookOpen className="w-12 h-12 text-[#FFE353]" />
                                    <CardTitle className="text-xl font-semibold">Easy to Follow</CardTitle>
                                </CardHeader>
                                <CardDescription className="text-gray-600">Step-by-step instructions for perfect results</CardDescription>
                            </Card>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card className="text-center p-6">
                                <CardHeader className="flex flex-col items-center justify-center space-y-4">
                                    <Sparkles className="w-12 h-12 text-[#FFE353]" />
                                    <CardTitle className="text-xl font-semibold">Authentic Taste</CardTitle>
                                </CardHeader>
                                <CardDescription className="text-gray-600">Traditional recipes with modern twists</CardDescription>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-center mb-12"
                    >
                        What Our Users Say
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {customerReviews.map((review) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: review.id * 0.1 }}
                            >
                                <Card className="h-full p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                            <Image
                                                src={review.imageUrl}
                                                alt={review.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{review.name}</h3>
                                            <div className="flex items-center space-x-1">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-[#FFE353] text-[#FFE353]" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">{review.review}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}