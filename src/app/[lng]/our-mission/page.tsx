import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ContactButton } from "@/components/common/ContactButton";
import Image, { type ImageProps } from "next/image";
import style from "@/lib/our-mission.module.scss";
export const runtime = 'edge';
type ImageType = ImageProps & { description?: string };
const content: {
  h1: string;
  desc: string;
  mainImage: ImageType;
  images: ImageType[];
} = {
  h1: "החזון שלנו",
  desc: `אם אתם מחפשים את הקורס המתאים לכם או מרצה איכותי שיכול לעזור לכם לצמוח ולהתפתח, אתם במקום הנכון. הצטרפו לקהילת החברים שלנו ותוכלו לדרג ולהמליץ על קורסים ומרצים מהניסיון שלכם. הצטרפו עכשיו ותהיו חלק מהמהפכה!
אם אתם מחפשים את הקורס המתאים לכם או מרצה איכותי שיכול לעזור לכם לצמוח ולהתפתח, אתם במקום הנכון. הצטרפו לקהילת החברים שלנו ותוכלו לדרג ולהמליץ על קורסים ומרצים מהניסיון שלכם. הצטרפו עכשיו ותהיו חלק מהמהפכה! אם אתם מחפשים את הקורס המתאים לכם או מרצה איכותי שיכול לעזור לכם לצמוח ולהתפתח, אתם במקום הנכון. `,
  mainImage: {
    src: "/dev/our-mission/photo-1552581234-26160f608093.avif",
    alt: "Students learning together",
  },
  images: [
    {
      src: "/dev/our-mission/photo-1552581234-26160f608093.avif",
      alt: "Students learning together",
      description: "ערך 1",
    },
    {
      src: "/dev/our-mission/photo-1552581234-26160f608093.avif",
      alt: "Students learning together",
      description: "ערך 2",
    },
    {
      src: "/dev/our-mission/photo-1552581234-26160f608093.avif",
      alt: "Students learning together",
      description: "ערך 3",
    },
    // { src: 'https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', alt: 'People working on an idea' },
    // { src: 'https://images.unsplash.com/photo-1599592187465-6dc742367282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', alt: 'People listening to a lecture' }
  ],
};

export const metadata = {
  title: "צור קשר",
  description:
    "אנחנו כאן כדאי לעזור לכם למצוא את הקורס המתאים לכם ומרצה איכותי, ונשמח לשמוע הצעות לשיפור האתר ולענות על כל שאלה, מוזמנים להשאיר",
};

const ImageArticle = ({
  description,
  ...image
}: { description?: string } & ImageProps) => {
  return (
    <article>
      <AspectRatio ratio={1}>
        <Image
          src={image.src}
          fill
          sizes='(max-width: 768px) 33vw; (max-width: 1200px) 100vw;'
          className='object-cover'
          alt={image.alt || "סטודנטים לומדים יחד בקמפוס גורו"}
        />
      </AspectRatio>
      {description && <p>{description}</p>}
    </article>
  );
};

export default function OurMission() {
  return (
    <div className={style.ourMission}>
      <header className={style.ourMissionMainImage}>
        <hgroup>
          <h1 className={style.ourMissionHeading}>{content.h1}</h1>
          <h2>{content.desc}</h2>
        </hgroup>
        <ImageArticle {...content.mainImage} />
      </header>
      <section className={style.ourMissionImages}>
        {content.images.map(ImageArticle)}
      </section>
      <div className={style.ourMissionContact}>
        <h3>רוצים לעזור לשפר, לדווח על תקלות, טעויות או פירגונים?</h3>
        <ContactButton />
      </div>
    </div>
  );
}
