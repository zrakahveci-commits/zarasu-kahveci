import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { GraduationCap, Languages, Star, Heart } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <PageHeader title={t('about.title')} subtitle={t('about.subtitle')} />

        {/* Bio Section */}
        <Card className="p-8 mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Star className="mr-2 h-6 w-6 text-primary" />
            {t('about.bio.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about.bio.text')}
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Languages */}
          <Card className="p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Languages className="mr-2 h-6 w-6 text-primary" />
              {t('about.languages.title')}
            </h2>
            <ul className="space-y-3">
              <li className="text-muted-foreground">{t('about.languages.turkish')}</li>
              <li className="text-muted-foreground">{t('about.languages.german')}</li>
              <li className="text-muted-foreground">{t('about.languages.english')}</li>
              <li className="text-muted-foreground">{t('about.languages.french')}</li>
            </ul>
          </Card>

          {/* Education */}
          <Card className="p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <GraduationCap className="mr-2 h-6 w-6 text-primary" />
              {t('about.school.title')}
            </h2>
            <ul className="space-y-3">
              <li className="text-muted-foreground">{t('about.school.current')}</li>
              <li className="text-muted-foreground">{t('about.school.expected')}</li>
            </ul>
          </Card>
        </div>

        {/* Hobbies */}
        <Card className="p-8 mt-8 animate-slide-up">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Heart className="mr-2 h-6 w-6 text-primary" />
            {t('about.hobbies.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3" />
                <p className="text-muted-foreground">{t(`about.hobby.${num}`)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
