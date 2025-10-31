import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    toast({
      title: t('contact.form.success'),
      duration: 5000,
    });
    form.reset();
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <p className="text-center text-muted-foreground mb-12 animate-fade-in">
          {t('contact.intro')}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <Card className="p-8 md:col-span-2 animate-slide-up">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.name')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.email')}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.subject')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.message')}</FormLabel>
                      <FormControl>
                        <Textarea rows={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full">
                  <Send className="mr-2 h-5 w-5" />
                  {t('contact.form.send')}
                </Button>
              </form>
            </Form>
          </Card>

          {/* Contact Info */}
          <Card className="p-8 animate-slide-up">
            <h3 className="text-xl font-bold mb-6">{t('contact.info.title')}</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-sm mb-1">Email</p>
                  <p className="text-sm text-muted-foreground">{t('contact.info.email')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mr-3 h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-sm mb-1">{t('contact.info.phoneLabel')}</p>
                  <p className="text-sm text-muted-foreground">{t('contact.info.phone')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-sm mb-1">{t('contact.info.locationLabel')}</p>
                  <p className="text-sm text-muted-foreground">{t('contact.info.location')}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <p className="text-center text-muted-foreground mt-12 animate-fade-in">
          {t('contact.outro')}
        </p>
      </div>
    </div>
  );
};

export default Contact;
