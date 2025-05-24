import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen bg-secondary-cream text-primary-black font-plex p-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">{t('about.title')}</h2>
        <p className="text-lg">{t('about.text')}</p>
      </div>
    </section>
  );
};

export default AboutUs;
