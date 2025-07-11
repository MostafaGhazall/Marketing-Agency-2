import { useParams, useNavigate } from "react-router-dom";
import { showReelItems } from "../components/Home/ShowReel";
import { useTranslation } from "react-i18next";

export default function ReelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-theme-ar" : "font-theme";

  const item = showReelItems.find((r) => r.link === `/reel/${slug}`);

  if (!item) {
    return <p>{t("common.notFound")}</p>;
  }

  return (
    <section className={`px-6 py-12 ${fontClass}`}>
      <h1 className="text-3xl font-bold mb-6 text-theme text-center">
        {t(`home.showreel.items.${item.title}`)}
      </h1>

      <p className="max-w-2xl mx-auto text-lg text-secondary-cream mb-8 text-center">
        {t("reelDetail.intro", {
          brand: t(`home.showreel.items.${item.title}`),
        })}
      </p>

      <div className="w-full max-w-3xl mx-auto aspect-video">
        <iframe
          title={t(`home.showreel.items.${item.title}`)}
          src={item.videoUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-theme cursor-pointer"
      >
        <span className="text-xl">{isArabic ? "→" : "←"}</span>
        <span className="ml-2 hover:underline">{t("common.back", "Back")}</span>
      </button>
    </section>
  );
}
