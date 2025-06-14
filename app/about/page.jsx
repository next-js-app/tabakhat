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
  MessageSquare
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: <ChefHat className="w-6 h-6" />,
    title: "Expert Recipes",
    description: "Curated recipes from professional chefs and home cooks worldwide."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Personalized Experience",
    description: "Save your favorite recipes and create your own collection."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Driven",
    description: "Join a community of food lovers and share your culinary journey."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Cuisine",
    description: "Explore recipes from different cultures and traditions."
  }
];

const stats = [
  { number: "1000+", label: "Recipes" },
  { number: "50+", label: "Categories" },
  { number: "10k+", label: "Users" },
  { number: "24/7", label: "Support" }
];

const team = [
  {
    name: "Omar Abaza",
    role: "Frontend Developer",
    image: "https://media.licdn.com/dms/image/v2/C4D03AQHyGRilP93zbQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1658320869037?e=1755129600&v=beta&t=KroCzhtiCkn62rC8B-3RMwfzROekcG3E2f2qgrAXZG8"
  },
  {
    name: "Mohamed Elgendy",
    role: "Frontend Developer",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFiBIvpOFzZYQ/profile-displayphoto-shrink_800_800/B4DZUU4iWcHIAg-/0/1739812121524?e=1755129600&v=beta&t=mqioJs64mtE0BmKRmIy46ortMFMA6uapl9ZXSEkmItA"
  },
  {
    name: "Ahmed Kassem",
    role: "Frontend Developer",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQE6euG4zcxLZg/profile-displayphoto-shrink_800_800/B4DZYNTyIhGwAc-/0/1743980013635?e=1755129600&v=beta&t=l282vHigaqhO8I342NYCgl9-l5SqRJFyS_NVP9izeVc"
  },
  {
    name: "Nesma Fayed",
    role: "Backend Developer",
    image: "https://media.licdn.com/dms/image/v2/D5603AQH7MjCLeZAtJw/profile-displayphoto-shrink_800_800/B56Zb_RUqQGsAc-/0/1748039456798?e=1755129600&v=beta&t=1vPRRb3-UB1z0OJVSArnJ-nxD3Y_UlfVvPgmX8X0HqA"
  },
  {
    name: "Ali Fathy",
    role: "Backend Developer",
    image: "https://media.licdn.com/dms/image/v2/D4D35AQHC_1hLmb6CwQ/profile-framedphoto-shrink_800_800/B4DZU7tkNZGcAg-/0/1740463555809?e=1750449600&v=beta&t=jpuKe1uXB9O6UWgSuELFS9AqNiwXcgbB1IzQWcT3b8U"
  },
  {
    name: "Mahmoud Fawzy",
    role: "Frontend Developer",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHCvmmtXZhnRg/profile-displayphoto-shrink_800_800/B4EZWydrXpHgAg-/0/1742455883918?e=1755129600&v=beta&t=20yM18qcAlRmd5hmj7sgKoyTagVnEU7c5AloQozosZM"
  }
  
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-yellow/20 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Tabakhat
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Your ultimate destination for discovering, sharing, and creating amazing recipes.
              We're passionate about bringing people together through the joy of cooking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-16">
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
                className="p-6 rounded-xl bg-background shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
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
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="text-4xl font-bold text-brand-yellow mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our passionate team of food enthusiasts and tech experts work together
              to bring you the best cooking experience.
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
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-brand-yellow/20 flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-brand-yellow" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              At Tabakhat, we believe that cooking is more than just preparing food –
              it's about creating memories, sharing experiences, and bringing people together.
              Our mission is to make cooking accessible, enjoyable, and inspiring for everyone,
              from beginners to experienced chefs.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white shadow-lg"
              >
                <Clock className="w-8 h-8 text-brand-yellow mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Save Time</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and easy recipes for busy lifestyles
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white shadow-lg"
              >
                <BookOpen className="w-8 h-8 text-brand-yellow mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Learn & Grow</h3>
                <p className="text-sm text-muted-foreground">
                  Expand your culinary knowledge and skills
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white shadow-lg"
              >
                <MessageSquare className="w-8 h-8 text-brand-yellow mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Share & Connect</h3>
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