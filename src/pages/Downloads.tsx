import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Award, GraduationCap } from 'lucide-react';

const Downloads = () => {
  const { t } = useLanguage();

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/downloads/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const certificates = [
    { key: 'semester1_1', file: 'Zarasu_1._Sek_Semester_1.pdf' },
    { key: 'semester1_2', file: 'Zarasu_1._Sek_Semester_2.pdf' },
    { key: 'semester2_1', file: 'Zeugnis_2._Sek_Semester_1.pdf' },
    { key: 'semester2_2', file: 'Zeugnis_2._Sek_Semester_2.pdf' },
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <PageHeader title={t('downloads.title')} subtitle={t('downloads.subtitle')} />

        <p className="text-center text-muted-foreground mb-12 animate-fade-in">
          {t('downloads.intro')}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-8 animate-slide-up text-center hover:shadow-lg transition-shadow">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('downloads.multicheck.title')}</h3>
            <p className="text-muted-foreground mb-6">{t('downloads.multicheck.desc')}</p>
            <Button 
              className="w-full"
              onClick={() => handleDownload('Multicheck_Zertifikat_ICT_Zarasu.pdf')}
            >
              <Download className="mr-2 h-4 w-4" />
              {t('downloads.multicheck.button')}
            </Button>
          </Card>

          <Card className="p-8 animate-slide-up text-center hover:shadow-lg transition-shadow">
            <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('downloads.certificates.title')}</h3>
            <p className="text-muted-foreground mb-6">{t('downloads.certificates.desc')}</p>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <Button
                  key={cert.key}
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDownload(cert.file)}
                >
                  <Download className="mr-2 h-3 w-3" />
                  {t(`downloads.certificates.${cert.key}`)}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
