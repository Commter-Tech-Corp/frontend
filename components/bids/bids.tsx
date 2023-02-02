/* eslint-disable @next/next/no-img-element */
import "swiper/css";
import "swiper/css/navigation";
import { HeadLine } from "../component";
import "tippy.js/dist/tippy.css";
import BidsCarousel, { SliderItem } from "../carousel/bidsCarousel";
import { useEffect, useState } from "react";
import { getFeaturedCelebrities, getFeaturedEvents, getFeaturedVideos } from "../../utils/resquests";

interface BidsProps {
  bgWhite?: boolean;
}

const Bids = ({ 
  bgWhite 
}: BidsProps) => {

  const classes = "pt-10 pb-24";

  return (
    <section className={classes}>
      {/* <!-- Hot Bids --> */}
      {bgWhite && (
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
      )}
      <div className="container">
        <HeadLine
          text="Hot Bids"
          image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />

        <div className="relative">
          {/* <!-- Slider --> */}
          <BidsCarousel />
        </div>
      </div>
      {/* <!-- end hot bids --> */}
    </section>
  );
};

export const FeaturedEvnets = () => {
  const [eventItems, setEventItems] = useState<EventDetailType []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFeaturedEvents({}).then(res => {
      setEventItems(res.data);
    }).finally(() => {
      setLoading(false);
    }).catch(err => {
      setError('Error loading featured events');
    });

  }, [])

  const classes = "pt-10 pb-24";

  const sliderData: SliderItem [] = eventItems.map((item) => {
    return {
      id: item.id,
      title: item.name,
      image: item.event_photo,
      price: item.price,
      schedule: new Date(item.schedule)?.toLocaleDateString() + ' ' + new Date(item.schedule)?.toLocaleTimeString(),
    }
  })

  return (
    <section className={classes}>
      {/* <!-- Hot Bids --> */}
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <img
          src="/images/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      
      <div className="container">
        <HeadLine
          text="Featured Events"
          image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />

        <div className="relative">
          {/* <!-- Slider --> */}
          <BidsCarousel data={sliderData} detailUrl='/event/' />
        </div>
      </div>
      {/* <!-- end hot bids --> */}
    </section>
  );
};

export const FeaturedVideos = () => {
  const [videoItems, setVideoItems] = useState<VidoeItemType []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFeaturedVideos({}).then(res => {
      setVideoItems(res.data);
    }).finally(() => {
      setLoading(false);
    }).catch(err => {
      setError('Error loading featured videos');
    });

  }, [])

  const classes = "pt-10 pb-24";

  const sliderData: SliderItem [] = videoItems.map((item) => {
    return {
      id: item.id,
      title: item.name,
      image: '/images/products/item_1.jpg',
      price: item.price,
    }
  })

  return (
    <section className={classes}>
      {/* <!-- Hot Bids --> */}
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <img
          src="/images/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      
      <div className="container">
        <HeadLine
          text="Featured Videos"
          image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />

        <div className="relative">
          {/* <!-- Slider --> */}
          <BidsCarousel data={sliderData} />
        </div>
      </div>
      {/* <!-- end hot bids --> */}
    </section>
  );
};

export const FeaturedCelebrities = () => {
  const [celebrityItems, setCelebrityItems] = useState<CelebrityDetailsType []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFeaturedCelebrities({}).then(res => {
      setCelebrityItems(res.data);
    }).finally(() => {
      setLoading(false);
    }).catch(err => {
      setError('Error loading featured celebrities');
    });

  }, [])

  const classes = "pt-10 pb-24";

  const sliderData: SliderItem [] = celebrityItems.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image: item.profile_photo,
    }
  })

  return (
    <section className={classes}>
      {/* <!-- Hot Bids --> */}
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <img
          src="/images/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      
      <div className="container">
        <HeadLine
          text="Featured Celebrities"
          image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />

        <div className="relative">
          {/* <!-- Slider --> */}
          <BidsCarousel data={sliderData} />
        </div>
      </div>
      {/* <!-- end hot bids --> */}
    </section>
  );
};

export default Bids;
