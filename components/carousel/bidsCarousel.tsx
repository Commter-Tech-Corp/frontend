import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import { bidsData } from "../../data/bids_data";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdArrowForward } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

export interface SliderItem {
  id: number;
  image: string;
  title: string;
  bid_number?: number;
  eth_number?: number;
  react_number?: number;
  price?: number;
  schedule?: string;
}

interface Props {
  data?: SliderItem[];
  detailUrl?: string;
}

const BidsCarousel = ({
  data = bidsData,
  detailUrl = '/item/',
}: Props) => {
  const sliderId = uuidv4();

  console.log('sliderId: ', sliderId);

  const sliderNext = `bids-swiper-button-next-${sliderId}`;
  const sliderPrev = `bids-swiper-button-prev-${sliderId}`;

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        slidesPerView="auto"
        breakpoints={{
          240: {
            slidesPerView: 1,
          },
          565: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: `.${sliderNext}`,
          prevEl: `.${sliderPrev}`,
          // nextEl: ".bids-swiper-button-next",
          // prevEl: ".bids-swiper-button-prev",
        }}
        className=" card-slider-4-columns !py-5"
      >
        {data.length > 0 && [...data, data[0]].map((item, index) => {
          const { id, image, title, bid_number, eth_number, react_number, price } =
            item;

          const isLastItem = index === data.length;

          return (
            <SwiperSlide className="text-white" key={index}>
              <article className="relative">
                
                <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                  <figure>
                    {/* {`item/${itemLink}`} */}
                    <Link href={detailUrl + id} passHref>
                      <a>
                        <div className="w-full">
                          <Image
                            src={image}
                            alt={title}
                            height={230}
                            width={230}
                            layout="responsive"
                            objectFit="cover"
                            className="rounded-[0.625rem] w-full"
                            unoptimized={true}
                            placeholder="empty"
                          />
                        </div>
                      </a>
                    </Link>
                  </figure>
                  <div className="mt-4 flex items-center justify-between">
                    <Link href={detailUrl + id} passHref>
                      <a>
                        <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                          {title}
                        </span>
                      </a>
                    </Link>
                    {price !== undefined && (
                      <span className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                        <Tippy content={<span>$</span>}>
                          {/* <img
                            src="/images/eth-icon.svg"
                            alt=""
                            className="w-3 h-3 mr-1"
                          /> */}
                          <span className="text-green text-sm font-medium tracking-tight">
                            $
                          </span>
                        </Tippy>

                        <span className="text-green text-sm font-medium tracking-tight">
                          {price}
                        </span>
                      </span>
                    )}
                  </div>

                  {item.schedule && (
                    <div className="mt-2 text-sm">
                      <span className="dark:text-jacarta-300 text-jacarta-500">
                        Schedule: &nbsp;
                      </span>
                      <span className="dark:text-jacarta-100 text-jacarta-700">
                        {item.schedule}
                      </span>
                    </div>
                  )}

                  <div className="mt-8 flex items-center justify-between">
                    <Link href={detailUrl + id} passHref>
                    <a>
                      <button
                        type="button"
                        className="text-accent font-display text-sm font-semibold"
                      >
                        View Details
                      </button>
                    </a>
                    </Link>

                    {/* <Likes
                      like={react_number}
                      classes="flex items-center space-x-1"
                    /> */}
                  </div>
                </div>

                {isLastItem && (
                  <div className="absolute left-0 top-0 z-10 h-full w-full flex flex-col gap-2 items-center justify-center dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                    <Link href={detailUrl} passHref>
                      <a>
                        <div className="w-full p-4 rounded-full bg-jacarta-600">
                          <MdArrowForward className="text-4xl text-accent" />
                        </div>
                      </a>
                    </Link>

                    <Link href={detailUrl} passHref>
                      <a>
                        <p>View all</p>
                      </a>
                    </Link>
                  </div>
                )}
              </article>
            </SwiperSlide>
          );
        })}

        {/* view all card */}
        {/* {data.length > 0 && (
          <SwiperSlide className="text-white h-full">
            <article>

              <div className="h-full dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                <Link href="/bids" passHref>
                  <a>
                    <div className="w-full">
                      <MdArrowForward className="text-4xl text-accent" />
                    </div>
                  </a>
                </Link>
              </div>
            </article>
          </SwiperSlide>
        )} */}
      </Swiper>
      {/* <!-- Slider Navigation --> */}
      <div className={sliderPrev + " group bids-swiper-button-prev swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden"}>
        <MdKeyboardArrowLeft />
      </div>
      <div className={sliderNext + " group bids-swiper-button-next swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden"}>
        <MdKeyboardArrowRight />
      </div>
    </>
  );
};

export default BidsCarousel;
