import HomeClient from "./HomeClient";

export const metadata = {
  title: "Tabakhat - Cook it. Love it. Share it.",
  description: "Discover delicious recipes, share your favorites, and join a vibrant cooking community at Tabakhat.",
  keywords: ["home", "recipes", "Tabakhat", "cooking", "community", "share"],
};

export default function Home() {
  return <HomeClient />;
}
