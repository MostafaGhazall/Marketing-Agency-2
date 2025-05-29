import { useTranslation } from 'react-i18next';
import Globe from '../components/contact/Globe';
import ContactTypes from '../components/contact/ContactTypes';

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const fontClass = isArabic ? 'font-theme-ar' : 'font-theme';

  return (
    <section className={`min-h-screen bg-[var(--primary-black)] text-white overflow-x-hidden ${fontClass}`}>
      <div className="text-center pt-32">
        <h2 className="text-5xl font-bold text-theme">{t('contact.title')}</h2>
      </div>
      <Globe />
      <ContactTypes />
    </section>
  );
};

export default ContactUs;
