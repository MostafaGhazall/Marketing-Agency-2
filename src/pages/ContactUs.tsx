import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen bg-secondary-olive text-white font-plex p-8">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">{t('contact.title')}</h2>
        <p className="text-lg">{t('contact.text')}</p>
      </div>
    </section>
  );
};

export default ContactUs;
