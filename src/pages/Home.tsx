import { Link } from 'react-router-dom';
import { ArrowRight, User, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import profilePicture from '@/assets/profile-picture.jpeg';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-32 px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Avatar className="h-40 w-32 mx-auto mb-6">
            <AvatarImage src={profilePicture} alt="Profile" />
            <AvatarFallback>ZK</AvatarFallback>
          </Avatar>
          <p className="text-lg mb-2 text-primary">{t('home.greeting')}</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary">{t('home.name')}</h1>
          <p className="text-2xl mb-2 text-primary">{t('home.age')}</p>
          <p className="text-3xl font-semibold mb-8 text-primary">{t('home.goal')}</p>
          <p className="text-xl max-w-2xl mx-auto mb-12 text-primary">
            {t('home.intro')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/about">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <User className="mr-2 h-5 w-5" />
                {t('home.cta.about')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Mail className="mr-2 h-5 w-5" />
                {t('home.cta.contact')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 animate-slide-up shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-center">{t('home.overview.title')}</h2>
            <p className="text-lg text-muted-foreground text-center mb-8">
              {t('home.overview.text')}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/skills">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                  <h3 className="font-semibold text-lg mb-2">{t('nav.skills')}</h3>
                  <p className="text-sm text-muted-foreground">{t('skills.subtitle')}</p>
                  <ArrowRight className="mt-4 h-5 w-5 text-primary" />
                </Card>
              </Link>
              <Link to="/resume">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                  <h3 className="font-semibold text-lg mb-2">{t('nav.resume')}</h3>
                  <p className="text-sm text-muted-foreground">{t('resume.subtitle')}</p>
                  <ArrowRight className="mt-4 h-5 w-5 text-primary" />
                </Card>
              </Link>
              <Link to="/contact">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                  <h3 className="font-semibold text-lg mb-2">{t('nav.contact')}</h3>
                  <p className="text-sm text-muted-foreground">{t('contact.subtitle')}</p>
                  <ArrowRight className="mt-4 h-5 w-5 text-primary" />
                </Card>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
