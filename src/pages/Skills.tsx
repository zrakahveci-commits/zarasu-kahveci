import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Code, Users } from 'lucide-react';

const Skills = () => {
  const { t } = useLanguage();

  const technicalSkills = [1, 2, 3, 4];
  const softSkills = [1, 2, 3, 4, 5, 6];

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <PageHeader title={t('skills.title')} subtitle={t('skills.subtitle')} />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <Card className="p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Code className="mr-2 h-6 w-6 text-primary" />
              {t('skills.technical.title')}
            </h2>
            <div className="space-y-4">
              {technicalSkills.map((num) => (
                <div key={num} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3" />
                  <p className="text-muted-foreground">{t(`skills.technical.${num}`)}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Soft Skills */}
          <Card className="p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="mr-2 h-6 w-6 text-primary" />
              {t('skills.soft.title')}
            </h2>
            <div className="space-y-4">
              {softSkills.map((num) => (
                <div key={num} className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3" />
                  <p className="text-muted-foreground">{t(`skills.soft.${num}`)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Skills;
