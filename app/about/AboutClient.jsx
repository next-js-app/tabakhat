"use client";
import { motion } from "framer-motion";
import {
  ChefHat,
  Heart,
  Users,
  Globe,
  Award,
  Clock,
  BookOpen,
  MessageSquare,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: <ChefHat className="w-6 h-6" />,
    title: "Expert Recipes",
    description:
      "Curated recipes from professional chefs and home cooks worldwide.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Personalized Experience",
    description: "Save your favorite recipes and create your own collection.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Driven",
    description:
      "Join a community of food lovers and share your culinary journey.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Cuisine",
    description: "Explore recipes from different cultures and traditions.",
  },
];

const stats = [
  { number: "1000+", label: "Recipes" },
  { number: "50+", label: "Categories" },
  { number: "10k+", label: "Users" },
  { number: "24/7", label: "Support" },
];

const team = [
  {
    name: "Omar Abaza",
    role: "Frontend Developer",
    image:
      "https://media.licdn.com/dms/image/v2/C4D03AQHyGRilP93zbQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1658320869037?e=1755129600&v=beta&t=KroCzhtiCkn62rC8B-3RMwfzROekcG3E2f2qgrAXZG8",
  },
  {
    name: "Mohamed Elgendy",
    role: "Frontend Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQFiBIvpOFzZYQ/profile-displayphoto-shrink_800_800/B4DZUU4iWcHIAg-/0/1739812121524?e=1755129600&v=beta&t=mqioJs64mtE0BmKRmIy46ortMFMA6uapl9ZXSEkmItA",
  },
  {
    name: "Ahmed Kassem",
    role: "Frontend Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQE6euG4zcxLZg/profile-displayphoto-shrink_800_800/B4DZYNTyIhGwAc-/0/1743980013635?e=1755129600&v=beta&t=l282vHigaqhO8I342NYCgl9-l5SqRJFyS_NVP9izeVc",
  },
  {
    name: "Nesma Fayed",
    role: "Backend Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQH7MjCLeZAtJw/profile-displayphoto-shrink_800_800/B56Zb_RUqQGsAc-/0/1748039456798?e=1755129600&v=beta&t=1vPRRb3-UB1z0OJVSArnJ-nxD3Y_UlfVvPgmX8X0HqA",
  },
  {
    name: "Ali Fathy",
    role: "Backend Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D35AQHC_1hLmb6CwQ/profile-framedphoto-shrink_800_800/B4DZU7tkNZGcAg-/0/1740463555809?e=1750449600&v=beta&t=jpuKe1uXB9O6UWgSuELFS9AqNiwXcgbB1IzQWcT3b8U",
  },
  {
    name: "Mahmoud Fawzy",
    role: "Frontend Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQHCvmmtXZhnRg/profile-displayphoto-shrink_800_800/B4EZWydrXpHgAg-/0/1742455883918?e=1755129600&v=beta&t=20yM18qcAlRmd5hmj7sgKoyTagVnEU7c5AloQozosZM",
  },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-yellow/20 to-transparent" />
        <div className="container mx-auto  px-4 relative">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-1">
              About <span>Tabakhat</span>
            </h1>
            <p className="text-lg md:text-lg text-zinc-600">
              We're passionate about bringing people together through the joy of
              cooking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-8 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-3 rounded-xl bg-background shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col gap-1 mb-3">
                  <div className="flex flex-row items-center">
                    <div className="w-12 h-12 text-amber-300 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl  font-semibold text-zinc-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="ms-12 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-16">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center justify-center w-40 h-40 bg-white rounded-full shadow-md transition-transform hover:scale-105 border border-amber-100 mx-auto"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="text-3xl font-extrabold text-amber-300"
                >
                  {stat.number}
                </motion.div>
                <p className="text-zinc-900 font-medium text-lg tracking-wide mt-1 text-center">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-12"
          >
            <div className="flex flex-row items-center justify-center mb-4">
              {/* SVG group/team icon */}
              <svg className="mr-3 text-amber-300" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 26c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm0 2c-4.418 0-12 2.239-12 6.667V38h24v-3.333C36 30.239 28.418 28 24 28z" fill="currentColor"/>
              </svg>
              <h2 className="text-3xl font-bold text-zinc-900 mt-1">
                Meet Our <span>Team</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our passionate team of food enthusiasts and tech experts work
              together to bring you the best cooking experience.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full object-cover w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                <h3 className="text-xl leading-1 mb-1.5 font-semibold text-zinc-900">
                  {member.name}
                </h3>
                <p className="text-amber-400">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
          <div className="flex flex-row items-center mx-auto justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-yellow/20 flex items-center">
              <Award className="w-8 h-8 ml-3 text-amber-300" />
            </div>
            <h2 className="text-3xl font-bold  text-zinc-900">
              Our <span>Mission</span>
            </h2>
          </div>
            <p className="text-lg text-muted-foreground mb-8">
             Our mission is to make cooking
              accessible, enjoyable, and inspiring for everyone, from beginners
              to experienced chefs.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white shadow-lg"
              >
                <Clock className="w-8 h-8 text-amber-300 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-zinc-900">Save Time</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and easy recipes for busy lifestyles
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white shadow-lg"
              >
                <BookOpen className="w-8 h-8 text-amber-300 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-zinc-900">
                  Learn & Grow
                </h3>
                <p className="text-sm text-muted-foreground">
                  Expand your culinary knowledge and skills
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white shadow-lg"
              >
                <MessageSquare className="w-8 h-8 text-amber-300 mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-zinc-900">
                  Share & Connect
                </h3>
                <p className="text-sm text-muted-foreground">
                  Join a community of food enthusiasts
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
